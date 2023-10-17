import React from 'react';
import { Avatar, Box, Button, CssBaseline, Grid, InputLabel, TextField, Typography, Container, Snackbar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from 'react-router-dom';
import { userRegister } from '../../../api/apiHandler';
import { showNotification } from '../../../utility/showNotification';


export default function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data: { firstName: string, lastName: string, email: string, password: string }) => {
    userRegister(data).then(res => {
      if (res.data.status) {
        showNotification({
          icon: "success",
          title: res.data.msg,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        showNotification({
          icon: "error",
          title: res.data.msg,
        });
      }
    }).catch(err => {
      if (!err.response.data.status) {
        showNotification({
          icon: "error",
          title: err.response.data.msg,
        });
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
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="First Name"
                {...register("firstName")}
              />
              {errors.firstName && <InputLabel sx={{ color: 'error.main' }}>{errors.firstName?.message}</InputLabel>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                {...register("lastName")}
              />
              {errors.lastName && <InputLabel sx={{ color: 'error.main' }}>{errors.lastName?.message}</InputLabel>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && <InputLabel sx={{ color: 'error.main' }}>{errors.email?.message}</InputLabel>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register("password")}
              />
              {errors.password && <InputLabel sx={{ color: 'error.main' }}>{errors.password?.message}</InputLabel>}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}