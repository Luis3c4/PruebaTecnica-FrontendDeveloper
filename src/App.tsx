import { useGetCharactersQuery } from "./api/postApi";
function App() {
  const {data} = useGetCharactersQuery()
  console.log("data", data);
  console.log(data?.results);
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-400 text-center m-5">
        Prueba Técnica - Frontend Developer
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {data?.results.map((item) => (
          <div key={item.id} className="flex ">
            <div className="">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="">
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <p>
                {item.status} - {item.species} - {item.gender}
              </p>
              <p className="text-sm text-gray-500">Last known location:</p>
              <p className="text-sm">{item.origin.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
