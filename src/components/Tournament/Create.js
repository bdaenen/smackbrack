import React from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import * as Select from "../Select";

export default class Create extends React.Component {
  state = {};

  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Tournament</Card.Title>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control type="text" placeholder="Name" />
                </Form.Group>
              </Col>
              <Col>
                <Select.User />
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
