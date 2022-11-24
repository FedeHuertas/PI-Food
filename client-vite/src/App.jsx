import './App.css';
import { Route, Routes } from "react-router-dom";
import SearchBar from './components/SearchBar';
import Recipes from './components/Recipes';
import CreateRecipe from './components/CreateRecipe';
import RecipeDetail from './components/RecipeDetail';
import Nav from './components/Nav';
import Landing from './components/Landing';

function App() {
  return (
    <div className="App">
      <div className="container">
      <Routes>
        <Route path="/" element={<Nav />} />

        <Route exact path="/" element={<Landing/>} />

        <Route exact path="/home" element={<SearchBar />} />

        <Route exact path="/create" element={<CreateRecipe />} />

        <Route exact path="/recipeDetail/:id" element={<RecipeDetail />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
