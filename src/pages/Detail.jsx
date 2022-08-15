import React from "react";
// import Header from "../components/common/Header";
import Layout from "../components/common/Layout";

const Detail = () => {
  return (
    <>
      {/* <Header /> */}
      <Layout>
        <div>
          <img
            width="540"
            src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_KR?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1654014007858"
          />
        </div>

        <div>
          <div>제목</div>
          <div>카테고리</div>
          <div>거래장소</div>
          <div>가격</div>
          <div>글내용</div>
        </div>

        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </Layout>
    </>
  );
};

export default Detail;
