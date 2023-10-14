import React, { useEffect, useState } from 'react';
import { Box, CardMedia, Container, Grid, Typography, ButtonGroup, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import { isEmpty } from 'lodash';
import { getSingleProduct } from '../../../api/apiHandler';


const imageStyle = { borderRadius: 2, objectFit: 'fill', cursor: 'pointer', height: 120, width: 100 }
const extra = /[\[\]'\n\s]/g

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState();

  useEffect(() => {
    getSingleProduct({ id }).then(res => {
      if (res.data.status) {
        setProduct(res.data.data.product)
        setImage(res.data.data.product.image.replace(extra, '').split(',')[0])
      } else {
        setProduct([])
      }
    })
  }, [])

  return (
    <>
      {!isEmpty(product) ? <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 10, pb: 6 }}>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={6} sx={{ display: 'flex', margin: 'auto', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              image={image}
              sx={{ borderRadius: 2, objectFit: 'fill', height: 450, width: 350 }}
              alt=""
            />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ p: 5 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                brand name
              </Typography>
              <Typography component="div" variant="h3" sx={{ mb: 4 }}>
                {product.name}
              </Typography>
              <Typography component="div" variant="body1">
                {product.description + " "}
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
              </Typography>
              <Typography component="div" variant="h6" sx={{ mt: 4 }}>
                Price: {product.price}
              </Typography>
              <Typography component="div" variant="body1" sx={{ textDecoration: "line-through", mb: 4 }}>
                {product.price + 100}
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

          <Grid container spacing={2} sx={{ ml: 12 }}>
            {product && product?.image?.replace(extra, '').split(',').map((val) => (<Grid item xs={1} key={val} sx={{ ml: 3 }}>
              <CardMedia
                component="img"
                image={val}
                sx={imageStyle}
                alt=""
                onClick={() => setImage(val)}
              />
            </Grid>))
            }
          </Grid>
        </Grid>
      </Container> : <> <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '70vh'
        }}
      >
        <Typography variant="h6" sx={{mb: 3}}>
          The page you’re looking for doesn’t exist.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/product")}>Back to shop page</Button>
      </Box></>}

    </>
  )
}

export default Product