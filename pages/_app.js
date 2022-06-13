import { ApolloClient, ApolloProvider, InMemoryCache, } from '@apollo/client'
import { ThemeProvider } from '@mui/material/styles';
import '../styles/globals.css'
import theme from '../styles/theme';


const client = new ApolloClient({
  uri: 'https://graphql.anilist.co/',
  cache: new InMemoryCache()
});


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
