import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  // Limpiar búsqueda al hacer clic en el logo
  const navigate = useNavigate();
  const handleLogoClick = () => {
  navigate("/");
};

  return (
    <header className="flex items-center justify-between p-6">
      <button onClick={handleLogoClick} className="cursor-pointer">
        <img src="/logo-bg.png" alt="Logo" className="w-20 h-24" />
      </button>
      <nav className="flex items-center space-x-6">
        <NavLink
          to="/docs"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Docs
        </NavLink>
        <NavLink
          to="/about"
          className="text-gray-300 hover:text-white transition-colors"
        >
          About
        </NavLink>
        <NavLink to="/support" className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-gray-900  transition-colors">
          support us
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
