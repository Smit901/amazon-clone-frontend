import React, { useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import {
	TablePagination,
	tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { getProducts } from '../../../api/apiHandler';

const extra = /[\[\]'\n\s]/g

export default function ProductList() {

	const navigate = useNavigate();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [products, setProducts] = React.useState([]);

	useEffect(() => {
		getProducts({}).then(res => {
			if (res.data.status) {
				// const cleanedString = res.data.data.products[0].image.replace(extra, '');
				// const urlArray = cleanedString.split(',');
				setProducts(res.data.data.products)
			}
		})
	}, [])

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

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
				<Grid container spacing={5} alignItems="flex-end" sx={{ mb: 5 }}>
					{products.length > 0 && products.map((val, index) => (
						<Grid
							item
							key={val.name + index}
							sx={{ mx: 6, my: 2 }}
							xs={12}
							sm={6}
							md={3}
							xl={2}
						>
							<Card sx={{ minWidth: 275, cursor: 'pointer', borderRadius: 2, boxShadow: 3 }}>
								<CardContent onClick={() => navigate(`/product/${val.id}`)}>
									<CardMedia
										component="img"
										image={val.image.replace(extra, '').split(',')[0]}
										sx={{ borderRadius: 2, objectFit: 'cover', height: '250px' }}
										alt={val.name}
									/>
									<Typography variant="h6" component="div" sx={{ mt: 2 }}>
										{val.name}
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
				<Root sx={{ width: 500, maxWidth: '100%', m: 'auto' }}>
					<table aria-label="custom pagination table">
						<tfoot>
							<tr>
								<CustomTablePagination
									rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
									colSpan={3}
									count={13}
									rowsPerPage={rowsPerPage}
									page={page}
									slotProps={{
										select: {
											'aria-label': 'rows per page',
										},
										actions: {
											showFirstButton: true,
											showLastButton: true,
										},
									}}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
								/>
							</tr>
						</tfoot>
					</table>
				</Root>
			</Container >
		</>
	);
}

const blue = {
	200: '#A5D8FF',
	400: '#3399FF',
};

const grey = {
	50: '#F3F6F9',
	100: '#E7EBF0',
	200: '#E0E3E7',
	300: '#CDD2D7',
	400: '#B2BAC2',
	500: '#A0AAB4',
	600: '#6F7E8C',
	700: '#3E5060',
	800: '#2D3843',
	900: '#1A2027',
};

const Root = styled('div')(
	({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    width: 100%;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: 0px 2px 16px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]
		};
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  }

  td,
  th {
    padding: 16px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)(
	({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    padding: 2px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 50px;
    background-color: transparent;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }

    &:focus {
      outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    padding: 2px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 50px;
    text-align: center;
  }

  & .${classes.actions} > button {
    margin: 0 8px;
    border: transparent;
    border-radius: 4px;
    background-color: transparent;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }

    &:focus {
      outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }

    &:disabled {
      opacity: 0.3;
    }
  }
  `,
);