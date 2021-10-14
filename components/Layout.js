import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Badge,
  Button,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import useStyles from '../utils/styles';
import { StoreContext } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

function Layout({ description, children }) {
  const styles = useStyles();
  const router = useRouter();
  const { result, dispatch } = useContext(StoreContext);
  const { userInfo } = result;
  const { cart } = result;

  const onLogout = () => {
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/login');
  };
  return (
    <div>
      <Head>
        <title>Shopping Site</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <AppBar position="static" className={styles.navBar}>
        <Toolbar>
          <Grid container>
            <Grid item md={2}>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={styles.brand}>Nisum Shop</Typography>
                </Link>
              </NextLink>
            </Grid>
            <Grid item md={7}></Grid>
            <Grid item md={1}>
              {userInfo ? <Typography>{userInfo.name}</Typography> : ''}
            </Grid>
            <Grid item md={1}>
              <div>
                <NextLink href="/cart" passHref>
                  <Link>
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      'Cart'
                    )}
                  </Link>
                </NextLink>
              </div>
            </Grid>
            <Grid item md={1}>
              {userInfo ? (
                <Button onClick={onLogout} variant="contained">
                  Logout
                </Button>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </Grid>
          </Grid>
          {/* <div className={styles.spread}></div> */}
        </Toolbar>
      </AppBar>
      <Container className={styles.main}>{children}</Container>
      <footer className={styles.footer}>All Rights Reserved.</footer>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
