import React from "react";
import Nav from "../components/Nav";
import Recipes from "../components/Recipes";
import SearchBar from "../components/SearchBar";

const Home  = () => {
    return (
        <>
            <Nav/>
            <SearchBar />
            <Recipes/>
        </>
    )
};

export default Home;