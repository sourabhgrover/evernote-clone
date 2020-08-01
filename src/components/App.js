import React from "react";
import {Container,Row,Col} from "react-bootstrap";
import styled from "styled-components";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home";





const Wrapper = styled.div`
margin:0;
padding:0;
box-sizing:border-box;
width: 100vw;
min-height: 100vh;
background-color: #f9c900;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const App = () =>{
return(
<BrowserRouter>
<Switch>
<Route path="/" exact component={Home} />
</Switch>
</BrowserRouter>
);
}

export default App;