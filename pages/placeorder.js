import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { StoreContext } from '../utils/Store';

export default function Placeorder() {
  const router = useRouter();
  const { result, dispatch } = useContext(StoreContext);
  const {
    cart: { shippingAddress, paymentMethod, cartItems },
    userInfo,
  } = result;

  const totalPrice = cartItems.reduce((a, c) => a + c.price, 0);
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, []);

  const onPlaceOrder = async () => {
    try {
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems.map(({ name, quantity, image, price }) => {
            return {
              name,
              quantity,
              image,
              price,
            };
          }),
          shippingAddress,
          paymentMethod,
          totalPrice,
          user: userInfo._id,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: 'CLEAR_CART' });
      Cookies.remove('cartItems');
      alert('Order Placed Successfully');
    } catch (e) {
      alert('Couldnt place order');
    }
  };
  return (
    <Layout>
      <CheckoutWizard activeStep={3}></CheckoutWizard>
      <div style={{ marginTop: 30 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Shipping Address</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{shippingAddress.address}</TableCell>
                <TableCell>{paymentMethod}</TableCell>
                <TableCell>{cartItems.map((c) => c.name)}</TableCell>
                <TableCell>${totalPrice}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    variant="container"
                    onClick={onPlaceOrder}
                  >
                    Place Order
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Layout>
  );
}
