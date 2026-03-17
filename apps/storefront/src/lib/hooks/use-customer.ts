import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { sdk } from "../utils/sdk"
import { queryKeys } from "../utils/query-keys"

export function useCustomer() {
  return useQuery({
    queryKey: queryKeys.customer.current(),
    queryFn: async () => {
      try {
        // Check if we have a token in localStorage
        const token = localStorage.getItem('medusa_auth_token')
        console.log('🔍 Token check:', token ? 'EXISTS' : 'MISSING')
        
        if (!token) {
          return null
        }
        
        const { customer } = await sdk.store.customer.retrieve()
        console.log('✅ Customer retrieved:', customer.email)
        return customer
      } catch (error) {
        console.log('❌ Error retrieving customer:', error)
        return null
      }
    },
    retry: false,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) => {
      console.log("🔐 Attempting login for:", email)
      
      try {
        const token = await sdk.auth.login("customer", "emailpass", {
          email,
          password,
        })
        console.log("✅ Login successful, token:", token ? "received" : "missing")
        
        // Small delay to ensure SDK has stored the token
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const { customer } = await sdk.store.customer.retrieve(
          {},
          {
            Authorization: `Bearer ${token}`
          }
        )
        console.log("👤 Customer retrieved:", customer)
        return customer
      } catch (error) {
        console.error("❌ Login failed:", error)
        throw error
      }
    },
    onSuccess: (customer) => {
      queryClient.setQueryData(queryKeys.customer.current(), customer)
      queryClient.invalidateQueries({ queryKey: ["customer", "orders"] })
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      email,
      password,
      first_name,
      last_name,
    }: {
      email: string
      password: string
      first_name?: string
      last_name?: string
    }) => {
      console.log("🎯 Starting registration for:", email)
      
      let token: string
      try {
        // Step 1: Register and get token explicitly
        token = await sdk.auth.register("customer", "emailpass", {
          email,
          password,
        })
        console.log("✅ Got registration token:", token ? "yes" : "no")
      } catch (error: any) {
        console.error("❌ Registration failed:", error)
        // If identity already exists, abort - user should login instead
        if (
          error.statusText === "Unauthorized" &&
          error.message?.includes("already exists")
        ) {
          throw new Error(
            "An account with this email already exists. Please login instead."
          )
        }
        throw error
      }

      // Step 2: Create the customer with explicit Bearer token
      const { customer } = await sdk.store.customer.create(
        {
          email,
          first_name,
          last_name,
        },
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      )
      console.log("✅ Customer created:", customer.id)

      // Step 3: Login to establish a persistent authenticated session
      await sdk.auth.login("customer", "emailpass", {
        email,
        password,
      })
      console.log("✅ Login successful")

      // Step 4: Associate current cart with the logged-in customer
      const cartId = localStorage.getItem('medusa_cart_id')
      if (cartId) {
        console.log('🛒 Associating cart with customer:', cartId)
        try {
          await sdk.store.cart.update(cartId, {
            email: customer.email
          } as any)
          console.log('✅ Cart associated with customer')
        } catch (err) {
          console.error('❌ Failed to associate cart:', err)
        }
      }

      return customer
    },
    onSuccess: (customer) => {
      queryClient.setQueryData(queryKeys.customer.current(), customer)
      queryClient.invalidateQueries({ queryKey: ["customer", "orders"] })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await sdk.auth.logout()
    },
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.customer.current(), null)
      queryClient.invalidateQueries({ queryKey: queryKeys.customer.orders() })
    },
  })
}
