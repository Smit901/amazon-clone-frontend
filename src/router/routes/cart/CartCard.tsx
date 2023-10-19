import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

// *** MUI
import { Button, Stack, TableCell, TableRow } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";

// *** Custom Components or functions
import { removeCart, updateCart } from '../../../redux/actions/cart';

const extra = /[\[\]'\n\s]/g

function CartCard({ product }){
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleCartDelete = (product_id) => {
		dispatch(removeCart({ ProductId: product_id }))
	}

	const handleCartpdate = (product_id, qty) => {
		dispatch(updateCart({ ProductId: product_id, quantity: qty }))
	}

	return (
		<>
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
				<TableCell>{product.price_per_unit * product.quantity}</TableCell>
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