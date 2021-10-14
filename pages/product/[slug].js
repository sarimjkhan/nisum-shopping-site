import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import data from '../../utils/data';
import { Button, Grid, Link, List, ListItem, Typography } from '@mui/material';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import Image from 'next/image';
import useStyles from '../../utils/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import db from '../../utils/db';
import ProductModel from '../../models/Product';
import { StoreContext } from '../../utils/Store';
import axios from 'axios';

export default function Product({ product }) {
  const { dispatch } = useContext(StoreContext);
  const styles = useStyles();
  const router = useRouter();
  if (!product) {
    return <div>Product not found</div>;
  }
  const onAddToCart = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert('Product is out of stock!');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 } });
    router.push('/cart');
  };
  return (
    <Layout description={product.description}>
      <div className={styles.productDetails}>
        <NextLink href="/" passHref>
          <Link>Back to products</Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            height={640}
            width={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1">{product.name}</Typography>
            </ListItem>
            <ListItem>{product.category}</ListItem>
            <ListItem>{product.brand}</ListItem>
            <ListItem>
              Rating: {product.rating} stars ({product.numReviews} reviews)
            </ListItem>
            <ListItem>{product.description}</ListItem>
            <ListItem>${product.price}</ListItem>
            <ListItem>
              <Button
                variant="contained"
                onClick={onAddToCart}
                startIcon={<AddShoppingCartIcon />}
              >
                Add to Cart
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await ProductModel.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDbDocToObj(product),
    },
  };
}
