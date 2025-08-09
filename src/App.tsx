import Layout from "./components/layout";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Docs from "./sections/docs";
import Home from "./sections/home";
import Suport from "./sections/Suport";
function App() {

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
    <RouterProvider router={router} />
  );
}

export default App;
