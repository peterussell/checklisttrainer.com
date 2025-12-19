import { Button, Stack, TextField, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import { useForm, Controller } from 'react-hook-form';

export const Route = createFileRoute('/_authenticated/aircraft/add')({
  component: AddAircraft,
})

const defaultValues = {
  registration: '',
  description: '',
}

function AddAircraft() {
   const { handleSubmit, reset, control } = useForm({ defaultValues });
  const onSubmit = data => console.log(data);

  return (
    <Stack>
      <Typography variant="h4">Add Aircraft</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Registration"
                  />
              )}
              control={control}
              name="registration"
            />

            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Description"
                  />
              )}
              control={control}
              name="description"
            />

            <Button variant="outlined" onClick={() => reset({ ...defaultValues })}>Reset</Button>
            <Button variant="contained" type="submit">Submit</Button>
          </Stack>
        </form>
    </Stack>
  );
}