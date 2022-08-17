import React, { useState } from "react";
import Cards from "../components/Cards";
import Cardlist from "../components/CardList";
import Layout from "../components/common/Layout";
import Header from '../components/common/Header';
import styled from 'styled-components';

const Home = () => {
  const [category, setCategory] = useState('all')
  console.log(category)

  return (
    <>
      <Layout>
        <Header />
        <Category>
          <AllCategory onClick={() => {
            setCategory('all')
          }}>전체 보기</AllCategory>
          <Notebook onClick={() => {
            setCategory('노트북')
          }}>노트북</Notebook>
          <Keyboard onClick={() => {
            setCategory('키보드')
          }}>키보드</Keyboard>
          <Mouse onClick={() => {
            setCategory('마우스')
          }}>마우스</Mouse>
        </Category>
        <Cardlist category={category}></Cardlist>
      </Layout>
    </>
  );
};

export default Home;

const AllCategory = styled.button`
    background-color: #aeaeae;
  color: white;
  font-weight: bold;
  width: 4em;
  height: 2em;
  margin: 0.65em 0 0.65em 0.65em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
  border: none;
  transition: 0.1s ease-in;
  &:hover {
    transform: scale(1.05)
  }
`

const Category = styled.div`
 height: 2em ;
 margin: 1.25em;
 display: flex;
`

const Notebook = styled.button`
  background-color: #61dafb;
  color: white;
  font-weight: bold;
  width: 4em;
  height: 2em;
  margin: 0.65em 0 0.65em 0.65em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
  border: none;
  transition: 0.1s ease-in;
  &:hover {
    transform: scale(1.05)
  }
`;

const Keyboard = styled.button`
  background-color: orange;
  color: white;
  font-weight: bold;
  width: 4em;
  height: 2em;
  margin: 0.65em 0 0.65em 0.65em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
  border: none;
  transition: 0.1s ease-in;
  &:hover {
    transform: scale(1.05)
  }
`;

const Mouse = styled.button`
  background-color: rgb(144, 66, 175);
  color: white;
  font-weight: bold;
  width: 4em;
  height: 2em;
  margin: 0.65em 0 0.65em 0.65em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5em;
  border: none;
  transition: 0.1s ease-in;
  &:hover {
    transform: scale(1.05)
  }
`;