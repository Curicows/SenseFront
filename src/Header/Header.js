import React from "react";
import { Link } from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

function Header() {
  return (
    <div>
      <Navbar bg="dark" expand="lg" variant={"dark"}>
        <Link to={"/transacoes"} className="nav-link">
        <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <li className="nav-item">
              <Link to={"/transacoes"} className="nav-link">
              Transações
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
