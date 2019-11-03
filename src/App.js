import React from "react";
import { Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import * as Tournament from "./components/Tournament";
import "./style/style.scss";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <Container>
        <Route exact path="/" component={Home} />
        <Route path="/tournament/create" component={Tournament.Create} />
      </Container>
    </div>
  );
}

export default App;
