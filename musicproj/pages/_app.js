
// ||||               ||||
// VVVV ORIGINAL CODE VVVV

// import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp


// CHANGED TO THIS
// REFERENCE: https://nextui.org/docs/guide/getting-started

// 1. import `NextUIProvider` component
// import { NextUIProvider } from '@nextui-org/react';

// function MyApp({ Component, pageProps }) {
//   return (
//     // 2. Use at the root of your app
//     <NextUIProvider>
//       <Component {...pageProps} />
//     </NextUIProvider>
//   );
// }

// export default MyApp;



import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
