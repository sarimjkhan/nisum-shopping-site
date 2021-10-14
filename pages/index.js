import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Layout from '../components/Layout';
import ProductModel from '../models/Product';
import db from '../utils/db';
import { StoreContext } from '../utils/Store';

export default function Home({ products }) {
  const { dispatch } = useContext(StoreContext);
  const router = useRouter();
  const onAddToCart = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert('Product is out of stock!');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
    router.push('/cart');
  };
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((p) => {
            return (
              <Grid item md={4} key={p.name}>
                <Card>
                  <NextLink href={`/product/${p.slug}`} passHref>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={p.image}
                        title={p.name}
                      ></CardMedia>
                      <CardContent>{p.name}</CardContent>
                    </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <Typography>${p.price}</Typography>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => onAddToCart(p)}
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connect();
  const products = await ProductModel.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDbDocToObj),
    },
  };
}
