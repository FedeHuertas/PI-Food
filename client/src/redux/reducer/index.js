import { GET_RECIPE, GET_RECIPES, GET_DIETS, SET_FILTERED_RECIPES } from "../actions";


export const initialState = {
    recipes: [],
    filteredRecipes: [],
    recipe: {},
    diets: {},
};

export const rootReducer = (state = initialState, action) => {

    switch(action.type) {

        case GET_RECIPE: {
            return {
                ...state,
                recipe: action.payload
            }
        }

        case GET_RECIPES: {
            return {
                ...state,
                recipes: action.payload
            }
        }

        case GET_DIETS: {
            return {
                ...state,
                diets: action.payload
            }
        }

        case SET_FILTERED_RECIPES: {
            return {
                ...state,
                filteredRecipes: action.payload
            }
        }
        
        default: return state
    };
};

export default rootReducer;