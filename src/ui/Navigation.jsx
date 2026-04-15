import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

function Navigation() {
  return (
    <nav
      className={`flex justify-between px-6 items-center py-3 border-b border-gray/5 text-gray bg-accent fixed w-full top-0 z-100`}>
      <Link to="/">
        <img src={Logo} alt="Eventflow logo" width={30} />
      </Link>
      <div className="gap-4">
        <a href="#" className="font-semibold hover:bg-gray/5 p-4 rounded-full">
          Sign in
        </a>
      </div>
    </nav>
  );
}

export default Navigation;
