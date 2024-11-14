import Layout from '../components/Layout';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const footerProps = Component.footerProps || { show: true, width: "100%", color: "#000000" };

  return (
    <Layout footerProps={footerProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
