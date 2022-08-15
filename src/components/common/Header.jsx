import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <HeaderBar>
            <Link to={'/'}><h1 style={{ padding: '0', marginLeft: '3em', display: 'inline', textDecoration: 'none', color: 'black' }}>SAMJO</h1></Link>
            <div style={{ marginRight: '10em' }}>
                <Link to={'/write'}><button>작성하기</button></Link>
                <Link to={'/login'}><button>로그인</button></Link>
                <Link to={'/join'}><button>회원가입</button></Link>
            </div>
        </HeaderBar>
    );
};

export default Header;

const HeaderBar = styled.header`
    margin: 0 3em;
    padding: 0;
    width: 100%;
    height: 5em;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between
`