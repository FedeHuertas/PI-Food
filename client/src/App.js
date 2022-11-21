import './App.css';
import { Route } from "react-router-dom";
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
        <Route path="/" >
          < Nav />
        </Route>

        <Route exact path="/" >
          <Landing />
        </Route>

        <Route path="/home" >
            <SearchBar />
            <Recipes />
        </Route>

        <Route path="/create">
          <CreateRecipe />
        </Route>

        <Route path="/recipeDetail/:id" component={RecipeDetail} />
      </div>

    </div>
  );
}

export default App;
