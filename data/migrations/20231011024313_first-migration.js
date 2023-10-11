/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
  .createTable("Recipes",table => {
    table.increments("recipe_id")
    table.string("recipe_name",128)
    .unique()
    .notNullable()
    table.timestamp("created at").defaultTo(knex.fn.now())
  })
  .createTable("Steps",table => {
    table.increments("step_id")
    table.string("step_instructions").notNullable();
    table.integer("recipe_name")
    .unsigned()
    .notNullable()
    .references("recipe_id")
    .inTable("Recipes")
    .onDelete("RESTRICT")
    .onUpdate("RESTRICT")
  })
  .createTable("Ingredients",table => {
    table.increments("ingredient_id")
    table.string("ingredient_text").notNullable()
    table.integer("step_id")
    .unsigned()
    .notNullable()
    .references("step_id")
    .inTable("Steps")
    .onDelete("RESTRICT")
    .onUpdate("RESTRICT")
  })
  .createTable("Quantities",table => {
    table.increments("quantity_id")
    table.string("quantity_text").notNullable()
    table.integer("ingredient_id")
    .unsigned()
    .notNullable()
    .references("ingredient_id")
    .inTable("Ingredients")
    .onDelete("RESTRICT")
    .onUpdate("RESTRICT")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists("Quantities")
    .dropTableIfExists("Ingredients")
    .dropTableIfExists("Steps")
    .dropTableIfExists("Recipes")
};
