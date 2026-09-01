import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import seedPaginationProducts from "../scripts/seed-pagination-products";

/**
 * Creates the 50 throwaway products from `src/scripts/seed-pagination-products.ts`
 * as part of `db:migrate`.
 *
 * OFF BY DEFAULT, and deliberately so. Files in this directory run
 * automatically on every `db:migrate` — including every Cloud deploy — and only
 * ever once, so an ungated version would push test data into any database this
 * project is deployed to, with no second chance to skip it. Opt in per
 * environment:
 *
 *   SEED_PAGINATION_TEST_PRODUCTS=true npx medusa db:migrate
 *
 * For local work prefer `npm run seed:pagination`, which runs the same function
 * through `medusa exec`: no env var, and re-runnable as often as you like.
 *
 * The `26022026` prefix is not a real date. Migration scripts run in ascending
 * filename order, and this one has to run AFTER `25022026-initial-seed.ts`: that
 * script skips the whole seed when any product already exists, so seeding test
 * products ahead of it would leave a fresh database with no regions, sales
 * channel or categories. The seed function guards against that case too, but the
 * ordering keeps it from arising.
 */
export default async function migration_pagination_test_products({
    container,
}: {
    container: MedusaContainer;
}) {
    const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

    if (process.env.SEED_PAGINATION_TEST_PRODUCTS !== "true") {
        return;
    }

    logger.info(
        "SEED_PAGINATION_TEST_PRODUCTS is set — seeding pagination test products."
    );

    await seedPaginationProducts({ container, args: [] });
}
