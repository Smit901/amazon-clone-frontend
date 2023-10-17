import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

// *** MUI
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Container, CssBaseline,
} from "@mui/material";

// *** Custom Components or functions
import { emptyCart } from '../../../redux/actions/cart';
import CartCard from './CartCard';

function Cart() {
  const navigate = useNavigate();

  const { cart, totalPrice, totalQty } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const shopNow = () => {
    navigate('/product')
  }

  const handleEmptyCart = () => {
    dispatch(emptyCart());
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