import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import { setFilteredRecipes } from '../redux/actions';
import s from './Recipes.module.css'

const itemsPerPage = 9;

const Recipes = () => {
  
  const dispatch = useDispatch();

  const {recipes, filteredRecipes} = useSelector(state => state);
  
  const [items, setItems] = useState([...filteredRecipes].splice(0, itemsPerPage));
  const [currentPage, setCurrentPage] = useState(0);

  const nextHandler = () => {
    const totalItems = filteredRecipes.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * itemsPerPage;

    if(firstIndex >= totalItems) return;

    setItems([...filteredRecipes].splice(firstIndex, itemsPerPage));
    setCurrentPage(nextPage);
  };

  const handlePage = (number) => {
    setCurrentPage(number-1);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;

    if(prevPage < 0) return

    const firstIndex = prevPage * itemsPerPage;

    setItems([...filteredRecipes].splice(firstIndex, itemsPerPage));
    setCurrentPage(prevPage);
  };

  const sort = (e) => {
    switch(e.target.value){
      case "A ⇒ Z": {
        dispatch(setFilteredRecipes([...filteredRecipes].sort((a, b) => a.title.localeCompare(b.title))))
        break
      };
      case "Z ⇒ A": {
        dispatch(setFilteredRecipes([...filteredRecipes].sort((a, b) => b.title.localeCompare(a.title))))
        break
      };
      case "Ascendente": {
        dispatch(setFilteredRecipes([...filteredRecipes].sort((a, b) => (a.healthScore - b.healthScore))))
        break
      };
      case "Descendente": {
        dispatch(setFilteredRecipes([...filteredRecipes].sort((a, b) => (b.healthScore - a.healthScore))))
        break
      };
      default: return
    }
  };

  useEffect(() => {
    setItems([...filteredRecipes].splice(0, itemsPerPage));
    setCurrentPage(0)
  }, [filteredRecipes]);

  useEffect(() => {  
    dispatch(setFilteredRecipes([...recipes]))
    setCurrentPage(0);
  }, [recipes]);

  useEffect(() => {
    setItems([...filteredRecipes].splice(currentPage * itemsPerPage, itemsPerPage))
  }, [currentPage]);

  return (
      <div className={s.container} >
        <div className={s.options}>          
        <label for="sort">Ordenar: </label>
        <select name="Ordenar" id="sort" onChange={sort}>
          <optgroup label="Por nombre">
            <option>Seleccione una opción</option>
            <option>A ⇒ Z</option>
            <option>Z ⇒ A</option>
          </optgroup>
          <optgroup label="Por Health Score">
            <option>Ascendente</option>
            <option>Descendente</option>
          </optgroup>
        </select><br/>
        <span>{filteredRecipes.length} resultados</span><br/>
        <span>Página: {currentPage+1} / {Math.ceil(filteredRecipes.length/itemsPerPage) || 1}</span><br/>
      </div><br/>
      <button onClick={prevHandler}>←</button>
      < Pagination itemsPerPage={itemsPerPage} handlePage={handlePage} totalItems={filteredRecipes.length} page={currentPage}/>
      <button onClick={nextHandler}>→</button><br/>
      <div className={s.recipesContainer}>
          {items.length ? items.map(r => < RecipeCard 
              key = {r.id}
              id = {r.id}
              title = {r.title}
              image = {r.image}
              diets = {r.diets}
              healthScore = {r.healthScore}
              />
          ) : <RecipeCard title={"No se encontraron resultados"} />}
        </div>
        <button onClick={prevHandler}>←</button>
        < Pagination itemsPerPage={itemsPerPage} handlePage={handlePage} totalItems={filteredRecipes.length} page={currentPage}/>
        <button onClick={nextHandler}>→</button>
      </div>
  )
};

export default Recipes;