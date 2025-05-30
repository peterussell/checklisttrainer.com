import { useAuth0 } from '@auth0/auth0-react'
import { Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // tmp - tanstack query test
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['newsTest'],
    queryFn: async () => {
      const response = await fetch('https://chroniclingamerica.loc.gov/lccn/sn86069873/1900-01-05/ed-1.json');
      return await response.json();
    }
  })

  function renderData() {
    if (isPending || error || !data) return null;

    return (
      <Stack p={2}>
      <Typography variant="h6">{data.title.name}</Typography>
      <Typography >Issued {data.date_issued}</Typography>
      {data.pages.map((p: {url: string, sequence: string}) => {
        return <a href={p.url}>{p.sequence}</a>
      })}
      {isFetching && 'Updating...'}
      </Stack>
    )
  }

  return (
    <Stack>
      <Typography variant="h4">
        Home
      </Typography>

      {isLoading && (<Typography>Loading...</Typography>)}

      {isAuthenticated && user && (
        <Stack direction="row" gap={2} m={2}>
          <img src={user.picture} alt={user.name} width="30px" />
          <Typography>Logged in as {user.email}</Typography>
        </Stack>
      )}

      {/* TMP - tanstack query test */}
      <Typography variant="h4">News (tanstack query test)</Typography>
      {isPending && 'Loading...'}
      {error && `Error: ${error.message}`}
      {renderData()}

    </Stack>
    
  )
}