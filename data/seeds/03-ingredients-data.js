/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Ingredients').truncate()
  await knex('Ingredients').insert([
    {ingredient_text: 'peanut butter', step_id : 1},
    {ingredient_text: 'jelly',step_id : 2},
    {ingredient_text: 'ham', step_id : 3},
    {ingredient_text: 'cheese', step_id : 4}
  ]);
};
