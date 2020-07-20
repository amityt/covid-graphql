import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import HomePage from "../src/Components/Homepage";

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql?",
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div style={{ marginTop: 50 }}>
				<HomePage />
			</div>
		</ApolloProvider>
	);
}

export default App;
