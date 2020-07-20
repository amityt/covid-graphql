const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
} = require("graphql");
const axios = require("axios");

const AllData = new GraphQLObjectType({
	name: "AllData",
	fields: () => ({
		Global: {
			type: GlobalType,
		},
		Countries: {
			type: GraphQLList(CountryType),
		},
		Date: {
			type: GraphQLString,
		},
	}),
});

const GlobalType = new GraphQLObjectType({
	name: "Global",
	fields: () => ({
		NewConfirmed: { type: GraphQLInt },
		TotalConfirmed: { type: GraphQLInt },
		NewRecovered: { type: GraphQLInt },
		TotalRecovered: { type: GraphQLInt },
		NewDeaths: { type: GraphQLInt },
		TotalDeaths: { type: GraphQLInt },
	}),
});

const CountryType = new GraphQLObjectType({
	name: "Countries",
	fields: () => ({
		Country: { type: GraphQLString },
		CountryCode: { type: GraphQLString },
	}),
});

const CountryData = new GraphQLObjectType({
	name: "Country",
	fields: () => ({
		country: { type: GraphQLString },
		cases: { type: GraphQLInt },
		deaths: { type: GraphQLInt },
		recovered: { type: GraphQLInt },
		todayCases: { type: GraphQLInt },
		todayDeaths: { type: GraphQLInt },
		todayRecovered: { type: GraphQLInt },
		active: { type: GraphQLInt },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		global: {
			type: AllData,
			resolve(parent, args) {
				return axios
					.get("https://api.covid19api.com/summary")
					.then((res) => res.data);
			},
		},
		country: {
			type: CountryData,
			args: {
				country: { type: GraphQLString },
			},
			resolve(parent, args) {
				return axios
					.get(
						`https://corona.lmao.ninja/v2/countries/${args.country}?yesterday=true`
					)
					.then((res) => res.data);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
