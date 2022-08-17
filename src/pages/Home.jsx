import React from "react";
import Cards from "../components/Cards";
import Cardlist from "../components/CardList";
import Layout from "../components/common/Layout";
import Header from '../components/common/Header';

const Home = () => {
  return (
    <>
      <Header />
      <Layout>
        <Cardlist></Cardlist>
      </Layout>
    </>
  );
};

export default Home;
