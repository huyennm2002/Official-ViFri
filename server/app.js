import express from 'express';
import cors from "cors"
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import multer from 'multer';
import * as Auth from './app/controllers/authController.js'
import * as User from './app/controllers/usersController.js';
import * as Item from './app/controllers/itemsController.js';
import { getRecipeInstructions, getRecipesList, getAIrecipeInstructions } from './app/services/recipeGenerator.js';

dotenv.config();
const app = express();
const upload = multer({dest: 'uploads/'})

app.use(bodyParser.urlencoded({ extende: true }));
app.use(bodyParser.json());

var corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions));
app.use(express.json());

//auth
app.post('/signup', upload.single('avatar'), (req, res) => Auth.createUser(req, res));
app.post('/login', async (req, res) => await Auth.logIn(req, res));
app.post('/logout', (req, res) => Auth.logOut(req,res));

//user
app.get('/users', async (req, res) => await User.getUserInfo(req, res));
app.put('/users', upload.single('avatarFile'), async (req, res) => User.updateUserInfo(req, res));
app.get('/users/items', async (req, res) => await User.getItemList(req, res));
app.get('/users/reminder', (req, res) => User.getReminderList(req, res));

//item
app.post('/items', upload.single('image'), async (req, res) => Item.addItem(req, res));
app.get('/items', (req, res) => Item.getItemInfo(req, res));
app.put('/items', (req, res) => Item.updateItemInfo(req, res));
app.delete('/items', (req, res) => Item.deleteItem(req, res));
app.post('/items:getSummary', (req, res) => Item.getSummary(req, res));
//recipes
app.get('/human-recipes', async (req, res) => await getRecipesList(req, res));
app.get('/human-recipes/:recipeId', async (req, res) => await getRecipeInstructions(req, res));
app.get('/ai-recipes', async (req, res) => await getAIrecipeInstructions(req, res));
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

export default app;