// *** MUI
import { Container, CssBaseline, Typography } from '@mui/material'

function MyOrder() {
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
					My Orders
				</Typography>
			</Container>

		</>
	)
}

export default MyOrder
