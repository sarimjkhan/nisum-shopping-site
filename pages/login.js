import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import { StoreContext } from '../utils/Store';
import Cookies from 'js-cookie';

export default function Login() {
  const styles = useStyles();
  const router = useRouter();
  const { redirect } = router.query;
  const { result, dispatch } = useContext(StoreContext);
  const { userInfo } = result;

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <Layout>
      <form onSubmit={submitForm} className={styles.form}>
        <Typography component="h1" variant="h3">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              label="Email"
              id="email"
              fullWidth
              inputProps={{ type: 'email' }}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              label="Password"
              id="password"
              fullWidth
              inputProps={{ type: 'password' }}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button type="submit" variant="contained" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account?{' '}
            <NextLink href={`/signup?redirect=${redirect || '/'}`} passHref>
              <Link>Signup</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
