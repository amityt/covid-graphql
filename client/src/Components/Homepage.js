import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DisplayCountries from "./Countries";

const GLOBAL_DATA = gql`
	query GlobalQuery {
		global {
			Global {
				NewConfirmed
				TotalConfirmed
				NewRecovered
				TotalRecovered
				NewDeaths
				TotalDeaths
			}
			Date
		}
	}
`;

const useStyles = makeStyles({
	root: {
		width: 500,
		textAlign: "center",
		margin: "auto",
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 40,
		fontFamily: "Ubuntu",
	},
	pos: {
		marginBottom: 12,
	},
});

const HomePage = () => {
	const classes = useStyles();
	const { loading, error, data } = useQuery(GLOBAL_DATA);
	if (loading) return <h3>Loading...</h3>;
	if (error) return <h3>Error</h3>;
	if (data)
		return (
			<div>
				<div>
					<Card className={classes.root} variant="outlined">
						<CardContent>
							<Typography variant="h3" className={classes.title} gutterBottom>
								Covid-19 Global Data
							</Typography>
							<Typography
								variant="h5"
								component="h2"
								style={{ color: "Green", fontFamily: "Ubuntu" }}>
								Total Confirmed : {data.global.Global.TotalConfirmed}
							</Typography>
							<Typography
								variant="h5"
								component="h2"
								style={{ color: "Green", fontFamily: "Ubuntu" }}>
								<strong>
									New Confirmed : {data.global.Global.NewConfirmed}
								</strong>
							</Typography>
							<Typography
								variant="h5"
								component="h2"
								style={{ color: "Blue", fontFamily: "Ubuntu" }}>
								Total Recovered : {data.global.Global.TotalRecovered}
							</Typography>
							<Typography
								variant="h5"
								component="h2"
								style={{ color: "Blue", fontFamily: "Ubuntu" }}>
								<strong>
									New Recovered : {data.global.Global.TotalRecovered}
								</strong>
							</Typography>
							<Typography
								variant="h5"
								component="h2"
								style={{ color: "Red", fontFamily: "Ubuntu" }}>
								Total Deaths : {data.global.Global.TotalDeaths}
							</Typography>
							<Typography
								variant="h5"
								component="h2"
								style={{ color: "Red", fontFamily: "Ubuntu" }}>
								<strong>New Deaths : {data.global.Global.NewDeaths}</strong>
							</Typography>
							<Typography
								variant="body2"
								style={{ marginTop: 20, fontFamily: "Ubuntu" }}>
								Updated at : {data.global.Date}
							</Typography>
						</CardContent>
					</Card>
				</div>
				<div
					style={{
						marginLeft: 100,
						marginRight: 100,
						marginTop: 50,
						marginBottom: 100,
					}}>
					<Typography variant="h3" className={classes.title} gutterBottom>
						Covid-19 Affected Countries
					</Typography>
					<DisplayCountries />
				</div>
			</div>
		);
};
export default HomePage;
