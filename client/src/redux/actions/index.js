import axios from 'axios'

// ACTIONS TYPES
export const GET_RECIPES = "GET_RECIPES";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_RECIPE = "GET_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const SET_FILTERED_RECIPES = "SET_FILTERED_RECIPES"


// ACTIONS CREATORS
export const getRecipes = (search, diets) => dispatch => {
    search = search ? search : "";
    return axios(`/recipes?search=${search}`)
    .then(r => dispatch({type: GET_RECIPES, payload: r.data}))
}

export const setFilteredRecipes = (filteredRecipes) => dispatch => {
    return dispatch({type: SET_FILTERED_RECIPES, payload: filteredRecipes})
}

export const getRecipe = (id) => dispatch => {
    return axios(`/recipes/${id}`)
    .then(r => dispatch({type: GET_RECIPE, payload: r.data}))
} 

export const getDiets = () => dispatch => {
    return axios('/diets')
    .then(r => dispatch({type: GET_DIETS, payload: r.data}))
}