import Busqueda from "@/components/busqueda";
import Carts from "@/components/carts";
import { useState } from "react";
import { useGetCharactersQuery, useGetCharactersByNameQuery } from "@/api/postApi";
import Hero from "@/components/Hero";

function Home() {
const [searchName, setSearchName] = useState("");

const { data: allData, isLoading: loadingAll } = useGetCharactersQuery();
const { data: searchData, isLoading: loadingSearch, error: searchError } = useGetCharactersByNameQuery(searchName, { skip: !searchName });

const isLoading = searchName ? loadingSearch : loadingAll;
const dataToShow = searchName ? searchData : allData;
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Hero />
      <Busqueda onSearch={setSearchName} />
      <Carts
        isLoading={isLoading}
        searchError={!!searchError}
        dataToShow={dataToShow}
      />
    </div>
  );
}

export default Home;
