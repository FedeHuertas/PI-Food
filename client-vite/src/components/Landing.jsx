import React from "react";
import { Link } from "react-router-dom"
import s from './Landing.module.css'

const Landing = () => {
    return (
        <div className={s.container} >
            <h1 className={s.text} >Bienvenido a mi PI</h1>
            <h1 className={s.text} >Henry-Food</h1>
            <h4 className={s.text} >Presiona el botón para empezar...</h4>
            <Link to='/home'>
                < button className={s.startButton} >¡Vamos!</button>
            </Link> 
        </div>

    );
}

export default Landing;