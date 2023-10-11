/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('steps').truncate()
  await knex('steps').insert([
    {step_instructions: 'get bread and put peanut butter on one side', recipe_id : 1, step_number : 1},
    {step_instructions: 'get bread and put jelly on the other side', recipe_id : 1,step_number : 2},
    {step_instructions: 'get bread and put ham on on side', recipe_id : 2,step_number : 1},
    {step_instructions: 'get bread and put cheese on the other side', recipe_id : 2,step_number : 2},
  ]);
};
