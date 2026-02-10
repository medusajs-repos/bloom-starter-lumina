import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown } from "@medusajs/icons"

interface AccordionItem {
  id: string
  title: string
  content: string | React.ReactNode
}

interface ProductAccordionsProps {
  items?: AccordionItem[]
}

const defaultItems: AccordionItem[] = [
  {
    id: "ingredients",
    title: "Key Ingredients",
    content: (
      <div className="space-y-2">
        <p>
          <strong>Hyaluronic Acid:</strong> Deeply hydrates and plumps the skin
        </p>
        <p>
          <strong>Niacinamide:</strong> Brightens and evens skin tone
        </p>
        <p>
          <strong>Peptides:</strong> Supports skin firmness and elasticity
        </p>
        <p>
          <strong>Botanical Extracts:</strong> Soothes and nourishes sensitive skin
        </p>
      </div>
    ),
  },
  {
    id: "usage",
    title: "How to Use",
    content: (
      <div className="space-y-2">
        <p>Apply a small amount to clean, dry skin morning and evening.</p>
        <p>Gently massage in circular motions until fully absorbed.</p>
        <p>For best results, use consistently as part of your daily skincare routine.</p>
        <p className="text-sm text-neutral-600 mt-4">
          <strong>Pro Tip:</strong> Layer with your favorite serum for enhanced benefits.
        </p>
      </div>
    ),
  },
  {
    id: "details",
    title: "Product Details",
    content: (
      <div className="space-y-2">
        <p>
          <strong>Volume:</strong> 50ml / 1.7 fl oz
        </p>
        <p>
          <strong>Skin Type:</strong> Suitable for all skin types, including sensitive skin
        </p>
        <p>
          <strong>Formulation:</strong> Lightweight, fast-absorbing cream
        </p>
        <p className="text-sm text-neutral-600">
          Dermatologically tested, cruelty-free, and vegan. Free from parabens, sulfates, and synthetic fragrances.
        </p>
      </div>
    ),
  },
  {
    id: "shipping",
    title: "Shipping & Returns",
    content: (
      <div className="space-y-2">
        <p>
          <strong>Shipping:</strong> Free standard shipping on all orders. Express shipping available at checkout.
        </p>
        <p>
          <strong>Returns:</strong> 30-day returns for unopened products. Free returns on all orders.
        </p>
      </div>
    ),
  },
]

export const ProductAccordions = ({ items = defaultItems }: ProductAccordionsProps) => {
  return (
    <Accordion.Root type="multiple" className="w-full">
      {items.map((item) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          className="border-b border-neutral-200"
        >
          <Accordion.Trigger className="flex items-center justify-between w-full py-5 text-left group">
            <span className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
              {item.title}
            </span>
            <ChevronDown className="w-5 h-5 text-neutral-600 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-open data-[state=closed]:animate-accordion-close">
            <div className="pb-6 text-sm text-neutral-700 leading-relaxed">
              {typeof item.content === "string" ? <p>{item.content}</p> : item.content}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
