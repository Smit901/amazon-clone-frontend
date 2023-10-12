import { Box, Container, Grid, Link, Typography } from '@mui/material';

const footers = [
	{
		title: 'Company',
		description: ['Team', 'History', 'Contact us', 'Locations'],
	},
	{
		title: 'Features',
		description: [
			'Cool stuff',
			'Random feature',
			'Team feature',
			'Developer stuff',
			'Another one',
		],
	},
	{
		title: 'Resources',
		description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
	},
	{
		title: 'Legal',
		description: ['Privacy policy', 'Terms of use'],
	},
];

const Footer = () => {
	return (
		<Container
				maxWidth={false}
				component="footer"
				sx={{
					borderTop: (theme) => `1px solid ${theme.palette.divider}`,
					mt: 8,
					py: [3, 6],
				}}
			>
				<Box sx={{ px: {xl:15, sm: 10} }}>
					<Grid container spacing={4} justifyContent="space-evenly">
						{footers.map((footer) => (
							<Grid item xs={6} sm={3} key={footer.title}>
								<Typography variant="h6" color="text.primary" gutterBottom>
									{footer.title}
								</Typography>
								<ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
									{footer.description.map((item) => (
										<li key={item}>
											<Link href="#" variant="subtitle1" color="text.secondary">
												{item}
											</Link>
										</li>
									))}
								</ul>
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
	)
}

export default Footer