import { Link } from "@tanstack/react-router";
import LoginButton from "@shared/components/LoginButton";
import LogoutButton from "@shared/components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Divider, Stack, Typography, type ButtonProps } from "@mui/material";

const loginButtonProps: ButtonProps = { variant: "contained", size: "small", sx: { textTransform: "none" } };

const activeStyling = "[&.active]:border border-white/50 rounded-sm p-2";

function NavBar() {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <>
      <Stack direction="row" gap={4} className="p-4 items-center bg-ct-blue text-white">
        <Typography sx={{fontWeight: 'bold'}}>ChecklistTrainer.com</Typography>
        <Button variant="text" className="text-white" href="/aircraft">Aircraft</Button>

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
