import { Link } from "react-router-dom";
import NavButton from "../contend/navButton";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  location: { name: string };
  origin: { name: string };
};
type CharactersResponse = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
  results: Character[];
};
type CarsProps = {
  isLoading: boolean;
  searchError: boolean;
  dataToShow: CharactersResponse | undefined;
  currentPage: number;
  onPageChange: (page:number)=>void
};
function Cars({ isLoading, searchError, dataToShow, currentPage, onPageChange}: CarsProps) {
  return (
    <div className="max-w-11/12 mx-auto  pb-16">
      {isLoading && <div className="text-center">Cargando...</div>}
      {searchError && (
        <div className="text-center text-red-500">
          No se encontraron personajes.
        </div>
      )}
      <NavButton
        currentPage={currentPage}
        onPrev={() => onPageChange(currentPage - 1)}
        onNext={() => onPageChange(currentPage + 1)}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataToShow?.results.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
          >
            <Link to={`/character/${item.id}`} className="flex h-full">
              <div className="w-1/2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-4">
                <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                <div className="flex items-center mb-3">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      item.status === "Alive"
                        ? "bg-green-500"
                        : item.status === "Dead"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-300">
                    {item.status} - {item.species}
                  </span>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-gray-500">Last known location:</p>
                  <p className="text-sm">{item.location.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Origin:</p>
                  <p className="text-sm">{item.origin.name}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
