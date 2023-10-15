import { useState } from 'react';
import { Alert, Button, Card, CardActions, CardContent, CardMedia, Grid, Snackbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { addCart } from '../../../redux/actions/cart'
import { useDispatch } from 'react-redux'

const extra = /[\[\]'\n\s]/g

const ProductCard = ({ val, index }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    severity: 'error',
    message: ''
  })
  const { vertical, horizontal, open, severity, message } = state;

	const handleClose = () => {
    setState({ ...state, open: false, message: '' });
  };


	const handleAddCart = (data) => {
		dispatch(addCart({data, qty: 1}))
		setState({ ...state, open: true, severity: 'success', message: 'Item added to the cart successfully' });
	}

	return (
		<Grid
			item
			key={val.name + index}
			sx={{ mx: 6, my: 2 }}
			xs={12}
			sm={6}
			md={3}
			xl={2}
		>
			<Snackbar anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
			<Card sx={{ minWidth: 275, cursor: 'pointer', borderRadius: 2, boxShadow: 3 }}>
				<CardContent onClick={() => navigate(`/product/${val.id}`)}>
					<CardMedia
						component="img"
						image={val.image.replace(extra, '').split(',')[0]}
						sx={{ borderRadius: 2, objectFit: 'cover', height: '250px' }}
						alt={val.name}
					/>
					<Typography variant="h6" component="div" sx={{ mt: 2 }}>
						{val.name}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						Price: {val.price}
					</Typography>
					<Typography variant="body2" sx={{
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis'
					}}>
						{val.description}
					</Typography>
				</CardContent>
				<CardActions>
					<Button
						fullWidth
						variant='contained'
						onClick={() => handleAddCart(val)}
					>
						add to cart
					</Button>
				</CardActions>
			</Card>
		</Grid>
	)
}

export default ProductCard