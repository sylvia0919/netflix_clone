import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const expand = "sm";
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchByKeyword = (event) => {
    event.preventDefault();
    //url 바꿔주기
    navigate(`/movies?q=${keyword}`);
    setKeyword("");
  };

  return (
    <div>
      <Navbar
        key={expand}
        expand={expand}
        data-bs-theme="dark"
        //   className="bg-body-tertiary mb-3"
        className="bg-black text-white"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img
              src="https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg"
              width={100}
              height={50}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-${expand}`}
              >
                <img
                  src="https://images.ctfassets.net/4cd45et68cgf/4nBnsuPq03diC5eHXnQYx/d48a4664cdc48b6065b0be2d0c7bc388/Netflix-Logo.jpg"
                  width={100}
                  height={50}
                />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className="flex-grow-1 pe-3"
                //   justify-content-end
              >
                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                <Nav.Link onClick={() => navigate("/movies")}>Movies</Nav.Link>
              </Nav>
              <Form className="d-flex" onSubmit={searchByKeyword}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={keyword}
                  onChange={(event) => {
                    setKeyword(event.target.value);
                  }}
                />
                <Button type="submit" variant="outline-danger">
                  Search
                </Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
