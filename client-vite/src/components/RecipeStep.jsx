import React from "react";
import s from './RecipeStep.module.css'

const RecipeStep = (props) => {
    const { number, step, ingredients, equipment } = props;
    
    return(
        <div className={s.container} >
            <h4>» {number}° Paso</h4>
            <h5>• Descripción: </h5>
            <span>{step}</span>
            <h5>• Ingredientes: </h5>
            <span>{ingredients}</span>
            <h5>• Equipo Necesario: </h5>
            <span>{equipment || "Ninguno"}</span>
        </div>
    )
};

export default RecipeStep;