export interface HumanRecipesProviderPropsType {
    navigation: any,
    ingredients: string[]
}

export interface HumanRecipe {
    id: number,
    title: string,
    image: string,
    missedIngredients: Ingredient[],
    usedIngredients: Ingredient[]
}

export interface Ingredient {
    name: string,
    amount: number,
    unit: string
}

export interface GptRecipesProviderProps {
    ingredients: string[]
}

export interface AIRecipeType {
    title: string,
    ingredients: string[],
    instructions: string[]
}