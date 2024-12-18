import Layout from "../components/Layout";
import "../styles/globals.css";
import TanstackProvider from "@/components/providers/TanstackProvider";
import CurrnetUserProvider from "@/Context/Context";

export default function MyApp({ Component, pageProps }) {
  const footerProps = Component.footerProps || {
    show: true,
    width: "100%",
    color: "#000000",
  };

  return (
    <TanstackProvider>
      <CurrnetUserProvider>
        <Layout footerProps={footerProps}>
          <Component {...pageProps} />
        </Layout>
      </CurrnetUserProvider>
    </TanstackProvider>
  );
}
