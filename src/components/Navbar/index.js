import { Navbar, NavDropdown } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

import "./navbar.scss";

export default function() {
  return (
    <Navbar bg="dark" variant="dark" className="py-0">
      <Navbar.Brand>
        <Link to="/">
          <img
            alt=""
            src="/SmashBall.svg"
            width="50"
            height="50"
            className="d-inline-block align-middle"
          />
          <span className="brand-title">SmackBrack</span>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <NavDropdown title="Tournament" id="navbar-menu-tournament">
        <NavDropdown.Item as={Link} to="/tournament/create">
          Create
        </NavDropdown.Item>
      </NavDropdown>
    </Navbar>
  );
}
