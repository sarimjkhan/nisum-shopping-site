import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  navBar: {
    backgroundColor: 'Darkblue',
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  brand: {
    margin: '0 auto',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  spread: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    textAlign: 'center',
  },
  productDetails: {
    marginTop: 10,
    marginBottom: 20,
  },
  checkoutContainer: {
    marginTop: 10,
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
});

export default useStyles;
