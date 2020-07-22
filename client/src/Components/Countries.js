import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import ReactCountryFlag from "react-country-flag";
import { makeStyles } from "@material-ui/core/styles";
import {
	Card,
	CardHeader,
	Grid,
	CardContent,
	Typography,
	CardMedia,
	Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const GET_COUNTRIES = gql`
	query CountryQuery {
		global {
			Countries {
				Country
				CountryCode
			}
		}
	}
`;

const useStyles = makeStyles((theme) => ({
	root: {
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.secondary,
	},
}));
const DisplayCountries = () => {
	const classes = useStyles();
	const { loading, error, data } = useQuery(GET_COUNTRIES);
	console.log(data);
	if (loading) return <p>Loading Countries... </p>;
	if (error) return <p>Error</p>;
	if (data)
		return (
			<Grid container className={classes.root}>
				{data.global.Countries.map((country) => {
					return (
						<div>
							<Card
								elevation={1}
								style={{ width: 140, minHeight: 150, margin: 10 }}>
								<CardContent>
									<CardMedia>
										<ReactCountryFlag
											countryCode={country.CountryCode}
											svg
											style={{
												width: "6em",
												height: "6em",
											}}
											title={country.CountryCode}
										/>
									</CardMedia>
									<p>{country.Country}</p>
								</CardContent>
								<Button
									style={{
										backgroundColor: "Green",
										color: "white",
										marginLeft: 10,
										marginBottom: 10,
									}}
									onClick={() => {
										window.location.href = `/countries/${country.Country}`;
									}}>
									<Typography
										variant="subtitle1"
										style={{ fontFamily: "Ubuntu", fontSize: 10 }}>
										Check more..
									</Typography>
								</Button>
							</Card>
						</div>
					);
				})}
			</Grid>
		);
};

export default DisplayCountries;
