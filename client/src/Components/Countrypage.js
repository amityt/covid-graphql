import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const GET_COUNTRYDATA = gql`
	query CountryQuery($country: String!) {
		country(country: $country) {
			country
			cases
			deaths
			recovered
			todayCases
			todayDeaths
			todayRecovered
			active
		}
	}
`;

class CountryPage extends Component {
	render() {
		let country = this.props.match.params.countryName;
		return (
			<div>
				<Query query={GET_COUNTRYDATA} variables={{ country }}>
					{({ loading, error, data }) => {
						if (loading) return <p>Loading</p>;
						if (error) return <p>Error</p>;
						return (
							<Card
								style={{ width: 500, textAlign: "center", margin: "auto" }}
								variant="outlined">
								<CardContent>
									<Typography
										variant="h4"
										gutterBottom
										style={{ fontFamily: "Ubuntu" }}>
										{data.country.country} Covid-19 Stats
									</Typography>
									<Typography
										variant="h5"
										component="h2"
										style={{ color: "Green", fontFamily: "Ubuntu" }}>
										Total Confirmed : {data.country.cases}
									</Typography>
									<Typography
										variant="h5"
										component="h2"
										style={{ color: "Green", fontFamily: "Ubuntu" }}>
										<strong>New Confirmed : {data.country.todayCases}</strong>
									</Typography>
									<Typography
										variant="h5"
										component="h2"
										style={{ color: "Blue", fontFamily: "Ubuntu" }}>
										Total Recovered : {data.country.recovered}
									</Typography>
									<Typography
										variant="h5"
										component="h2"
										style={{ color: "Blue", fontFamily: "Ubuntu" }}>
										<strong>
											New Recovered : {data.country.todayRecovered}
										</strong>
									</Typography>
									<Typography
										variant="h5"
										component="h2"
										style={{ color: "Red", fontFamily: "Ubuntu" }}>
										Total Deaths : {data.country.deaths}
									</Typography>
									<Typography
										variant="h5"
										component="h2"
										style={{ color: "Red", fontFamily: "Ubuntu" }}>
										<strong>New Deaths : {data.country.todayDeaths}</strong>
									</Typography>
								</CardContent>
							</Card>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default CountryPage;
