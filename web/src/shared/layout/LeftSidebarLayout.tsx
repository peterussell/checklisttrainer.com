import { Box, Stack } from "@mui/material"

type LeftSidebarLayoutProps = {
  sidebarContent: React.ReactElement,
  mainContent: React.ReactElement
}

export function LeftSidebarLayout({sidebarContent, mainContent}: LeftSidebarLayoutProps) {
  return (
    <Stack direction="row" gap={3}>
      <Box className="w-1/4">
        {sidebarContent}
      </Box>
      <Box className="w-3/4">
        {mainContent}
      </Box>
    </Stack>
  )
}