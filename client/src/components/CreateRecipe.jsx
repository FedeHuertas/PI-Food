import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import RecipeStep from "./RecipeStep";
import { getDiets } from "../redux/actions";
import s from './CreateRecipe.module.css'
import axios from 'axios';

const CreateRecipe = () => {

    const diets = useSelector(state => state.diets);
    const dispatch = useDispatch();
    const history = useHistory();

    const [recipe, setRecipe] = useState({
        title: "",
        summary: "",
        healthScore: 0,
        steps: [],
        image: ""
    });

    const [step, setStep] = useState({
        number: 1,
        step: "",
        ingredients: "",
        equipment: ""
    });

    const [diet, setDiet] = useState([]);

    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        setRecipe({
            ...recipe,
            [e.target.name]: e.target.value
        });
        setErrors(validate({...recipe,
            [e.target.name]: e.target.value
        }))
    };

    const handleStepChange = (e) => {
        setStep({
            ...step,
            [e.target.name]: e.target.value
        })
    };

    const handleAddStep = (e) => {
        e.preventDefault();
        setRecipe({
            ...recipe,
            steps: [...recipe.steps].concat(step)
        });
        setStep({
            ...step,
            number: step.number+1,
            step: "",
            ingredients: "",
            equipment: "",
            image: "",
        });
    };

    const selectDiet = (e) => {
        if(e.target.checked) {
            setDiet([...diet].concat(diets.find(d => d.value === e.target.name)))
        } else {
            setDiet([...diet].filter(d => d.value !== e.target.name));
        }
    };

    const handleCreateRecipe = (e) => {
        e.preventDefault();
        let aux = {...recipe,
            diets: diet}
        axios.post('/recipes', aux)
        .then(res => history.push(`/recipeDetail/${res.data.id}`))
        .catch(error => console.error('Error:', error))
    };

    useEffect(() => dispatch(getDiets()), []);

    return (
        <div className={s.container} >
        <form name="RecipeForm" onSubmit={handleCreateRecipe}>

            <h2>Crear Recetas</h2>

            <h3>Titulo: </h3>
            <input name="title" size="90" onChange={handleInputChange} className={errors.title && s.danger } />
            {errors.title && <span className={s.dangerText}>❗{errors.title}</span>}<br/>

            <h3>Resumen: </h3><br/>
            <textarea rows="4" cols="100" name="summary" onChange={handleInputChange} className={errors.summary && s.danger } />
            {errors.summary && <span className={s.dangerText}>❗{errors.summary}</span>}<br/>

            <h3>Puntos de Salud: </h3>
            <input type="float" name="healthScore" size="2" onChange={handleInputChange} placeholder={"%"} className={errors.healthScore && s.danger } />
            {errors.healthScore && <span className={s.dangerText}>❗{errors.healthScore}</span>}<br/>

            <h3>Imagen: </h3>
            <input size="90" name="image" onChange={handleInputChange} placeholder="ingrese una url" /><br/>

            <h4>Tipos de dieta: </h4>
            <div className={s.filtersContainer} >
                {Array.isArray(diets) && diets.map(d => 
                        <a key={d.id}> 
                            <input type="checkbox" onChange={selectDiet} id={d.name} name={d.value} />
                            <label for={d.name}> {d.name} </label><br/>
                        </a>
                )}
            </div>

            <h3>Pasos: </h3>

            <h4>{recipe.steps.length+1}° Paso: </h4>
            <textarea rows="4" cols="100" type="text" name="step" onChange={handleStepChange} value={step.step} /><br/>

            <h4>Ingredientes: </h4>
            <input size="90" name="ingredients" onChange={handleStepChange} value={step.ingredients} /><br/>

            <h4>Equipo Necesario: </h4>
            <input size="90" name="equipment" onChange={handleStepChange} value={step.equipment} /><br/>
            
            <div className={s.buttonContainer} >
                <button className={s.buttons} onClick={handleAddStep}>Agregar Paso</button>
                <button className={Object.keys(errors).length ? s.buttonsDisabled : s.buttons} type="submit" disabled={Object.keys(errors).length ? true : false} >Crear</button>
            </div>

        </form>

        {recipe.steps.length ? 
        recipe.steps.map(s => < RecipeStep 
            key={recipe.steps.indexOf(s)}
            number={recipe.steps.indexOf(s)+1}
            step={s.step}
            ingredients={s.ingredients}
            equipment={s.equipment}
            />)
        : null}

        </div>
    )
};

export const validate = (recipe) => {
    let errors = {}

    if(!recipe.title) {
        errors.title = "El título es obligatorio."
    };

    if(!recipe.summary) {
        errors.summary = "Este campo es obligatorio"
    };

    if( recipe.healthScore < 0 || recipe.healthScore > 100 ) {
        errors.healthScore = "Debe ingresar un número del 1 al 100"
    };

    return errors;
}

export default CreateRecipe;