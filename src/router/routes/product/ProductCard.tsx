import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// *** MUI
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'

// *** Custom Components or functions
import { addCart } from '../../../redux/actions/cart'

const extra = /[\[\]'\n\s]/g

function ProductCard({ val, index }){
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleAddCart = (data) => {
		dispatch(addCart({ data, qty: 1 }))
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