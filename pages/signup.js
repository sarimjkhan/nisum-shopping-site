import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { StoreContext } from '../utils/Store';
import Cookies from 'js-cookie';

export default function Signup() {
  const { result, dispatch } = useContext(StoreContext);
  const styles = useStyles();
  const router = useRouter();
  const { redirect } = router.query;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords dont match');
      return;
    }

    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
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
      <form className={styles.form} onSubmit={submitForm}>
        <Typography component="h1" variant="h3">
          Signup
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
            <TextField
              variant="outlined"
              label="Confirm Password"
              id="cPassword"
              fullWidth
              inputProps={{ type: 'password' }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button type="submit" variant="contained" fullWidth color="primary">
              Signup
            </Button>
          </ListItem>
          <ListItem>
            Already have an account?{' '}
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
