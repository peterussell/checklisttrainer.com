import { Button, Stack, TextField, Typography } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'
import { useForm, Controller } from 'react-hook-form';

import type { AddAircraftDetailRequest } from '@ct/core/api/AddAircraftDetailRequest';
import { createAircraftQuery } from '@queries/createAircraftQuery';

export const Route = createFileRoute('/_authenticated/aircraft/add')({
  component: AddAircraft,
})

const defaultValues: AddAircraftDetailRequest = {
  registration: '',
  description: '',
};

function AddAircraft() {
   const { handleSubmit, reset, control } = useForm({ defaultValues });
  const onSubmit = async (data: AddAircraftDetailRequest) => {
    const response = await createAircraftQuery(data);
    console.log(response);
  }

  return (
    <Stack>
      <Typography variant="h4">Add Aircraft</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={1} className="w-100">
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