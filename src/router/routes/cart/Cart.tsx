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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import data from "../product/productdata"

function Cart() {


  const shopNow = ()=>{
    // navigate('/products')
  }

  return (
    <>
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
        {data.length > 0 ? (
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
                {data.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.thumbnail}
                        alt=""
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{3}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          onClick={() => {}}
                        >
                          -
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {}}
                        >
                          +
                        </Button>

                        <Button>
                          <DeleteIcon
                            onClick={() => {}}
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
        {data.length > 0 && (
          <TableContainer component={Paper} sx={{mt: 2}}>
            <Table>
              <TableRow>
                <TableCell>Bill</TableCell>
                <TableCell>Quantity : {}</TableCell>
                <TableCell>Price : {}</TableCell>
                <Button variant="contained" onClick={() => {}}>
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