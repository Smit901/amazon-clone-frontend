import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, CardMedia, TextField } from '@mui/material';
import data from './productdata';

export default function ProductList() {
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
					Products
				</Typography>
			</Container>
			<Container maxWidth="xl" component="main">
				<TextField id="filled-basic" label="Search product" variant="filled" sx={{ mx: 6, my: 2 }} />
				
			</Container>
			<Container maxWidth="xl" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{data.map((val) => (
						<Grid
							item
							key={val.title}
							sx={{ mx: 6, my: 2 }}
							xs={12}
							sm={6}
							md={3}
							xl={2}
						>
							<Card sx={{ minWidth: 275 }}>
								<CardContent>
									<CardMedia
										component="img"
										image={val.thumbnail}
										sx={{ borderRadius: 2, objectFit: 'cover', height: '250px' }}
										alt="Paella dish"
									/>
									<Typography variant="h6" component="div" sx={{ mt: 2 }}>
										{val.title}
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
									>
										add to cart
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container >
		</>
	);
}