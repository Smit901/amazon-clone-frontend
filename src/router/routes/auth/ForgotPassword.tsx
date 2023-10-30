import { NavLink } from 'react-router-dom';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// *** MUI
import { Box, Button, CssBaseline, Grid, InputLabel, TextField, Typography, Container } from '@mui/material';

// *** Custom Components or functions
import { showNotification } from '../../../utility/showNotification';
import { useState } from 'react';
import { userForgotPassword } from '../../../api/apiHandler';

function ForgotPassword() {
	const [isEmail, setIsEmail] = useState(false);

	const validationSchema = Yup.object().shape({
		email: Yup.string().email("Email is invalid").required("Email is required")
	});
	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, formState } = useForm(formOptions);
	const { errors } = formState;

	const onSubmit = (data: { email: string }) => {
		userForgotPassword(data).then(res => {
			if (res.data.status) {
				showNotification({
					icon: "success",
					title: res.data.msg,
				})
				setIsEmail(true)
			}
		}).catch(err => {
			if (!err.response.data.status) {
				showNotification({
					icon: "error",
					title: err.response.data.msg,
				})
			}
		})
	};

	return (
		<Container component="main" maxWidth="xs" sx={{ marginTop: 20, paddingY: 6, boxShadow: 2 }}>
			<CssBaseline />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				{isEmail ? <> <Typography component="h6" variant="h6" sx={{ mb: 3, px: 3, fontSize: '15px' }}>
					We have sent a password recover instructions to your email.
				</Typography>
					<Grid container>
						<Grid item xs>
						</Grid>
						&nbsp;&nbsp;&nbsp;
						<Grid item>
							<NavLink to="/home">
								{"Skip, I'll confirm later"}
							</NavLink>
						</Grid>
					</Grid>
				</> :
					<>
						<Typography component="h6" variant="h6" sx={{ mb: 3, fontSize: '15px' }}>
							Enter the Email address associated with your account and we'll send you link to reset your password.
						</Typography>
						<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								autoComplete="email"
								autoFocus
								{...register("email")}
							/>
							{errors.email && <InputLabel sx={{ color: 'error.main', minWidth: 400 }}>{errors.email?.message}</InputLabel>}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Countinue
							</Button>
							<Grid container>
								<Grid item xs>
								</Grid>
								&nbsp;&nbsp;&nbsp;
								<Grid item>
									<NavLink to="/register">
										{"Don't have an account? Sign Up"}
									</NavLink>
								</Grid>
							</Grid>
						</Box>
					</>
				}
			</Box>
		</Container>
	);
}

export default ForgotPassword