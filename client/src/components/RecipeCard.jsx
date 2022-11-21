import React from 'react';
import { Link } from 'react-router-dom';
import s from './RecipeCard.module.css'

const RecipeCard = (props) => {
    
    const orderDiets = (arr) => {
        const aux = arr && arr.map(d => {
            if(typeof d === "object") {
                return d.value
            } else {
                return d
            }
        })
        return aux;
    }
    
    const diets = orderDiets(props.diets);

    const image = props.image || "https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg";

    return (
        <div className={s.container} >
            <Link to={`/recipeDetail/${props.id}`} >
                <h3 className={s.text} >{props.title}</h3>
                <img className={s.polaroid} src={image} alt={props.title} /><br/><br/>
            </Link>
            <h5 className={s.text}>{diets && diets.join(" / ").toLowerCase() }</h5>
            { props.healthScore ? <h5 className={s.text}>Healt Score: {props.healthScore} %</h5>: null}
            <Link to={`/recipeDetail/${props.id}`} >
                <h3 className={s.text} >Ver Receta →</h3>
            </Link>
        </div>
    )
};

export default RecipeCard;