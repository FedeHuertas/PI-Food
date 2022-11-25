import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getRecipes, setFilteredRecipes, getDiets } from "../redux/actions";
import s from './SearchBar.module.css'
import Recipes from './Recipes';

const SearchBar = () => {
    
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    const dispatch = useDispatch();

    const {recipes, diets} = useSelector(state => state)
    
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState("");
    
    const handleInputChange = (e) => {
        if(!e.target.value) dispatch(getRecipes())
        setSearch(e.target.value);
    };
    
    const selectFilter = (e) => {
        if(e.target.checked) {
            setFilters([...filters].concat(e.target.name));
        } else {
            setFilters([...filters].filter(d => d !== e.target.name));
        };
    };


    const handleFilter = () => {
        let filteredRecipes = recipes;
        filters.length && filters.forEach(f => {
            //filteredRecipes = filteredRecipes.filter(r => r.diets.includes(f))
            filteredRecipes = filteredRecipes.filter(r => {
                let aux = [];
                if (regexExp.test(r.id)) {
                    aux = r.diets.map(d => d.value.includes(f))
                } else {
                    aux = r.diets.map(d => d.length && d.includes(f))
                }

                if(aux.includes(true)) {
                    return true 
                } else {
                    return false
                };
            });
        });
        dispatch(setFilteredRecipes(filteredRecipes));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipes(search))
    }

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
    }, []);

    useEffect(() => handleFilter(), [filters]);
    
    return (
        <div className={s.container} >
        <form onSubmit={handleSubmit}>
            <h4>Búsqueda por nombre:</h4>
            <input type="text" onChange={handleInputChange} placeholder="Ingrese un nombre para buscar" name="search" />
            <button >Buscar</button><br/>
            <h4>Seleccione el tipo de dieta: </h4>
            <div className={s.filtersContainer} >
                {Array.isArray(diets) && diets.map(d => 
                        <a key={d.id} > 
                            <input type="checkbox" onChange={selectFilter} id={d.name} name={d.value} />
                            <label for={d.name}> {d.name} </label>
                        </a>
                )}
            </div>
        </form>
        </div>
    )
};

export default SearchBar;