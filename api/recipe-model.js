const db = require("../data/db-config");

async function getRecipeById(recipe_id) { //eslint-disable-line
    const firstReturnResult = await db("recipes as r")
    return firstReturnResult;
}

module.exports = {
    getRecipeById,
}