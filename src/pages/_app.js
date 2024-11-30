import Layout from '../components/Layout';
import '../styles/globals.css';
import TanstackProvider from '@/components/providers/TanstackProvider'; 

export default function MyApp({ Component, pageProps }) {
  const footerProps = Component.footerProps || { show: true, width: "100%", color: "#000000" };

  return (
    <TanstackProvider> 
      <Layout footerProps={footerProps}>
        <Component {...pageProps} />
      </Layout>
    </TanstackProvider>
  );
}
