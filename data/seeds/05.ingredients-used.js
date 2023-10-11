/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Ingredients_Used').truncate()
  await knex('Ingredients_Used').insert([
    {ingredient_id : 1, step_id : 1},
    {ingredient_id : 2, step_id : 2},
    {ingredient_id : 3, step_id : 3},
    {ingredient_id : 4, step_id : 4},
  ]);
};
