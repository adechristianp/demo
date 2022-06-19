import { memo, useEffect, useRef } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, } from '@apollo/client'
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

import store from '../reducer/store';
import theme from '../styles/theme';
import LocalDataProvider from './LocalDataProvider';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co/',
  cache: new InMemoryCache()
});

const ROUTES_TO_RETAIN = ['/'];

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
  const retainedComponents = useRef({})

  const isRetainableRoute = ROUTES_TO_RETAIN.includes(router.asPath)

  // Add Component to retainedComponents if we haven't got it already
  if (isRetainableRoute && !retainedComponents.current[router.asPath]) {
    const MemoComponent = memo(Component)
    retainedComponents.current[router.asPath] = {
      component: <MemoComponent {...pageProps} />,
      scrollPos: 0
    }
  }

  // Save the scroll position of current page before leaving
  const handleRouteChangeStart = () => {
    if (isRetainableRoute) {
      retainedComponents.current[router.asPath].scrollPos = window.scrollY
    }
  }

  // Save scroll position - requires an up-to-date router.asPath
  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeStart)
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  // Scroll to the saved position when we load a retained component
  useEffect(() => {
    if (isRetainableRoute) {
      window.scrollTo(0, retainedComponents.current[router.asPath].scrollPos)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Component, pageProps])

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ApolloProvider client={client} >
        <Provider store={store}>
          <LocalDataProvider>
            <div style={{ display: isRetainableRoute ? 'block' : 'none' }}>
              {Object.entries(retainedComponents.current).map(([path, c]) => (
                <div
                  key={path}
                  style={{ display: router.asPath === path ? 'block' : 'none' }}
                >
                  {c.component}
                </div>
              ))}
            </div>
            {!isRetainableRoute && <Component {...pageProps} router={router} />}
          </LocalDataProvider>
        </Provider>
      </ApolloProvider >
    </ThemeProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};


export default MyApp
