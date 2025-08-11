import { useGetCharacterByIdQuery } from "@/api/postApi";
import { useParams } from "react-router-dom";

function CharacterDetail() {
  const { id } = useParams();
  const {
    data: character,
    error,
    isLoading,
  } = useGetCharacterByIdQuery(Number(id));
  if (isLoading) return <p className="text-white">Cargando...</p>;
  if (error) return <p className="text-red-500">Error cargando el personaje</p>;
  if (!character)
    return <p className="text-white">No se encontró el personaje</p>;

  return (
    <div className="p-6 text-white max-w-2xl mx-auto">
      <div className="flex">
        <img
          src={character.image}
          alt={character.name}
          className="mt-4 rounded-lg"
        />
        <div className="ml-4 flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{character.name}</h1>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
