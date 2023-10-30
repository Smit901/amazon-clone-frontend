import { useEffect, useState } from 'react'

// *** MUI
import { Box, Container, CssBaseline, Typography } from '@mui/material'

// *** Custom Components or functions
import { getUserData } from '../../../api/apiHandler'
import { useQuery } from '@tanstack/react-query';


function Dashboard() {
	const { isLoading, error, data: userData, isFetching } = useQuery({
		queryKey: ['user'], queryFn: () => getUserData({}).then(res => res.data.data),
		enabled: localStorage.getItem('token') ? true : false
	})

	const token = localStorage.getItem('token')

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
					Welcome {token ? userData?.first_name + " " + userData?.last_name : "to Amazon"}
				</Typography>
			</Container>
			{token && <Container maxWidth="sm" component="main" sx={{ pt: 10, pb: 6 }}>
				<Box
					sx={{
						display: 'flex',
						py: 5,
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						boxShadow: 2
					}}
				>
					<Typography variant="h6" component="div">
						First Name: {userData?.first_name}
					</Typography>
					<Typography variant="h6" component="div">
						Last Name: {userData?.last_name}
					</Typography>
					<Typography variant="h6" component="div">
						Email: {userData?.email}
					</Typography>
				</Box>
			</Container>}

		</>
	)
}

export default Dashboard
