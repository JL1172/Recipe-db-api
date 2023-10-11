const express = require("express");
const RecipeData = require("./recipe-model"); 
const {validateRecipeId} = require("./recipe.middleware"); 

const router = express.Router();

router.get("/:id",validateRecipeId,async(req,res,next)=> {
    try {
        const result = await RecipeData.getRecipeById(req.params.id);
        res.status(200).json(result); 
    } catch(err) {next(err)}
})

router.post("/:id",async(req,res,next)=> {
    try {
        const result = await RecipeData.postNewRecipe(req.params.id,req.body);
        res.status(201).json(result);
    } catch (err) {next(err)}
})

router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "you messed up in some way, good luck",
        stack: error.stack
    })
})

module.exports = router;