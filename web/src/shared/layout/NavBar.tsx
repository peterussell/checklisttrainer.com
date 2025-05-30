import { Link } from "@tanstack/react-router";
import LoginButton from "@shared/components/LoginButton";
import LogoutButton from "@shared/components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Divider, Stack, Typography, type ButtonProps } from "@mui/material";

const loginButtonProps: ButtonProps = { variant: "contained", size: "small", sx: { textTransform: "none" } };

const activeStyling = "[&.active]:border-b-1 border-solid border-white";

function NavBar() {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <>
      <Stack direction="row" gap={4} p={1} pl={4} alignItems="center" className="bg-ct-blue text-white">
        <Typography sx={{fontWeight: 'bold'}}>ChecklistTrainer.com</Typography>
        <Link to="/" className={activeStyling}>Home</Link>
        <Link to="/about" className={activeStyling}>About</Link>
        <Link to="/dashboard" className={activeStyling}>Dashboard</Link>

        <Box sx={{ marginLeft: 'auto' }}>
        {isLoading ? null : 
          !isAuthenticated ?
            <LoginButton slotProps={{button: {...loginButtonProps}}} /> :
            <LogoutButton slotProps={{button: {...loginButtonProps}}} />}
        </Box>
      </Stack>
      <Divider />
    </>
  )
}

export default NavBar;
