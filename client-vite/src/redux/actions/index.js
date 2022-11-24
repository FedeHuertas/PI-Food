import axios from 'axios'

// ACTIONS TYPES
export const GET_RECIPES = "GET_RECIPES";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_RECIPE = "GET_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const SET_FILTERED_RECIPES = "SET_FILTERED_RECIPES"


// ACTIONS CREATORS
export const getRecipes = (search, diets) => async (dispatch) => {
    search = search ? search : "";
    try {
        const r = await axios(`/recipes?search=${search}`);
        return dispatch({ type: GET_RECIPES, payload: r.data });
    } catch (err) {
        return console.log(err);
    }
}

export const setFilteredRecipes = (filteredRecipes) => dispatch => {
    return dispatch({type: SET_FILTERED_RECIPES, payload: filteredRecipes})
}

export const getRecipe = (id) => dispatch => {
    return axios(`/recipes/${id}`)
    .then(r => dispatch({type: GET_RECIPE, payload: r.data}))
    .catch(err => console.log(err))
} 

export const getDiets = () => async dispatch => {
    try {
        const r = await axios('/diets');
        return dispatch({ type: GET_DIETS, payload: r.data });
    } catch (err) {
        return console.log(err);
    }
}