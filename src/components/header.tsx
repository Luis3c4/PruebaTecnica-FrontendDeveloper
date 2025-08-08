import { Link } from "react-router";

function Header() {
  return (
    <header className="flex items-center justify-between p-6">
      <Link to="/">
        <img src="/logo-bg.png" alt="Logo" className="w-20 h-25" />
      </Link>
      <nav className="flex items-center space-x-6">
        <a
          href="#"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Docs
        </a>
        <a
          href="#"
          className="text-gray-300 hover:text-white transition-colors"
        >
          About
        </a>
        <button className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-gray-900  transition-colors">
          support us
        </button>
      </nav>
    </header>
  );
}

export default Header;
