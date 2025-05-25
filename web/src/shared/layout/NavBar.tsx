import { Link } from "@tanstack/react-router";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar() {
  const { isAuthenticated } = useAuth0();
  
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>

        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
      </div>
      <hr />
    </>
  )
}

export default NavBar;
