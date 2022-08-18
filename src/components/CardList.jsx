import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProduct } from "../app/slice/productSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagenation";
import Cards from './Cards';

const Cardlist = () => {
  const productData = useSelector((state) => state.product);
  console.log(productData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProduct());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const offset = (page - 1) * limit;

  return (
    <>
      <Listwrap>
        {productData
          .slice(offset, offset + limit)
          .map((card) => (
            <Cards key={card.product.productId} card={card}></Cards>
          ))
          .reverse()}
      </Listwrap>
      <footer>
        <Pagination
          total={productData.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </>
  );
};

// 카드리스트

const Listwrap = styled.div`
  width: 60em;
  height: 85%;
  display: flex;
  flex-direction: row;
  padding: 1.25em 0;
  flex-wrap: wrap;
  align-items: left;
`;

// 카드관련 스타일


export default Cardlist;
