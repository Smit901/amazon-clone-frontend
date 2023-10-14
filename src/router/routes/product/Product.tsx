import { Box, CardMedia, Container, Grid, Typography, ButtonGroup, Button } from '@mui/material'

const imageStyle = { borderRadius: 2, objectFit: 'cover', border: '2px solid blue', cursor: 'pointer' }

const Product = () => {
  return (
    <>
      <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 10, pb: 6 }}>

        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={6}>
            <CardMedia
              component="img"
              image="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
              sx={{ borderRadius: 2, objectFit: 'cover', height: 500 }}
              alt=""
            />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: 5 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                brand name
              </Typography>
              <Typography component="div" variant="h3" sx={{ mb: 4 }}>
                Product Name
              </Typography>
              <Typography component="div" variant="body1">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
              </Typography>
              <Typography component="div" variant="h6" sx={{ mt: 4 }}>
                $1000000.00
              </Typography>
              <Typography component="div" variant="body1" sx={{ textDecoration: "line-through", mb: 4 }}>
                $1000000.00
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button>-</Button>
                    <Button>1</Button>
                    <Button>+</Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={8}>
                  <Button variant="contained" fullWidth>Add to Cart</Button>
                </Grid>
              </Grid>

            </Box>
          </Grid>

          <Grid item xs={2}>
            <CardMedia
              component="img"
              image="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
              sx={imageStyle}
              alt=""
            />
          </Grid>
          <Grid item xs={2}>
            <CardMedia
              component="img"
              image="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
              sx={imageStyle}
              alt=""
            />
          </Grid>
          <Grid item xs={2}>
            <CardMedia
              component="img"
              image="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
              sx={imageStyle}
              alt=""
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Product