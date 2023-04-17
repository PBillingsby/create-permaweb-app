import * as React from 'react';
import NextHead from 'next/head';
import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';

const App = ({ Component, pageProps }) => {

  return (
    <>
      <NextHead>
        <title>create-permaweb-app</title>
      </NextHead>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
