import Footer from "./Footer";

export default function Layout({ children, footerProps }) {
  return (
    <>
      <main>{children}</main>
      <Footer {...footerProps} />
    </>
  );
}
