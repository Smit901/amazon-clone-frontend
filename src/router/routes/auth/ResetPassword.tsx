import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// *** MUI
import { Box, Button, CssBaseline, InputLabel, TextField, Typography, Container } from '@mui/material';

// *** Custom Components or functions
import { userResetPassword, verifyToken } from '../../../api/apiHandler';
import { showNotification } from '../../../utility/showNotification';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function ResetPassword() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const [id, setId] = useState();
	const token = searchParams.get('token');

	const validationSchema = Yup.object().shape({
		password: Yup.string()
			.required("Password is required")
			.min(5, "Password must be at least 5 characters")
			.matches(
				/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				"Password must contain at least one uppercase letter, one number, and one special character"
			),
		confirm_password: Yup.string()
			.required("Confirm Password is required")
			.min(5, "Confirm Password must be at least 5 characters")
			.test("passwords-match", "Both Passwords must match.", function (value) {
				return value === this.parent.password;
			}),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, formState } = useForm(formOptions);
	const { errors } = formState;

	useEffect(() => {
		verifyToken({ token }).then(res => {
			if (res.data.status) {
				setId(res.data.data.id)
			}
		}).catch(err => {
			setId(null);
		})
	}, [])

	const onSubmit = (data: { password: string }) => {
		const userData = {
			id: id,
			password: data.password
		}
		userResetPassword(userData).then(res => {
			if (res.data.status) {
				showNotification({
					icon: "success",
					title: res.data.msg,
				})
				setTimeout(() => {
					navigate("/login");
				}, 3000);
			} else {
				showNotification({
					icon: "success",
					title: res.data.msg,
				})
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
			{id ? <Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Typography component="h1" variant="h5">
					Create New Password
				</Typography>
				<Typography component="h6" variant="h6" sx={{ my: 3, px: 3, fontSize: '15px' }}>
					Your new password must be different from previous used passwords.
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						{...register("password")}
					/>
					{errors.password && <InputLabel sx={{ color: 'error.main', minWidth: 400, whiteSpace: 'break-spaces' }}>{errors.password?.message}</InputLabel>}
					<TextField
						margin="normal"
						required
						fullWidth
						label="Confirm password"
						type="password"
						id="confirm_password"
						autoComplete="current-password"
						{...register("confirm_password")}
					/>
					{errors.confirm_password && <InputLabel sx={{ color: 'error.main', minWidth: 400, whiteSpace: 'break-spaces' }}>{errors.confirm_password?.message}</InputLabel>}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Reset Password
					</Button>
				</Box>
			</Box> : <Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					// minHeight: '90vh'
				}}
			>
				<Typography variant="h6">
					Oops, it seems like the link you followed is no longer valid. This could be due to an expired or incorrect token. Please make sure you're using the latest link or request a new one to proceed
				</Typography>

			</Box>}

		</Container>
	);
}

export default ResetPassword