import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { addCart } from '../../../api/apiHandler'

const extra = /[\[\]'\n\s]/g

const ProductCard = ({ val, index }) => {
	const navigate = useNavigate()
	

	const handleAddCart = (data) => {
		addCart(data).then(res => {
			console.log(res)
		})
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
						onClick={() => handleAddCart({
							"ProductId": val.id,
							"quantity": 1
						})}
					>
						add to cart
					</Button>
				</CardActions>
			</Card>
		</Grid>
	)
}

export default ProductCard