import React from "react";
import {Container,Row,Col} from "react-bootstrap";
import styled from "styled-components";

import LeftNavBar from "./LeftNavBar";

const StyledContainer = styled(Container)`
    background-color: palevioletred;
    border: 2px solid palevioletred;
    min-height:100vh;
    // flex:1
`;

const Wrapper = styled.div`
    background-color: palevioletred;
    // border: 2px solid palevioletred;
    min-height:100vh;
    // flex:1
    display: flex;
    align-items: stretch
`;

const Home = () =>{
return(
    <Wrapper>
        <LeftNavBar />
        <div style={{border:"2px solid red"}} className="col-2">Note Book List</div>
        <div style={{border:"2px solid yellow"}} className="col-8">Content</div>
    </Wrapper>
);
}

export default Home;