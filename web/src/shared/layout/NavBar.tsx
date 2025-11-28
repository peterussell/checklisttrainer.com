import LoginButton from "@shared/components/LoginButton";
import LogoutButton from "@shared/components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Divider, Stack, Typography, type ButtonProps } from "@mui/material";

import logo200 from '/logo-image-blue-200x200.png';

const loginButtonProps: ButtonProps = { variant: "contained", size: "small", sx: { textTransform: "none" } };

const activeStyling = "[&.active]:border border-white/50 rounded-sm p-2";

function NavBar() {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <>
      <Stack direction="row" gap={4} className="p-4 items-center bg-ct-blue text-white">
        {/* Inner stack to override gap */}
        <Stack direction="row" gap={1} className="items-center">
          <img src={logo200} width={60} className="self-center" />
          <Typography variant="h5" className="text-white">ChecklistTrainer.com</Typography>
        </Stack>

        <Box className="mt-1.5">
          <Button variant="text" className="text-white" href="/aircraft">Aircraft</Button>
        </Box>

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
