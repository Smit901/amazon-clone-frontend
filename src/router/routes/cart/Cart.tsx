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

  const handleCartDelete = (product_id) => {
    dispatch(removeCart({ ProductId: product_id }))
    // setState({ ...state, open: true, severity: 'success', message: 'Item removed from the cart successfully.' });
  }



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
                {cart.length > 0 && cart.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell>
                      <img
                        src={product.product_image.replace(extra, '').split(',')[0]}
                        alt=""
                        onClick={() => navigate(`/product/${product.product_id}`)}
                        style={{
                          width: "100px",
                          height: "130px",
                          objectFit: "fill",
                          cursor: "pointer"
                        }}
                      />
                    </TableCell>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>{product.price_per_unit}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          onClick={() => { }}
                        >
                          -
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => { }}
                        >
                          +
                        </Button>
                        <Button>
                          <DeleteIcon
                            onClick={() => { handleCartDelete(product.product_id) }}
                          />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
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
        {status === 'loading' && <><Skeleton animation="wave" width='100%' height={100} />
          <Skeleton animation="wave" width='100%' height={100} />
          <Skeleton animation="wave" width='100%' height={100} /><Skeleton animation="wave" width='100%' height={100} /><Skeleton animation="wave" width='100%' height={100} /></>}
        {cart.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableRow>
                <TableCell>Bill</TableCell>
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