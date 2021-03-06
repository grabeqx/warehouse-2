import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { TProduct } from '../types/types';
import { getData } from '../actions/dbActions';
import { host, appMainPath } from '../config/config';
import ProductHistoryTable from './ProductHistoryTable';

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		minWidth: '100%',
		minHeight: '100%',
		padding: theme.spacing(2)
	},
	link: {
		textDecoration: 'none'
	},
	firstLine: {
		marginTop: '-40px'
	},
	productTop: {
		marginBottom: theme.spacing(4)
	},
	noImg: {
		background: '#f1f1f1',
		width: '100%',
		height: '100%'
	}
}));

interface MatchParams {
	id: string;
}

type Props = RouteComponentProps<MatchParams>;

const Product: React.FC<Props> = (props): JSX.Element => {
	const [product, setProduct] = useState<TProduct>({
		name: '',
		product_index: '',
		supplier: 'string',
		quantity: 0,
		quantityType: '',
		quantityAlert: 0,
		price: '',
		picture: null,
		valid: false
	});
	const classes = useStyles();

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const data = await getData({
				action: 'getProduct',
				id: props.match.params.id
			});
			if (data.status) {
				setProduct(data.data[0]);
			}
		};
		fetchData();
		return () => {
			setProduct({
				name: '',
				product_index: '',
				supplier: 'string',
				quantity: 0,
				quantityType: '',
				quantityAlert: 0,
				price: '',
				picture: null,
				valid: false
			});
		};
	}, [props.match.params.id]);

	return (
		<div>
			{product && (
				<div>
					<Grid container spacing={2} className={classes.productTop} justify="space-between">
						<Grid xs={5} item>
							{product.picture ? <img src={`${host}/${product.picture}`} alt="product" /> : <div className={classes.noImg}></div>}
						</Grid>
						<Grid xs={7} item>
							<Paper className={classes.paper}>
								<Grid container justify="flex-end">
									<Link to={`${appMainPath}/edit/${product.id}`} className={classes.link}>
										<Button>Edytuj</Button>
									</Link>
								</Grid>
								<Typography variant="h6" className={classes.firstLine}>
									Nazwa:
								</Typography>
								<Typography variant="h4" gutterBottom={true}>
									{product.name}
								</Typography>
								<Typography variant="h6">Index:</Typography>
								<Typography variant="h5" gutterBottom={true}>
									{product.product_index}
								</Typography>
								<Typography variant="h6">Dostawca:</Typography>
								<Typography variant="h5" gutterBottom={true}>
									{product.supplier}
								</Typography>
								<Typography variant="h6">Ilość:</Typography>
								<Typography variant="h5" gutterBottom={true}>
									{product.quantity} {product.quantityType === 'kg' ? 'kg' : product.quantityType === 'liter' ? 'l' : 'szt.'}
								</Typography>
								<Typography variant="h6">Cena sprzedaży:</Typography>
								<Typography variant="h5" gutterBottom={true}>
									{product.price}
								</Typography>
							</Paper>
						</Grid>
					</Grid>
					<ProductHistoryTable product={product} {...props} />
				</div>
			)}
		</div>
	);
};

export default Product;
