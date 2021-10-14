import { List, ListItem, Typography, TextField, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import { useRouter } from 'next/router';
import { StoreContext } from '../utils/Store';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';

export default function Signup() {
  const { result, dispatch } = useContext(StoreContext);
  const { userInfo } = result;
  const styles = useStyles();
  const router = useRouter();
  const { redirect } = router.query;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/checkout');
    }
  });
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      dispatch({
        type: 'SAVE_SHIPPING_ADDRESS',
        payload: { name, address, city, postalCode, country },
      });
      Cookies.set(
        'shippingAddress',
        JSON.stringify({
          name,
          address,
          city,
          postalCode,
          country,
        })
      );
      router.push('/payment');
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <Layout>
      <CheckoutWizard activeStep={1}></CheckoutWizard>
      <form
        className={styles.form}
        onSubmit={submitForm}
        style={{ marginTop: 30 }}
      >
        <Typography component="h1" variant="h3">
          Checkout
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              label="Name"
              id="name"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              label="Address"
              id="address"
              fullWidth
              onChange={(e) => setAddress(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              label="City"
              id="city"
              fullWidth
              onChange={(e) => setCity(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              label="Postal Code"
              id="postalCode"
              fullWidth
              onChange={(e) => setPostalCode(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              label="Country"
              id="country"
              fullWidth
              onChange={(e) => setCountry(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button type="submit" variant="contained" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
