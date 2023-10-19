import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

// *** MUI
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Container, CssBaseline, DialogTitle, DialogContent, DialogActions, Dialog, DialogContentText,
} from "@mui/material";

// *** Custom Components or functions
import { emptyCart, emptyLocalCart } from '../../../redux/actions/cart';
import CartCard from './CartCard';
import { placeOrder } from '../../../api/apiHandler';
import { showNotification } from '../../../utility/showNotification';

function Cart() {
  const navigate = useNavigate();

  const { cart, totalPrice, totalQty } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const shopNow = () => {
    navigate('/product')
  }

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  }

  const handleClose = () => {
    setOpen(false);
  };

  const createOrder = () => {
    const data = {
      shipping: {
        street: 'Law Garden',
        city: 'Maninagar',
        zipCode: '890XXG'
      },
      paymentMethod: "credit_card"
    }

    placeOrder(data).then(res => {
      if (res.data.status) {
        dispatch(emptyLocalCart())
        setOpen(false)
        showNotification({
          icon: "success",
          title: "Your order has been placed successfully!",
        });
      }
    })
  }

  return (
    <>
      <CssBaseline />
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
          <>
            <Button
              variant="contained"
              sx={{ mb: 5 }}
              onClick={handleEmptyCart}
            >
              Clear Cart
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.length > 0 && cart.map((product) => <CartCard product={product} key={product.product_id} />)}
                </TableBody>
              </Table>
            </TableContainer>
          </>
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
                <Button variant="contained" onClick={() => setOpen(true)}>
                  Checkout
                </Button>
              </TableRow>
            </Table>
          </TableContainer>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ color: 'black', fontSize: '20px' }}>
              Are you sure you want to proceed with your order and checkout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>no</Button>
            <Button variant="contained" onClick={createOrder} autoFocus>
              yes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default Cart;