import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql", // Replace with your GraphQL backend URL
  uri: "https://sprinto-bookhive-1.onrender.com/graphql",
  cache: new InMemoryCache(),
});

export default client;

