import Head from "next/head";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/auth/sign-in",
      permanent: false,
    },
  };
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Contact Management App</title>
      </Head>
    </>
  );
}
