import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

export default function CheckoutWizard({ activeStep }) {
  return (
    <Stepper style={{ marginTop: 20 }} activeStep={activeStep} alternativeLabel>
      {['Login', 'ShippingAddress', 'Payment Method', 'Place Order'].map(
        (v) => {
          return (
            <Step key={v}>
              <StepLabel>{v}</StepLabel>
            </Step>
          );
        }
      )}
    </Stepper>
  );
}
