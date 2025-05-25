import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import React from "react";

function LogoutButton() {
  const { logout } = useAuth0();

  return <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})} variant="contained">Log Out</Button>
}

export default LogoutButton;
