import axios from 'axios';
import { getAuthorization } from '../helpers/APIHelper.js';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  });
const openai = new OpenAIApi(configuration)

export const getAIrecipeInstructions = async (req, res) => {
    const { user } = getAuthorization(req.headers);
    const ingredients = req.query.ingredients;

    if (ingredients == null) {
        return res.status(400).json({
            message: "Ingredients are not specified"
        })
    }

    const model = "text-davinci-003";
    const recipeCompletion = await submitOpenAIrequest(model, generateCookingRecipePrompt(ingredients), 2048);
    if (recipeCompletion == null) {
        return res.status(500).json({message: "Unable to retrieve recipe title from openAPI", status: 500});
    }
    const lines = recipeCompletion.data.choices[0].text.split('\n');
    
    let completeRecipeTitle = "";
    let completeIngredients = [];
    let completeInstructions = [];

    const recipeTitleIndex = lines.findIndex(line => line.includes("Recipe Title:"));
    const ingredientsIndex = lines.findIndex(line => line.includes("Ingredients:"));
    const instructionsIndex = lines.findIndex(line => line.includes("Instructions:"));
    
    completeRecipeTitle = lines[recipeTitleIndex].substring("Recipe Title:".length);
    
    for (let i = ingredientsIndex + 1; i < instructionsIndex; i++) {
        if (lines[i].trim() == "") continue;
        completeIngredients.push(lines[i].trim());
    }

    for (let i = instructionsIndex + 1; i < lines.length; i++) {
        if (lines[i].trim() == "") continue;
        completeInstructions.push(lines[i].trim());
    }

    const completeRecipe = {
        title: completeRecipeTitle,
        ingredients: completeIngredients,
        instructions: completeInstructions
    };
    return res.status(200).json(completeRecipe);
}

const submitOpenAIrequest = async (model, promptText, maxTokens) => {
    try {
        const completion = await openai.createCompletion({
            model: model,
            prompt: promptText,
            temperature: 0.6,
            max_tokens: maxTokens
        });
        return completion;
    } catch(error) {
        console.log(error);
        return null;
    }
}

const generateCookingRecipePrompt = (ingredients) => {
    return `Generate a cooking recipe with sections recipe title, ingredients, and instructions with these ingredients${ingredients}`
}

// Get Recipe Instructions from Spoonacular
export const getRecipeInstructions = async (req, res) => {
    const { user } = getAuthorization(req.headers);
    const recipeId = req.params.recipeId;
    

    if (recipeId == null) {
        return res.send({
            message: "Recipe is unspecified"
        })
    }

    const spoonacularResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${process.env.SPOONACULAR_API_KEY}`);

    // construct api response, a list of objects with number: int and step: string 
    const instructionResponse = [];
    if (spoonacularResponse.status != 200) {
        return res.send({
            message: "Failed to fetch cooking instructions from spoonacular"
        });
    }
    const spoonacularData = spoonacularResponse.data;
    const steps = [];
    if (spoonacularData !== null || spoonacularData != []) {
        // Generate a list of steps
        if (spoonacularData[0].steps !== null) {
            spoonacularData[0].steps.forEach(instructionStep => {
                steps.push({
                    number: instructionStep.number,
                    step: instructionStep.step
                });
            })
        }
    }
    
    return res.json(steps);
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
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.SPOONACULAR_API_KEY}&ingredients=${itemList}&number=3`)
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
       