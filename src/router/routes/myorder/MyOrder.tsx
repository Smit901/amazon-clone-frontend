import { useEffect, useState } from 'react'

// *** MUI
import {
	Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Container, CssBaseline, DialogTitle, DialogContent, DialogActions, Dialog, DialogContentText,
} from "@mui/material";

import { getOrders } from '../../../api/apiHandler'
import { useNavigate } from 'react-router-dom';

const extra = /[\[\]'\n\s]/g

function MyOrder() {

	const navigate = useNavigate();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		getOrders({}).then(res => {
			if (res.data.status) {
				const sortedOrders = res.data.data.OrderDetails.sort(
					(a, b) => b.order_id - a.order_id
				);
				setOrders(sortedOrders);
			
			}
		})
	}, [])

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

			<Container maxWidth="lg" component="main">
				{orders.length > 0 ? (
					<>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Id</TableCell>
										<TableCell>Date</TableCell>
										<TableCell>Total</TableCell>
										<TableCell>Status</TableCell>
										<TableCell>Products</TableCell>
										{/* <TableCell>Action</TableCell>  */}
									</TableRow>
								</TableHead>
								<TableBody>
									{orders.map((order, index) => (
										<TableRow key={order.order_id+index}>
											<TableCell>{order.order_id}</TableCell>
											<TableCell>{order.order_date.split("T")[0]}</TableCell>
											<TableCell>{order.total_price}</TableCell>
											<TableCell>{order.status}</TableCell>
											<TableCell>
												<Table>
													<TableHead>
														<TableRow>
															<TableCell>Image</TableCell>
															<TableCell>Name</TableCell>
															<TableCell>Price</TableCell>
															<TableCell>Description</TableCell>
															<TableCell>Quantity</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{order.products.map((val, index) => (
															<TableRow key={index + val.product_name}>
																<TableCell>
																	<img
																		src={val.image.replace(extra, '').split(',')[0]}
																		alt=""
																		onClick={() => navigate(`/product/${val.id}`)}
																		style={{
																			width: "100px",
																			height: "130px",
																			objectFit: "fill",
																			cursor: "pointer"
																		}}
																	/>
																</TableCell>
																<TableCell>{val.name}</TableCell>
																<TableCell>{val.price}</TableCell>
																<TableCell>{val.description}</TableCell>
																<TableCell>{val.quantity}</TableCell>
															</TableRow>
														))}

													</TableBody>
												</Table >
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</>
				) : (
					<>
						<Typography
							variant="h5"
							component="div"
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexDirection: "column",
								gap: 2
							}}
						>
							No order found
							<Button
								variant="contained"
								onClick={()=> navigate("/shop")}
							>
								Shop Now
							</Button>
						</Typography>
					</>
				)}
			</Container>

		</>
	)
}

export default MyOrder
