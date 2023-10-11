/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Recipes').truncate()
  await knex('Recipes').insert([
    {recipe_name: 'PB&J'},
    {recipe_name: 'Ham and Cheese Sandwich'},
  ]);
};
