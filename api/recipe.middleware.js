const db = require("../data/db-config");

module.exports = {
    validateRecipeId,
}

async function validateRecipeId(req,res,next) {
    try {
        const isValid = await db("recipes").where("recipe_id", req.params.id).first();
        if (!isValid) {
            next({status : 404, message : `Recipe with recipe_id ${req.params.id} not found`})
        } else {
            next();
        }
    } catch (err) {next(err)}
}