import Layout from "./components/layout";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Docs from "./sections/docs";
import Home from "./sections/home";
import Suport from "./sections/Suport";
import About from "./sections/About";
import CharacterDetail from "./components/CharacterDetail";
function App() {

  const router= createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="docs" element={<Docs />} />
        <Route path="support" element={<Suport />} />
        <Route path="character/:id" element={<CharacterDetail />} />

      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  );
}

export default App;
