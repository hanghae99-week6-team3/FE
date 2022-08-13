import React from 'react';
import CommentList from '../components/CommentList';
import Layout from '../components/common/Layout';
import Header from '../components/common/Header';

const Detail = () => {
    return (
        <>
            <Header></Header>
            <Layout>
                <CommentList />
            </Layout>
        </>
    );
};

export default Detail;