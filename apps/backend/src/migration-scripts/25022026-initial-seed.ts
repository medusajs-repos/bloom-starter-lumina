import { MedusaContainer } from "@medusajs/framework";
import {
    ContainerRegistrationKeys,
    ModuleRegistrationName,
    Modules,
} from "@medusajs/framework/utils";
import {
    createDefaultsWorkflow,
    createProductCategoriesWorkflow,
    createProductsWorkflow,
    createRegionsWorkflow,
    createShippingOptionsWorkflow,
    createShippingProfilesWorkflow,
    createStockLocationsWorkflow,
    createTaxRegionsWorkflow,
    linkProductsToSalesChannelWorkflow,
    linkSalesChannelsToStockLocationWorkflow,
    updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";
import { CreateProductCategoryDTO } from "@medusajs/framework/types";


export default async function migration_25022026_initial_seed({
    container,
}: {
    container: MedusaContainer;
}) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const link = container.resolve(ContainerRegistrationKeys.LINK);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const storeModuleService = container.resolve(ModuleRegistrationName.STORE);
    const salesChannelModuleService = container.resolve(ModuleRegistrationName.SALES_CHANNEL);
    const fulfillmentModuleService = container.resolve(
        ModuleRegistrationName.FULFILLMENT
    );

    const { data: existingProductsAtStartup } = await query.graph({
        entity: "product",
        fields: ["id"],
    });

    // If we want to explicitly not seed data, or if it's an existing project with data seeded in a different way, skip the seeding.
    if (process.env.SKIP_INITIAL_SEED === "true" || existingProductsAtStartup.length > 0) {
        return
    }

    logger.info("Seeding defaults...");
    await createDefaultsWorkflow(container).run();

    const [store] = await storeModuleService.listStores();
    let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
        name: "Default Sales Channel",
    });


    await updateStoresWorkflow(container).run({
        input: {
            selector: { id: store.id },
            update: {
                supported_currencies: [
                    { currency_code: "usd", is_default: true },
                    { currency_code: "eur", is_tax_inclusive: true },
                ],
                default_sales_channel_id: defaultSalesChannel[0].id,
            },
        },
    });

    const { data: pricePreferences } = await query.graph({
        entity: "price_preference",
        fields: ["id"],
    });

    if (pricePreferences.length > 0) {
        const ids = pricePreferences.map((pp) => pp.id);
        await container.resolve(Modules.PRICING).deletePricePreferences(ids);
    }

    const europeanCountries = ["gb", "de", "dk", "se", "fr", "es", "it"];
    const { data: existingRegions } = await query.graph({
        entity: "region",
        fields: ["id", "name"],
    });

    let usRegion;
    let europeRegion;
    if (!existingRegions.length) {
        logger.info("Creating regions...");
        const { result: regionResult } = await createRegionsWorkflow(container).run(
            {
                input: {
                    regions: [
                        {
                            name: "US",
                            currency_code: "usd",
                            countries: ["us"],
                            payment_providers: ["pp_system_default"],
                            automatic_taxes: false,
                            is_tax_inclusive: false,
                        },
                        {
                            name: "Europe",
                            currency_code: "eur",
                            countries: europeanCountries,
                            payment_providers: ["pp_system_default"],
                            automatic_taxes: true,
                            is_tax_inclusive: true,
                        },
                    ],
                },
            }
        );
        usRegion = regionResult[0];
        europeRegion = regionResult[1];
    } else {
        logger.info("Regions already exist, skipping creation...");
        usRegion = existingRegions.find((r) => r.name === "US");
        europeRegion = existingRegions.find((r) => r.name === "Europe");
    }

    const { data: existingTaxRegions } = await query.graph({
        entity: "tax_region",
        fields: ["id", "name"],
    });

    if (!existingTaxRegions.length) {
        logger.info("Seeding tax regions...");
        const taxRates: Record<string, { rate: number; code: string; name: string }> =
        {
            gb: { rate: 20, code: "GB20", name: "UK VAT" },
            de: { rate: 19, code: "DE19", name: "Germany VAT" },
            dk: { rate: 25, code: "DK25", name: "Denmark VAT" },
            se: { rate: 25, code: "SE25", name: "Sweden VAT" },
            fr: { rate: 20, code: "FR20", name: "France VAT" },
            es: { rate: 21, code: "ES21", name: "Spain VAT" },
            it: { rate: 22, code: "IT22", name: "Italy VAT" },
        };

        await createTaxRegionsWorkflow(container).run({
            input: Object.entries(taxRates).map(([country_code, taxConfig]) => {
                return {
                    country_code,
                    provider_id: "tp_system",
                    default_tax_rate: {
                        rate: taxConfig.rate,
                        code: taxConfig.code,
                        name: taxConfig.name,
                        is_default: true,
                    },
                };
            }),
        });

        logger.info("Finished seeding tax regions.");
    } else {
        logger.info("Tax regions already exist, skipping creation...");
    }


    const { data: existingStockLocations } = await query.graph({
        entity: "stock_location",
        fields: ["id", "name"],
    });

    let stockLocation;
    if (!existingStockLocations.length) {
        logger.info("Seeding stock location data...");
        const { result: stockLocationResult } = await createStockLocationsWorkflow(
            container
        ).run({
            input: {
                locations: [
                    {
                        name: "Main Warehouse",
                        address: {
                            city: "",
                            country_code: "US",
                            address_1: "",
                        },
                    },
                ],
            },
        });
        stockLocation = stockLocationResult[0];

        await link.create({
            [Modules.STOCK_LOCATION]: {
                stock_location_id: stockLocation.id,
            },
            [Modules.FULFILLMENT]: {
                fulfillment_provider_id: "manual_manual",
            },
        });
    } else {
        logger.info("Stock location already exists, skipping creation...");
        stockLocation = existingStockLocations[0];
    }


    const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
        type: "default",
    });
    let shippingProfile;

    if (!shippingProfiles.length) {
        logger.info("Creating shipping profile...");
        const { result: shippingProfileResult } =
            await createShippingProfilesWorkflow(container).run({
                input: {
                    data: [
                        {
                            name: "Default Shipping Profile",
                            type: "default",
                        },
                    ],
                },
            });
        shippingProfile = shippingProfileResult[0];
    } else {
        logger.info("Shipping profile already exists, skipping creation...");
        shippingProfile = shippingProfiles[0];
    }

    const fulfillmentSets = await fulfillmentModuleService.listFulfillmentSets();

    let fulfillmentSet;
    if (!fulfillmentSets.length) {
        logger.info("Creating fulfillment set...");
        fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
            name: "Main Warehouse Delivery",
            type: "shipping",
            service_zones: [
                {
                    name: "Worldwide",
                    geo_zones: ["us", ...europeanCountries].map((country_code) => ({
                        country_code,
                        type: "country" as const,
                    })),
                },
            ],
        });

        await link.create({
            [Modules.STOCK_LOCATION]: {
                stock_location_id: stockLocation.id,
            },
            [Modules.FULFILLMENT]: {
                fulfillment_set_id: fulfillmentSet.id,
            },
        });
    } else {
        logger.info("Fulfillment set already exists, skipping creation...");
        fulfillmentSet = fulfillmentSets[0];
    }


    const { data: existingShippingOptions } = await query.graph({
        entity: "shipping_option",
        fields: ["id", "name"],
    });

    if (!existingShippingOptions.length) {
        logger.info("Creating shipping option...");
        await createShippingOptionsWorkflow(container).run({
            input: [
                {
                    name: "Standard Worldwide Shipping",
                    price_type: "flat",
                    provider_id: "manual_manual",
                    service_zone_id: fulfillmentSet.service_zones[0].id,
                    shipping_profile_id: shippingProfile.id,
                    type: {
                        label: "Standard",
                        description: "Ships worldwide",
                        code: "standard-worldwide",
                    },
                    prices: [
                        {
                            currency_code: "usd",
                            amount: 10,
                        },
                        {
                            currency_code: "eur",
                            amount: 10,
                        },
                    ],
                    rules: [
                        {
                            attribute: "enabled_in_store",
                            value: "true",
                            operator: "eq",
                        },
                        {
                            attribute: "is_return",
                            value: "false",
                            operator: "eq",
                        },
                    ],
                },
            ],
        });
    } else {
        logger.info("Shipping option already exists, skipping creation...");
    }

    await linkSalesChannelsToStockLocationWorkflow(container).run({
        input: {
            id: stockLocation.id,
            add: [defaultSalesChannel[0].id],
        },
    });

    // Seed product categories with nesting
    const { data: existingCategories } = await query.graph({
        entity: "product_category",
        fields: ["id", "handle", "name"],
    });

    const categoryHandles = existingCategories.map((c: any) => c.handle);
    const categoriesToCreate: CreateProductCategoryDTO[] = [];

    // Parent categories
    if (!categoryHandles.includes("moisturizers")) {
        categoriesToCreate.push({
            name: "Moisturizers",
            handle: "moisturizers",
            is_active: true,
            is_internal: false,
        },);
    }

    if (!categoryHandles.includes("serums")) {
        categoriesToCreate.push({
            name: "Serums",
            handle: "serums",
            is_active: true,
            is_internal: false,
        },);
    }

    if (categoriesToCreate.length > 0) {
        logger.info("Seeding product categories...");
        await createProductCategoriesWorkflow(container).run({
            input: {
                product_categories: categoriesToCreate,
            },
        });
    } else {
        logger.info("Product categories already exist, skipping creation...");
    }

    // Get updated categories including newly created ones
    const { data: allCategories } = await query.graph({
        entity: "product_category",
        fields: ["id", "handle", "name"],
    });

    // Create a map for easy lookup
    const categoryMap: Record<string, any> = {};
    allCategories.forEach((cat: any) => {
        categoryMap[cat.handle] = cat;
    });

    const getCategoryId = (handle: string) => {
        const category = allCategories.find((c: any) => c.handle === handle);
        return category ? category.id : null;
    };

    const { data: existingProducts } = await query.graph({
        entity: "product",
        fields: ["id", "handle"],
    });

    const existingHandles = existingProducts.map((p: any) => p.handle);

    const productsToCreate = [
        {
            title: "Hydrating Moisturizer",
            handle: "hydrating-moisturizer",
            subtitle: "Deep hydration for all skin types",
            description: "Our Hydrating Moisturizer provides deep, long-lasting hydration for all skin types. Formulated with hyaluronic acid and natural botanicals to restore moisture balance.",
            status: "published" as const,
            is_giftcard: false,
            discountable: true,
            category_ids: [getCategoryId("moisturizers")].filter((id): id is string => !!id),
            thumbnail: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/image-01KGS5C3SYG7TE5TADGHG73MBK.png",
            images: [
                { url: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/image-01KGS5C3SYG7TE5TADGHG73MBK.png" },
            ],
            options: [
                {
                    title: "Size",
                    values: ["50ml", "100ml"],
                },
                {
                    title: "Delivery Option",
                    values: ["One-time", "Monthly", "Quarterly"],
                },
            ],
            variants: [
                { title: "50ml - One-time", manage_inventory: false, options: { Size: "50ml", "Delivery Option": "One-time" }, prices: [{ currency_code: "usd", amount: 25 }, { currency_code: "eur", amount: 23 }] },
                { title: "50ml - Monthly", manage_inventory: false, options: { Size: "50ml", "Delivery Option": "Monthly" }, prices: [{ currency_code: "usd", amount: 22 }, { currency_code: "eur", amount: 20 }] },
                { title: "50ml - Quarterly", manage_inventory: false, options: { Size: "50ml", "Delivery Option": "Quarterly" }, prices: [{ currency_code: "usd", amount: 23 }, { currency_code: "eur", amount: 21 }] },
                { title: "100ml - One-time", manage_inventory: false, options: { Size: "100ml", "Delivery Option": "One-time" }, prices: [{ currency_code: "usd", amount: 45 }, { currency_code: "eur", amount: 42 }] },
                { title: "100ml - Monthly", manage_inventory: false, options: { Size: "100ml", "Delivery Option": "Monthly" }, prices: [{ currency_code: "usd", amount: 40 }, { currency_code: "eur", amount: 38 }] },
                { title: "100ml - Quarterly", manage_inventory: false, options: { Size: "100ml", "Delivery Option": "Quarterly" }, prices: [{ currency_code: "usd", amount: 42 }, { currency_code: "eur", amount: 39 }] },
            ],
        },
        {
            title: "Balancing Moisturizer",
            handle: "balancing-moisturizer",
            subtitle: "Balance and nourish your skin",
            description: "The Balancing Moisturizer helps regulate oil production while providing essential hydration. Perfect for combination and oily skin types.",
            status: "published" as const,
            is_giftcard: false,
            discountable: true,
            category_ids: [getCategoryId("moisturizers")].filter((id): id is string => !!id),
            thumbnail: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/image-01KGS5N6XS7SWQHD4PP2VXJJYB.png",
            images: [
                { url: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/image-01KGS5N6XS7SWQHD4PP2VXJJYB.png" },
            ],
            options: [
                {
                    title: "Size",
                    values: ["50ml", "100ml"],
                },
                {
                    title: "Delivery Option",
                    values: ["One-time", "Monthly", "Quarterly"],
                },
            ],
            variants: [
                { title: "50ml - One-time", manage_inventory: false, options: { Size: "50ml", "Delivery Option": "One-time" }, prices: [{ currency_code: "usd", amount: 28 }, { currency_code: "eur", amount: 26 }] },
                { title: "50ml - Monthly", manage_inventory: false, options: { Size: "50ml", "Delivery Option": "Monthly" }, prices: [{ currency_code: "usd", amount: 25 }, { currency_code: "eur", amount: 23 }] },
                { title: "50ml - Quarterly", manage_inventory: false, options: { Size: "50ml", "Delivery Option": "Quarterly" }, prices: [{ currency_code: "usd", amount: 26 }, { currency_code: "eur", amount: 24 }] },
                { title: "100ml - One-time", manage_inventory: false, options: { Size: "100ml", "Delivery Option": "One-time" }, prices: [{ currency_code: "usd", amount: 50 }, { currency_code: "eur", amount: 47 }] },
                { title: "100ml - Monthly", manage_inventory: false, options: { Size: "100ml", "Delivery Option": "Monthly" }, prices: [{ currency_code: "usd", amount: 45 }, { currency_code: "eur", amount: 42 }] },
                { title: "100ml - Quarterly", manage_inventory: false, options: { Size: "100ml", "Delivery Option": "Quarterly" }, prices: [{ currency_code: "usd", amount: 47 }, { currency_code: "eur", amount: 44 }] },
            ],
        },
        {
            title: "Protective Moisturizer",
            handle: "protective-moisturizer",
            subtitle: "Shield and protect your skin",
            description: "Our Protective Moisturizer creates a barrier against environmental stressors while keeping skin hydrated. Enriched with antioxidants and vitamins.",
            status: "published" as const,
            is_giftcard: false,
            discountable: true,
            category_ids: [getCategoryId("moisturizers")].filter((id): id is string => !!id),
            thumbnail: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Lumina_3-01KGS6PGXWVS4225024G5BVJQ0.jpeg",
            images: [
                { url: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Lumina_3-01KGS6PGXWVS4225024G5BVJQ0.jpeg" },
            ],
            options: [
                {
                    title: "Size",
                    values: ["50ml", "100ml"],
                },
                {
                    title: "Delivery Option",
                    values: ["One-time", "Monthly", "Quarterly"],
                },
            ],
            variants: [
                { title: "50ml - One-time", manage_inventory: false, options: { Size: "50ml", "Delivery Option": "One-time" }, prices: [{ currency_code: "usd", amount: 32 }, { currency_code: "eur", amount: 30 }] },
                { title: "50ml - Monthly", manage_inventory: false, options: { Size: "50ml", "Delivery Option": "Monthly" }, prices: [{ currency_code: "usd", amount: 29 }, { currency_code: "eur", amount: 27 }] },
                { title: "50ml - Quarterly", manage_inventory: false, options: { Size: "50ml", "Delivery Option": "Quarterly" }, prices: [{ currency_code: "usd", amount: 30 }, { currency_code: "eur", amount: 28 }] },
                { title: "100ml - One-time", manage_inventory: false, options: { Size: "100ml", "Delivery Option": "One-time" }, prices: [{ currency_code: "usd", amount: 58 }, { currency_code: "eur", amount: 55 }] },
                { title: "100ml - Monthly", manage_inventory: false, options: { Size: "100ml", "Delivery Option": "Monthly" }, prices: [{ currency_code: "usd", amount: 52 }, { currency_code: "eur", amount: 49 }] },
                { title: "100ml - Quarterly", manage_inventory: false, options: { Size: "100ml", "Delivery Option": "Quarterly" }, prices: [{ currency_code: "usd", amount: 54 }, { currency_code: "eur", amount: 51 }] },
            ],
        },
        {
            title: "Hydrating Serum",
            handle: "hydrating-serum",
            subtitle: "Intense hydration concentrate",
            description: "Our Hydrating Serum delivers concentrated moisture with fast absorption. Perfect for layering under moisturizer for extra hydration.",
            status: "published" as const,
            is_giftcard: false,
            discountable: true,
            category_ids: [getCategoryId("serums")].filter((id): id is string => !!id),
            thumbnail: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Skincare-nano_banana_pro_20260209_151810_1--01KH3C5JKAJY9YN6W5Z8YF3ADH.jpeg",
            images: [
                { url: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Skincare-nano_banana_pro_20260209_151810_1--01KH3C5JKAJY9YN6W5Z8YF3ADH.jpeg" },
            ],
            options: [
                {
                    title: "Size",
                    values: ["30ml"],
                },
                {
                    title: "Delivery Option",
                    values: ["One-time", "Monthly", "Quarterly"],
                },
            ],
            variants: [
                { title: "30ml - One-time", manage_inventory: false, options: { Size: "30ml", "Delivery Option": "One-time" }, prices: [{ currency_code: "usd", amount: 35 }, { currency_code: "eur", amount: 33 }] },
                { title: "30ml - Monthly", manage_inventory: false, options: { Size: "30ml", "Delivery Option": "Monthly" }, prices: [{ currency_code: "usd", amount: 32 }, { currency_code: "eur", amount: 30 }] },
                { title: "30ml - Quarterly", manage_inventory: false, options: { Size: "30ml", "Delivery Option": "Quarterly" }, prices: [{ currency_code: "usd", amount: 33 }, { currency_code: "eur", amount: 31 }] },
            ],
        },
        {
            title: "Balancing Serum",
            handle: "balancing-serum",
            subtitle: "Regulate and refine",
            description: "The Balancing Serum helps control oil production and minimize pores. Lightweight formula suitable for daily use.",
            status: "published" as const,
            is_giftcard: false,
            discountable: true,
            category_ids: [getCategoryId("serums")].filter((id): id is string => !!id),
            thumbnail: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Skincare-nano_banana_pro_20260209_152843_1--01KH3C7TF3X5VEMW4CY4EJHBWS.jpeg",
            images: [
                { url: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Skincare-nano_banana_pro_20260209_152843_1--01KH3C7TF3X5VEMW4CY4EJHBWS.jpeg" },
            ],
            options: [
                {
                    title: "Size",
                    values: ["30ml"],
                },
                {
                    title: "Delivery Option",
                    values: ["One-time", "Monthly", "Quarterly"],
                },
            ],
            variants: [
                { title: "30ml - One-time", manage_inventory: false, options: { Size: "30ml", "Delivery Option": "One-time" }, prices: [{ currency_code: "usd", amount: 38 }, { currency_code: "eur", amount: 36 }] },
                { title: "30ml - Monthly", manage_inventory: false, options: { Size: "30ml", "Delivery Option": "Monthly" }, prices: [{ currency_code: "usd", amount: 34 }, { currency_code: "eur", amount: 32 }] },
                { title: "30ml - Quarterly", manage_inventory: false, options: { Size: "30ml", "Delivery Option": "Quarterly" }, prices: [{ currency_code: "usd", amount: 36 }, { currency_code: "eur", amount: 34 }] },
            ],
        },
        {
            title: "Protective Serum",
            handle: "protective-serum",
            subtitle: "Defense against environmental damage",
            description: "Our Protective Serum shields skin from environmental stressors with powerful antioxidants. Lightweight and fast-absorbing.",
            status: "published" as const,
            is_giftcard: false,
            discountable: true,
            category_ids: [getCategoryId("serums")].filter((id): id is string => !!id),
            thumbnail: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Skincare-nano_banana_pro_20260209_152847_3--01KH3C679GEGYEC6ZENWGDXYWA.jpeg",
            images: [
                { url: "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Skincare-nano_banana_pro_20260209_152847_3--01KH3C679GEGYEC6ZENWGDXYWA.jpeg" },
            ],
            options: [
                {
                    title: "Size",
                    values: ["30ml"],
                },
                {
                    title: "Delivery Option",
                    values: ["One-time", "Monthly", "Quarterly"],
                },
            ],
            variants: [
                { title: "30ml - One-time", manage_inventory: false, options: { Size: "30ml", "Delivery Option": "One-time" }, prices: [{ currency_code: "usd", amount: 42 }, { currency_code: "eur", amount: 39 }] },
                { title: "30ml - Monthly", manage_inventory: false, options: { Size: "30ml", "Delivery Option": "Monthly" }, prices: [{ currency_code: "usd", amount: 38 }, { currency_code: "eur", amount: 36 }] },
                { title: "30ml - Quarterly", manage_inventory: false, options: { Size: "30ml", "Delivery Option": "Quarterly" }, prices: [{ currency_code: "usd", amount: 40 }, { currency_code: "eur", amount: 37 }] },
            ],
        },
    ];

    const newProducts = productsToCreate.filter(
        (p) => !existingHandles.includes(p.handle)
    );

    if (newProducts.length > 0) {
        const { result: createdProducts } = await createProductsWorkflow(container).run({
            input: { products: newProducts },
        });

        // Link products to sales channel
        await linkProductsToSalesChannelWorkflow(container).run({
            input: {
                id: defaultSalesChannel[0].id,
                add: createdProducts.map((p) => p.id),
            },
        });

        logger.info(`Created ${createdProducts.length} products.`);
    } else {
        logger.info("Products already exist, skipping.");
    }

    logger.info("Finished seeding data.");
}