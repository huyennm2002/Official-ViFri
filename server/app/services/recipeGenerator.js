import axios from 'axios';
import jwt from 'jsonwebtoken';
import { getAuthorization } from '../helpers/APIHelper.js';
import Item from '../models/item.js';

const SPOONACULAR_API_KEY = 'bb896ca7411a407bb3f3bd96ec379022'
// Get Recipe Instructions from Spoonacular
export const getRecipeInstructions = async (req, res) => {
    const { user } = getAuthorization(req.headers);
    const recipeId = req.params.id;

    if (recipeId == null) {
        return res.send({
            message: "Recipe is unspecified"
        })
    }

    const spoonacularResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`);

    // construct api response, a list of objects with number: int and step: string 
    const instructionResponse = [];
    if (spoonacularResponse.status != 200) {
        return res.send({
            message: "Failed to fetch cooking instructions from spoonacular"
        });
    }

    
}

export const getRecipesList = async (req, res) => {
    const { user } = getAuthorization(req.headers)
    const ingredients = req.query.ingredients;

    if (ingredients == null) {
        return res.send({
            message: "Ingredients are not specified"
        })
    }
    const recipes = await getRecipes(ingredients);
    return res.json(recipes);
}

async function getRecipes(itemList) {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${SPOONACULAR_API_KEY}&ingredients=${itemList}&number=3`)
        const recipes = [];
        const data = response.data;
        data.forEach(recipe => {
            const recipeObject = {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                missedIngredients: [],
                usedIngredients: []
            };
            if (recipe.missedIngredientCount <= 6 && recipe.usedIngredientCount >= 1) {
                recipe.missedIngredients.forEach(ingredient => {
                    recipeObject.missedIngredients.push({
                    name: ingredient.name,
                    amount: ingredient.amount,
                    unit: ingredient.unit
                    });
                });
                recipe.usedIngredients.forEach(ingredient => {
                    recipeObject.usedIngredients.push({
                    name: ingredient.name,
                    amount: ingredient.amount,
                    unit: ingredient.unit
                    });
                });
                recipes.push(recipeObject);
            }
        });
        return recipes;
    } catch(error)  {
        console.log(error);
        return res.send(error);
    };
}
       