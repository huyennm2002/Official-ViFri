import axios from 'axios';
import jwt from 'jsonwebtoken';
import Item from '../models/item.js';

export const getRecipesList = (req, res) => {
    const { token } = req.headers;
    const user = jwt.verify(token, process.env.TOKEN_KEY);
    Item.getList(user.user_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: "An error has occured"
            })
        }
        if (data.length == 0) return res.send({ message: "Your fridge is empty "});
        const itemListString = data.map(i => i.name).join(',+')
        getRecipes(itemListString).then(recipes => {
            return res.json(recipes);
        }).catch(error => {
            return res.send(500).send({message: "Error"});
        });
    })
}

async function getRecipes(itemList) {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=bb896ca7411a407bb3f3bd96ec379022&ingredients=${itemList}&number=5`)
        const recipes = [];
        const data = response.data;
        data.forEach(recipe => {
            const recipeObject = {
                title: recipe.title,
                image: recipe.image,
                missedIngredients: [],
                usedIngredients: []
            };
            if (recipe.missedIngredientCount <= 3 && recipe.usedIngredientCount >= 1) {
                recipe.missedIngredients.forEach(ingredient => {
                    recipeObject.missedIngredients.push({
                    name: ingredient.name,
                    amount: ingredient.amount
                    });
                });
                recipe.usedIngredients.forEach(ingredient => {
                    recipeObject.usedIngredients.push({
                    name: ingredient.name,
                    amount: ingredient.amount
                    });
                });
                recipes.push(recipeObject);
            }
        });
        console.log(recipes);
        return recipes;
    } catch(error)  {
        console.error(error);
    };
}
       