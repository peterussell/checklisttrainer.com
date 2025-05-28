import { useAuth0 } from "@auth0/auth0-react";
import { Button, type ButtonProps } from "@mui/material";
import React from "react";

function LoginButton({slotProps}: {slotProps?: { button?: ButtonProps}}) {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button onClick={() => loginWithRedirect()} variant="contained" {...slotProps?.button}>
      Log In
    </Button>
  );
}

export default LoginButton;
