// ACTIONS TYPES
export const GET_RECIPES = "GET_RECIPES";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_RECIPE = "GET_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const SET_FILTERED_RECIPES = "SET_FILTERED_RECIPES"


// ACTIONS CREATORS
export const getRecipes = (search, diets) => dispatch => {
    search = search ? search : "";
    return fetch(`http://localhost:3001/recipes?search=${search}`)
    .then(r => r.json())
    .then(r => dispatch({type: GET_RECIPES, payload: r}))
}

export const setFilteredRecipes = (filteredRecipes) => dispatch => {
    return dispatch({type: SET_FILTERED_RECIPES, payload: filteredRecipes})
}

export const getRecipe = (id) => dispatch => {
    return fetch(`http://localhost:3001/recipes/${id}`)
    .then(r => r.json())
    .then(r => dispatch({type: GET_RECIPE, payload: r}))
} 

export const getDiets = () => dispatch => {
    return fetch('http://localhost:3001/diets')
    .then(r => r.json())
    .then(r => dispatch({type: GET_DIETS, payload: r}))
}