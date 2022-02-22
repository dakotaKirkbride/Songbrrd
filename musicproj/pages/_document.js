
// REFERENCE: https://nextui.org/docs/guide/getting-started 
// STEP 2

// import Document, { Html, Head, Main, NextScript } from 'next/document';
// import { CssBaseline } from '@nextui-org/react';

// class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const initialProps = await Document.getInitialProps(ctx);
//     return {
//       ...initialProps,
//       styles: <>{initialProps.styles}</>
//     };
//   }

//   render() {
//     return (
//       <Html lang="en">
//         <Head>{CssBaseline.flush()}</Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default MyDocument;



import Document from 'next/document';
import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;
}
