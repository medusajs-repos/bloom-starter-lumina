import { ExecArgs } from "@medusajs/framework/types";
import {
    ContainerRegistrationKeys,
    ModuleRegistrationName,
} from "@medusajs/framework/utils";
import {
    createProductTagsWorkflow,
    createProductsWorkflow,
    linkProductsToSalesChannelWorkflow,
    reindexSearchIndexesWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * Seeds throwaway products so the store page's pagination, facets and sorts
 * have something to page through. Test data only — never run this against a
 * production database.
 *
 * Run it with:
 *
 *   npm run seed:pagination
 *
 * It is idempotent: products are keyed by handle (`test-product-01` …), so a
 * second run creates only what is missing. Every one of them carries the
 * "Test Data" tag, which is what makes them easy to find and bulk delete when
 * you're done.
 */

/** How many products to create. */
const PRODUCT_COUNT = 50;

/** Handle prefix, and the key that makes the script idempotent. */
const HANDLE_PREFIX = "test-product-";

/** Cycled so the grid isn't 50 identical placeholders. */
const THUMBNAILS = [
    "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/image-01KGS5C3SYG7TE5TADGHG73MBK.png",
    "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/image-01KGS5N6XS7SWQHD4PP2VXJJYB.png",
    "https://cdn.mignite.app/ws/works_01KGQ5H8GE886HVXP786G1873G/Lumina_3-01KGS6PGXWVS4225024G5BVJQ0.jpeg",
];

/**
 * Feeds the index's `labels` facet — that field is built from product tags.
 * The first value lands on every product; the rest are cycled.
 */
const TAG_VALUES = ["Test Data", "Vegan", "Fragrance-Free", "Bestseller"];

/** The categories these products spread across, by handle. */
const CATEGORY_HANDLES = ["moisturizers", "serums"];

/** Size combinations, cycled, so the `option_values` facet has real variety. */
const SIZE_SETS = [["30ml"], ["50ml", "100ml"], ["30ml", "50ml", "100ml"]];

/** Products created per workflow run, to keep each payload manageable. */
const BATCH_SIZE = 10;

export default async function seedPaginationProducts({ container }: ExecArgs) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const salesChannelModuleService = container.resolve(
        ModuleRegistrationName.SALES_CHANNEL
    );

    const [defaultSalesChannel] =
        await salesChannelModuleService.listSalesChannels({
            name: "Default Sales Channel",
        });

    // Everything below hangs off the initial seed's data. Bailing loudly beats
    // creating 50 products no storefront request can reach.
    if (!defaultSalesChannel) {
        logger.warn(
            "No 'Default Sales Channel' found — run the initial seed first, then re-run this script."
        );
        return;
    }

    const { data: categories } = await query.graph({
        entity: "product_category",
        fields: ["id", "handle"],
    });

    const categoryIds = CATEGORY_HANDLES.map(
        (handle) => categories.find((category) => category.handle === handle)?.id
    ).filter((id): id is string => Boolean(id));

    if (!categoryIds.length) {
        logger.warn(
            `No categories found for handles ${CATEGORY_HANDLES.join(
                ", "
            )} — products will be created without one, so the Category filter won't list them.`
        );
    }

    // Tags feed the index's `labels` facet. Create only the missing ones.
    const { data: existingTags } = await query.graph({
        entity: "product_tag",
        fields: ["id", "value"],
    });

    const missingTagValues = TAG_VALUES.filter(
        (value) => !existingTags.some((tag) => tag.value === value)
    );

    if (missingTagValues.length) {
        logger.info(`Creating ${missingTagValues.length} product tags...`);
        await createProductTagsWorkflow(container).run({
            input: {
                product_tags: missingTagValues.map((value) => ({ value })),
            },
        });
    }

    const { data: allTags } = await query.graph({
        entity: "product_tag",
        fields: ["id", "value"],
    });

    const tagIdByValue = new Map<string, string>(
        allTags.map((tag) => [tag.value as string, tag.id as string])
    );

    /**
     * The global (non-exclusive) options the initial seed creates. Reusing them
     * keeps every product on the same `option_values` facet values instead of
     * minting a parallel set the facet would then split across.
     */
    const { data: globalOptions } = await query.graph({
        entity: "product_option",
        fields: ["id", "title", "values.id", "values.value"],
        filters: { is_exclusive: false } as any,
    });

    const sizeOption = globalOptions.find((option) => option.title === "Size");
    const deliveryOption = globalOptions.find(
        (option) => option.title === "Delivery Option"
    );

    if (!sizeOption || !deliveryOption) {
        logger.warn(
            "Global 'Size' / 'Delivery Option' product options are missing — run the initial seed first, then re-run this script."
        );
        return;
    }

    const sizeValueId = (value: string) =>
        sizeOption.values?.find((optionValue: any) => optionValue.value === value)
            ?.id as string;

    // Which handles already exist, so a re-run only fills the gaps.
    const { data: existingProducts } = await query.graph({
        entity: "product",
        fields: ["id", "handle"],
    });

    const existingHandles = new Set(
        existingProducts.map((product) => product.handle)
    );

    const productsToCreate = Array.from({ length: PRODUCT_COUNT }, (_, index) => {
        const label = String(index + 1).padStart(2, "0");
        const sizes = SIZE_SETS[index % SIZE_SETS.length];

        // 10 → 105, in steps of 5, so the price range filter gets real bounds
        // and both price sorts have something to reorder.
        const basePrice = 10 + (index % 20) * 5;

        const tagIds = [
            tagIdByValue.get(TAG_VALUES[0]),
            tagIdByValue.get(TAG_VALUES[1 + (index % (TAG_VALUES.length - 1))]),
        ].filter((id): id is string => Boolean(id));

        return {
            title: `Test Product ${label}`,
            handle: `${HANDLE_PREFIX}${label}`,
            subtitle: "Seeded test data",
            description:
                "Placeholder product created by the pagination seed script. Safe to delete.",
            status: "published" as const,
            is_giftcard: false,
            discountable: true,
            thumbnail: THUMBNAILS[index % THUMBNAILS.length],
            images: [{ url: THUMBNAILS[index % THUMBNAILS.length] }],
            tag_ids: tagIds,
            category_ids: categoryIds.length
                ? [categoryIds[index % categoryIds.length]]
                : [],
            options: [
                {
                    id: sizeOption.id,
                    value_ids: sizes.map(sizeValueId).filter(Boolean),
                },
                { id: deliveryOption.id },
            ],
            variants: sizes.map((size, sizeIndex) => ({
                title: `${size} - One-time`,
                manage_inventory: false,
                options: { Size: size, "Delivery Option": "One-time" },
                prices: [
                    {
                        currency_code: "usd",
                        amount: basePrice + sizeIndex * 10,
                    },
                    {
                        currency_code: "eur",
                        amount: Math.round((basePrice + sizeIndex * 10) * 0.93),
                    },
                ],
            })),
        };
    }).filter((product) => !existingHandles.has(product.handle));

    if (!productsToCreate.length) {
        logger.info(`All ${PRODUCT_COUNT} test products already exist, skipping.`);
        return;
    }

    logger.info(`Creating ${productsToCreate.length} test products...`);

    const createdIds: string[] = [];

    // Batched: 50 products with their variants and prices in one workflow run is
    // a large transaction, and a failure part-way through is easy to resume from
    // when the handles already created are committed.
    for (let index = 0; index < productsToCreate.length; index += BATCH_SIZE) {
        const batch = productsToCreate.slice(index, index + BATCH_SIZE);

        const { result: created } = await createProductsWorkflow(container).run({
            input: { products: batch },
        });

        createdIds.push(...created.map((product) => product.id));

        logger.info(
            `Created ${createdIds.length}/${productsToCreate.length} test products.`
        );
    }

    // Without this the products exist but no storefront request can reach them.
    await linkProductsToSalesChannelWorkflow(container).run({
        input: {
            id: defaultSalesChannel.id,
            add: createdIds,
        },
    });

    logger.info(
        `Finished seeding ${createdIds.length} test products, linked to '${defaultSalesChannel.name}'.`
    );

    // The `product` search index consumes `product.created`, so it normally
    // picks these up on its own. Rebuilding from the index's `seed` closes the
    // gap when events were missed — and it is what makes the storefront's
    // search-driven store page show the new products immediately.
    try {
        await reindexSearchIndexesWorkflow(container).run({
            input: { index: "product" },
        });

        logger.info("Reindexed the 'product' search index.");
    } catch (error) {
        logger.warn(
            `Products were created, but reindexing the 'product' search index failed — the storefront's store page reads that index, so it may not list them yet. Is the Search Module registered in medusa-config.ts? ${
                error instanceof Error ? error.message : error
            }`
        );
    }
}
