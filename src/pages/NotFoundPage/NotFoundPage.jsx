import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <div>
      <Container className="frame">
        <Row>
          <Col>
            <h1 style={{ textAlign: "center" }}>NotFoundPage</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <img
              src="https://i.ytimg.com/vi/8lilupjrhOY/maxresdefault.jpg"
              width="100%"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFoundPage;
