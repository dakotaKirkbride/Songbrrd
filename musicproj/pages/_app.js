
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

// export default function App(props) {
//   const { Component, pageProps } = props;

//   return (
//     <>
//       <Head>
//         <title>Page title</title>
//         <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
//       </Head>

//       <MantineProvider
//         withGlobalStyles
//         withNormalizeCSS
//         theme={{
//           /** Put your mantine theme override here */
//           colorScheme: 'light',
//         }}
//       >
//         <Component {...pageProps} />
//       </MantineProvider>
//     </>
//   );
// }

import { SessionProvider } from "next-auth/react"
// import { theme } from '@nextui-org/react';

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
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
          colors: {
            primary: ['#f8f0fc', '#f3d9fa', '#eebefa', '#e599f7', '#da77f2', '#cc5de8', '#be4bdb', '#ae3ec9', '#9c36b5','#862e9c' ],
            secondary: ['#f3f0ff', '#e5dbff', '#d0bfff', '#b197fc', '#9775fa', '#845ef7', '#7950f2', '#7048e8', '#6741d9','#5f3dc4' ],
          },
          primaryColor: 'secondary',
        }}>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  )
}