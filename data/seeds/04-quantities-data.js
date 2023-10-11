/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Quantities').truncate()
  await knex('Quantities').insert([
    {quantity_text: 4,ingredient_id : 1},
    {quantity_text: 2.5,ingredient_id : 2},
    {quantity_text: 6,ingredient_id : 3},
    {quantity_text: 4.2,ingredient_id : 4},
  ]);
};
