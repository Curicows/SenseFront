import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import {Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTransacao from "./components/Transacao/AddTransacao";
import Transacao from "./components/Transacao/Transacao";
import TransacaoList from "./components/Transacao/TransacaoList";
import Header from "./Header/Header";

function App() {
  return (
    <div>
      <Header />

      <Container className="mt-3">
        <Switch>
          <Route exact path={["/", "/transacoes"]} component={TransacaoList} />
          <Route exact path="/add" component={AddTransacao} />
          <Route path="/transacao/:id" component={Transacao} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
