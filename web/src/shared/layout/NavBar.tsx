import { Link } from "@tanstack/react-router";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Divider, Stack, type ButtonProps } from "@mui/material";

const loginButtonProps: ButtonProps = { variant: 'outlined', size: "small" };

function NavBar() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Stack direction="row" gap={2} p={1} alignItems="center">
        <Link to="/" className="[&.active]:font-bold">Home</Link>{' | '}
        <Link to="/about" className="[&.active]:font-bold">About</Link>

        {isAuthenticated && <>{' | '}<Link to="/dashboard" className="[&.active]:font-bold">Dashboard</Link></>}

        <Box sx={{ marginLeft: 'auto' }}>
        {!isAuthenticated ?
          <LoginButton slotProps={{button: {...loginButtonProps}}} /> :
          <LogoutButton slotProps={{button: {...loginButtonProps}}} />}
        </Box>
      </Stack>
      <Divider />
    </>
  )
}

export default NavBar;
