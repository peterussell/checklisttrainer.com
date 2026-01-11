import { AddAircraftDetailRequestSchema, type AddAircraftDetailRequest } from "@ct/core/api/AddAircraftDetailRequest";
import { Button, Stack, TextField } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const defaultValues: AddAircraftDetailRequest = {
  registration: '',
  description: '',
};

export function AddAircraftDetail({ onSubmit }: { onSubmit: (data: AddAircraftDetailRequest) => void }) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid }
  } = useForm<AddAircraftDetailRequest>({
    defaultValues,
    resolver: zodResolver(AddAircraftDetailRequestSchema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <Stack gap={1} className="w-100">
        <Controller
          render={({ field, fieldState }) => (
            <TextField
            {...field}
              size="medium"
              placeholder="Registration"
              error={!!fieldState.error}
              helperText={fieldState.error?.message} />
          )}
          control={control}
          name="registration"
        />

        <Controller
          render={({ field, fieldState }) => (
            <TextField
            {...field}
              size="medium"
              placeholder="Description"
              error={!!fieldState.error}
              helperText={fieldState.error?.message} />
          )}
          control={control}
          name="description"
        />

        <Button variant="outlined" onClick={() => reset({ ...defaultValues })}>Reset</Button>
        <Button variant="contained" type="submit" disabled={!isValid}>Submit</Button>
      </Stack>
    </form>
  )
}