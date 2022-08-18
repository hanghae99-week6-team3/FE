import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProduct } from "../app/slice/productSlice";
import styled from "styled-components";
import Pagination from "./Pagenation";
import Cards from "./Cards";

const Cardlist = ({ category }) => {
  const productData = useSelector((state) => state.product);
  console.log(productData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProduct());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const offset = (page - 1) * limit;

  if (category === "all") {
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
  } else {
    return (
      <>
        <Listwrap>
          {productData
            .slice(offset, offset + limit)
            .filter((item) => item.product.category === category)
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
  }
};

const Listwrap = styled.div`
  width: 60em;
  height: 85%;
  display: flex;
  flex-direction: row;
  padding: 1.25em 0;
  flex-wrap: wrap;
  align-items: left;
`;

export default Cardlist;
