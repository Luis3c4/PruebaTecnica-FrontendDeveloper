
import { useState } from "react";
import { useGetCharactersQuery, useGetCharactersByNameQuery } from "./api/postApi";
import Busqueda from "./components/busqueda";
import Header from "./components/header";
import Carts from "./components/carts";
import Layout from "./components/layout";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Docs from "./sections/docs";
import Home from "./sections/home";
import Suport from "./sections/Suport";
function App() {
  const [searchName, setSearchName] = useState("");
  const { data: allData, isLoading: loadingAll } = useGetCharactersQuery();
  const { data: searchData, isLoading: loadingSearch, error: searchError } = useGetCharactersByNameQuery(searchName, { skip: !searchName });

  // Decide qué datos mostrar
  const dataToShow = searchName ? searchData : allData;
  console.log(dataToShow);
  const isLoading = searchName ? loadingSearch : loadingAll;

  const router= createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs" element={<Docs />} />
        <Route path="suport" element={<Suport />} />
      </Route>
    )
  )
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      {/* Hero Section */}
      <div className=" py-16 px-6 mb-6">
        <h1 className="text-6xl md:text-8xl font-bold text-center mb-4">
          The Rick and Morty API
        </h1>
      </div>
      <Busqueda onSearch={setSearchName} />
      <Carts isLoading={isLoading} searchError={!!searchError} dataToShow={dataToShow} />
    </div>
  );
}

export default App;
