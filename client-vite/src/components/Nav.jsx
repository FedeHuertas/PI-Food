import React from "react";
import { Link } from "react-router-dom";
import s from './Nav.module.css'

const Nav = () => {
    return (
        <div className={s.container} >
            <Link to="/home" className={s.button} ><button>Home</button></Link>
            <Link to="/create" className={s.button} ><button>Crear Receta</button></Link>
        </div>
    )
};

export default Nav;