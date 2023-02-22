import Head from "next/head";
import { Inter } from "@next/font/google";
import Hero from "@/components/Hero";
import IphoneLists from "@/components/IphoneLists";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ iphoneList }) {
  return (
    <>
      <Head>
        <title>Snap It! Best Iphone Case Marketplace Ever!</title>
        <meta
          name="description"
          content="find the latest and greatest iphone case ever made."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <IphoneLists iphoneList={iphoneList} />
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      iphoneList: await res.data,
    },
  };
};
