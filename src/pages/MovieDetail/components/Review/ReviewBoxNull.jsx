import React from "react";
import { Card, Container } from "react-bootstrap";
import "./ReviewBox.style.css";

const ReviewBoxNull = () => {

  return (
    <div>
      <Container>
        <Card
          border="danger"
          bg={"Dark".toLowerCase()}
          key={"Dark"}
          text={"white"}
          className="mb-2"
        >
          <Card.Body>
            <Card.Title>{`There's no reviews`}</Card.Title>
            <Card.Text>
              <div>{''}</div>
              <br />
              <div
                className="show-more"
              >
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ReviewBoxNull;
