import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack,
  Container,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { removeCart } from '../../../redux/actions/cart';
import CartCard from './CartCard';

const extra = /[\[\]'\n\s]/g

function Cart() {
  const navigate = useNavigate();

  const { cart, totalPrice, totalQty, status } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    severity: 'error',
    message: ''
  })
  const { vertical, horizontal, open, severity, message } = state;

  const shopNow = () => {
    navigate('/product')
  }

  const handleClose = () => {
    setState({ ...state, open: false, message: '' });
  };
  

  return (
    <>
      <Snackbar anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 10, pb: 6 }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Cart
        </Typography>
      </Container>
      <Container maxWidth="lg" component="main">
        {cart.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.length > 0 && cart.map((product) => <CartCard product={product} key={product.product_id} />)}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <>
            <Typography
              variant="h5"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 2
              }}
            >
              Your cart is empty
              <Button
                variant="contained"
                onClick={shopNow}
              >
                Shop Now
              </Button>
            </Typography>

          </>
        )}
        {cart.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableRow>
                <TableCell>Quantity : {totalQty}</TableCell>
                <TableCell>Price : {totalPrice}</TableCell>
                <Button variant="contained" onClick={() => { }}>
                  PayNow
                </Button>
              </TableRow>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
}

export default Cart;