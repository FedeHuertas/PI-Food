import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipe } from '../redux/actions';
import RecipeStep from "./RecipeStep";
import s from './RecipeDetail.module.css'
import notFoundImg from '../images/sad-food.jpg'

const RecipeDetail = (props) => {

    const dispatch = useDispatch();

    const recipeData = useSelector(state => state.recipe);

    useEffect(() => dispatch(getRecipe(props.match.params.id)), []);

    const steps = recipeData.hasOwnProperty("analyzedInstructions") && recipeData.analyzedInstructions.length ? recipeData.analyzedInstructions[0].steps : recipeData.steps || [];

    const diets = recipeData.diets && typeof recipeData.diets[0] === "object" ? recipeData.diets.map(d => d.value) : recipeData.diets || [];

    return (
        <div className={s.container} >
            <h2>{recipeData.title}</h2>
            <img className={s.polaroid} src={recipeData.image || notFoundImg} alt={recipeData.title} />
            <h3>{recipeData.name}</h3>
            <h3>Health Score: {recipeData.healthScore} %</h3>
            <h3>Dietas: </h3>
            <span>{diets.join(' / ').toLowerCase()}</span>
            <div className={s.summary}>
                <h3>Resumen:</h3>
                {<span dangerouslySetInnerHTML={{__html: recipeData.summary}} />}
            </div>
            <div className={s.steps} >
                <h3>Pasos:</h3>
                {steps.length ? steps.map(s => < RecipeStep 
                    key={s.number}
                    number={s.number} 
                    step={s.step} 
                    ingredients={typeof s.ingredients === "object" ? s.ingredients.map(i => i.name).join(", ") : s.ingredients} 
                    equipment={typeof s.equipment === "object" ? s.equipment.map(e => e.name).join(", ") : s.equipment} 
                />) : <p>Esta receta no tiene pasos</p>}
            </div>
        </div>
    )
};

export default RecipeDetail;