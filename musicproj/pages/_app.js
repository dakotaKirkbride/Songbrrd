
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
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
