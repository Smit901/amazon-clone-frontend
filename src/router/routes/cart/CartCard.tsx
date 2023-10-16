import { useState } from 'react';
import { Alert, Button, Chip, Snackbar, Stack, TableCell, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import DeleteIcon from "@mui/icons-material/Delete";
import { removeCart, updateCart } from '../../../redux/actions/cart';

const extra = /[\[\]'\n\s]/g

const CartCard = ({ product }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [state, setState] = useState<State>({
		open: false,
		vertical: 'top',
		horizontal: 'right',
		severity: 'error',
		message: ''
	})
	const { vertical, horizontal, open, severity, message } = state;

	const handleClose = () => {
		setState({ ...state, open: false, message: '' });
	};

	const handleCartDelete = (product_id) => {
		dispatch(removeCart({ ProductId: product_id }))
		setState({ ...state, open: true, severity: 'success', message: 'Item removed from the cart successfully.' });
	}

	const handleCartpdate = (product_id, qty) => {
		dispatch(updateCart({ ProductId: product_id, quantity: qty }))
	}

	return (
		<>
			<Snackbar anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} open={open} autoHideDuration={4000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
			<TableRow key={product.product_id}>
				<TableCell>
					<img
						src={product.product_image.replace(extra, '').split(',')[0]}
						alt=""
						onClick={() => navigate(`/product/${product.product_id}`)}
						style={{
							width: "100px",
							height: "130px",
							objectFit: "fill",
							cursor: "pointer"
						}}
					/>
				</TableCell>
				<TableCell>{product.product_name}</TableCell>
				<TableCell>{product.price_per_unit}</TableCell>
				<TableCell>{product.quantity}</TableCell>
				<TableCell>
					<Stack direction="row" spacing={1}>
						<Button
							variant="contained"
							onClick={() => handleCartpdate(product.product_id, product.quantity - 1)}
						>
							-
						</Button>
						<Button
							variant="contained"
							onClick={() => handleCartpdate(product.product_id, product.quantity + 1)}
						>
							+
						</Button>
						<Button onClick={() => { handleCartDelete(product.product_id) }}>
							<DeleteIcon />
						</Button>
					</Stack>
				</TableCell>
			</TableRow>
		</>
	)
}

export default CartCard