import { useAuth0 } from "@auth0/auth0-react";
import { Button, type ButtonProps } from "@mui/material";

function LogoutButton({slotProps}: {slotProps?: { button?: ButtonProps}}) {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}
      {...slotProps?.button}>
      Log Out
    </Button>
  );
}

export default LogoutButton;
