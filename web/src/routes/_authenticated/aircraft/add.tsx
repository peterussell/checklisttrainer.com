import { Box, Stack, Step, StepLabel, Stepper, Typography, type StepperProps } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router'

import type { AddAircraftDetailRequest } from '@ct/core/api/AddAircraftDetailRequest';
import { createAircraftQuery } from '@queries/createAircraftQuery';
import { AddAircraftDetail } from '@features/AddAircraft/AddAircraftDetail';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

export const Route = createFileRoute('/_authenticated/aircraft/add')({
  component: AddAircraft,
})

function AddAircraft() {
  const [activeStep, setActiveStep] = useState(0);

  const onSubmit = async (data: AddAircraftDetailRequest) => {

    try {
      const response = await createAircraftQuery(data);
      if (response?.status !== 201) throw new Error();
      setActiveStep(2);
    } catch {
      enqueueSnackbar('Failed to create aircraft', {variant: 'error'});
    }
  }

  return (
    <Stack gap={2}>
      <Typography variant="h4">Add Aircraft</Typography>
      <AddAircraftStepper activeStep={activeStep} sx={{ pb: 4 }} />
      <Box className="w-full flex justify-center">
        <AddAircraftDetail onSubmit={onSubmit} />
      </Box>
    </Stack>
  );
}

const steps = ['Add detail', 'Configure flight deck', 'Add checklists'];

function AddAircraftStepper({activeStep, sx}: {activeStep: number} & StepperProps) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%', ...sx}}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}