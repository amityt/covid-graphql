import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import HomePage from "../src/Components/Homepage";
import CountryPage from "../src/Components/Countrypage";
import { BrowserRouter as Router, Route } from "react-router-dom";
const client = new ApolloClient({
	uri: "http://localhost:5000/graphql?",
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div style={{ marginTop: 50 }}>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/countries/:countryName" component={CountryPage} />
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
