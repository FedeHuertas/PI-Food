import './App.css';
import { Route, Routes } from "react-router-dom";
import CreateRecipe from './pages/CreateRecipe';
import RecipeDetail from './components/RecipeDetail';
import Landing from './components/Landing';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <div className="container">
      <Routes>

        <Route exact path="/" element={<Landing/>} />

        <Route exact path="/home" element={<Home />} />

        <Route exact path="/create" element={<CreateRecipe />} />

        <Route exact path="/recipeDetail/:id" element={<RecipeDetail />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
