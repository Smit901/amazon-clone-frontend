import React, { useState, useEffect } from 'react';
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled } from '@mui/system';
import {
	TablePagination,
	tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import { getProducts } from '../../../api/apiHandler';
import ProductCard from './ProductCard';

function ProductList() {

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [search, setSearch] = useState("");
	const [totalProduct, setTotalProduct] = useState();
	const [products, setProducts] = useState([]);

	const defalutQueryString = {
		page,
		rowsPerPage,
		search
	};

	useEffect(() => {
		for (const [key, value] of Object.entries(defalutQueryString)) {
			if (!searchParams.has(key)) {
				searchParams.set(key, value);
			}
		}
		setSearchParams(searchParams);
	}, [searchParams, setSearchParams]);

	useEffect(() => {

		const page = +searchParams.get('page')
		const rowsPerPage = +searchParams.get('rowsPerPage')
		const search = searchParams.get('search') || ''

		setPage(+page);
		setRowsPerPage(+rowsPerPage);
		setSearch(search)

		getProducts({ page, rowsPerPage, search }).then(res => {
			if (res.data.status) {
				setProducts(res.data.data.products)
				setTotalProduct(res.data.data.totalProduct)
			}
		})
	}, [searchParams]);

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		searchParams.set("page", newPage.toString());
		setSearchParams(searchParams);
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		searchParams.set("page", 0);
		searchParams.set("rowsPerPage", event.target.value);
		setSearchParams(searchParams);
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
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
				<TextField id="filled-basic" label="Search product" variant="filled" sx={{ mx: 6, my: 2 }} value={search} onChange={(e) => {
					searchParams.set("search", e.target.value);
					searchParams.set("page", 0);
					setSearchParams(searchParams);
				}} />
			</Container>
			{products.length > 0 ? <Container maxWidth="xl" component="main">
				<Grid container spacing={5} alignItems="flex-end" sx={{ mb: 5 }}>
					{products.map((val, index) => <ProductCard val={val} key={val.id} index={index} />)}
				</Grid>
				<Root sx={{ width: 700, maxWidth: '100%', m: 'auto' }}>
					<table aria-label="custom pagination table">
						<tfoot>
							<tr>
								<CustomTablePagination
									rowsPerPageOptions={[5, 10, 25]}
									colSpan={3}
									count={totalProduct || 1000}
									rowsPerPage={+rowsPerPage || 5}
									page={page || 0}
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
			</Container > : <Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					minHeight: '60vh'
				}}
			>
				<Typography variant="h6" sx={{ mb: 3 }}>
					Sorry, we couldn't find any products matching your search.
				</Typography>
				<Button variant="contained" onClick={() => { searchParams.set("search", ''); setSearchParams(searchParams); }}>Clear search</Button>
			</Box>
			}
		</>
	);
}

export default ProductList;

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