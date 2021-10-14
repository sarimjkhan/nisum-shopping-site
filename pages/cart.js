import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { StoreContext } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

function cart() {
  const { result, dispatch } = useContext(StoreContext);
  const router = useRouter();
  const {
    cart: { cartItems },
  } = result;
  const onCrossClick = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const onCheckoutClick = () => {
    router.push('/checkout');
  };

  return (
    <Layout>
      <Typography component="h1">Shopping Cart</Typography>
      {cartItems.length <= 0 ? (
        <div>
          Cart is empty{' '}
          <NextLink href="/" passHref>
            <Link>Go to shopping</Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((cI) => {
                    return (
                      <TableRow key={cI._id}>
                        <TableCell>
                          <NextLink href={`/product/${cI.slug}`}>
                            <Link>
                              <Image
                                src={cI.image}
                                height={50}
                                width={50}
                                alt={cI.name}
                              ></Image>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell>{cI.name}</TableCell>
                        <TableCell>{cI.quantity}</TableCell>
                        <TableCell>${cI.price}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => onCrossClick(cI)}
                          >
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography>
                    Total {cartItems.reduce((a, c) => a + c.quantity, 0)} items
                    : ${' '}
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={onCheckoutClick}
                    variant="contained"
                    fullWidth
                  >
                    Checkout
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(cart), { ssr: false });
