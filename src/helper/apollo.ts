import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  DefaultOptions,
} from "@apollo/client";
//const httpLink = new HttpLink({ uri: "https://s3ctr.s3c.icu/graphql" });
const httpLink = new HttpLink({uri: 'https://backend.s3c.quest/graphql'})
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}




const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = sessionStorage?.getItem("token");
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  // Call the next link in the middleware chain.
 
  return forward(operation);
});
const client = new ApolloClient({
  // uri: process.env.NEXT_PUBLIC_BASE_URL,
  //uri: "https://s3ctr.s3c.quest/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
 defaultOptions: defaultOptions
});
export default client;
