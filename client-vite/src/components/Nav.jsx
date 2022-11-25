import React from "react";
import { Link } from "react-router-dom";
import s from './Nav.module.css'

const Nav = () => {
    return (
        <div className={s.container} >
            <Link to="/home"><button className={s.button} >Home</button></Link>
            <Link to="/create"><button className={s.button} >Crear Receta</button></Link>
        </div>
    )
};

export default Nav;