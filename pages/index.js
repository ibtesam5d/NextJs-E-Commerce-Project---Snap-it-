import Head from "next/head";
import { Inter } from "@next/font/google";
import Hero from "@/components/Hero";
import IphoneLists from "@/components/IphoneLists";
import axios from "axios";
import { useState } from "react";
import AddProduct from "@/components/AddProduct";
import AddButton from "@/components/AddButton";
import dbConnect from "@/lib/mongo";
import Product from "@/models/Product";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ iphoneList, admin }) {
  const [close, setClose] = useState(true);

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
      {admin && <AddButton setClose={setClose} />}
      <IphoneLists iphoneList={iphoneList} />
      {!close && <AddProduct setClose={setClose} />}
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  try {
    console.log("connecting to database");

    await dbConnect();

    console.log("connected to database");

    console.log("fetching data");

    const products = await Product.find();

    console.log("fetched data");

    return {
      props: {
        iphoneList: JSON.parse(JSON.stringify(products)),
        admin,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
