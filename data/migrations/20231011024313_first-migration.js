/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
  .createTable("Recipes",table => {
    table.increments("recipe_id").primary();
    table.string("recipe_name",128)
    .unique()
    .notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  })
  .createTable("Steps",table => {
    table.increments("step_id").primary();
    table.integer("step_number").notNullable();
    table.string("step_instructions").notNullable();
    table.integer("recipe_id")
    .unsigned()
    .notNullable()
    .references("recipe_id")
    .inTable("Recipes")
    .onDelete("RESTRICT")
    .onUpdate("RESTRICT");
  })
  .createTable("Ingredients",table => {
    table.increments("ingredient_id").primary();
    table.string("ingredient_text").notNullable();
  })
  .createTable("Quantities",table => {
    table.increments("quantity_id").primary();
    table.integer("quantity_text").notNullable();
    table.integer("ingredient_id")
    .unsigned()
    .notNullable()
    .references("ingredient_id")
    .inTable("Ingredients")
    .onDelete("RESTRICT")
    .onUpdate("RESTRICT");
  })
  .createTable("Ingredients_Used",table => {
    table.increments("ingredient_used_id").primary();
    table.integer("ingredient_id").unsigned().notNullable()
    .references("ingredient_id").inTable("Ingredients").onDelete("RESTRICT")
    .onUpdate("RESTRICT");
    table.integer("step_id")
    .unsigned()
    .notNullable()
    .references("step_id")
    .inTable("Steps")
    .onDelete("RESTRICT")
    .onUpdate("RESTRICT");
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
  .dropTableIfExists("Ingredients_Used")
  .dropTableIfExists("Quantities")
    .dropTableIfExists("Ingredients")
    .dropTableIfExists("Steps")
    .dropTableIfExists("Recipes")
};
