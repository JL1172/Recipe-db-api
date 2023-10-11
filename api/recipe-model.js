const db = require("../data/db-config");

async function getRecipeById(recipe_id) { //eslint-disable-line
    const firstReturnResult = await db("recipes as r")
        .join("steps as s", "s.recipe_id", "r.recipe_id")
        .join("ingredients_used as i", "i.step_id", "s.step_id")
        .join("ingredients as ing", "ing.ingredient_id", "i.ingredient_id")
        .join("quantities as q", "q.ingredient_id", "ing.ingredient_id")
        .where("r.recipe_id", recipe_id);

    //creating steps body for data structure to match data structure below 
    const steps = [];

    for (let key of firstReturnResult) {
        steps.push({
            step_id: key.step_id,
            step_number: key.step_number,
            step_instructions: key.step_instructions,
            ingredients: !key.ingredient_id ? [] :
                [
                    {
                        ingredient_id: key.ingredient_id,
                        ingredient_name: key.ingredient_text,
                        quantity: key.quantity_text,
                    }
                ]
        })
    }

    const returnObj = {
        recipe_id: firstReturnResult[0].recipe_id,
        recipe_name: firstReturnResult[0].recipe_name,
        created_at: firstReturnResult[0].created_at,
        steps: steps,
    }

    return returnObj;
}


async function postNewRecipe(newRecipeData) {
    const { recipe_name, steps } = newRecipeData;

    const resultId = await db("recipes as r")
        .insert({ recipe_name: recipe_name })


    for (let i in steps) {
        if (steps[i].ingredients) {
            const result = await db("steps")
                .insert({
                    step_number: steps[i].step_number,
                    step_instructions: steps[i].step_instructions,
                    recipe_id: resultId[0]
                })
               
        } else {
            const result = await db("steps")
            .insert({
                step_number : steps[i].step_number,
                step_instructions : steps[i].step_instructions,
                 recipe_id : resultId[0]
                })
        }
        //     await db('quantities')
        //     .insert({
        //         quantity_text : steps[i].ingredients.quantity,
        //         ingredient_id : steps[i].ingredients.ingredient_id,
        //     })
    }


}
module.exports = {
    getRecipeById,
    postNewRecipe
}


/*
{
  "recipe_id" : 1,
  "recipe_name": "Spaghetti Bolognese",
  "created_at": "2021-01-01 08:23:19.120",
  "steps": [
    {
      "step_id": 11,
      "step_number": 1,
      "step_instructions": "Put a large saucepan on a medium heat",
      "ingredients": []
    },
    {
      "step_id": 12,
      "step_number": 2,
      "step_instructions": "Add 1 tbsp olive oil",
      "ingredients": [
        { "ingredient_id": 27, "ingredient_name": "olive oil", "quantity": 0.014 }
      ]
    },
  ]
}
*/