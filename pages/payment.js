import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { StoreContext } from '../utils/Store';
import useStyles from '../utils/styles';

export default function payment() {
  const { result, dispatch } = useContext(StoreContext);
  const {
    cart: { shippingAddress },
  } = result;
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const styles = useStyles();
  useEffect(() => {
    if (!shippingAddress) {
      router.push('/checkout');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
    Cookies.set('paymentMethod', paymentMethod);
    router.push('/placeorder');
  };
  return (
    <Layout>
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form
        className={styles.form}
        onSubmit={submitForm}
        style={{ marginTop: 30 }}
      >
        <Typography component="h1" variant="h3">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Paypal"
                  value="paypal"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Stripe"
                  value="stripe"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Cash"
                  value="cash"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button type="submit" variant="contained" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => router.push('/checkout')}
            >
              Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
