import React from "react";
import { Alert, Form, Row, Col, Card, Button } from "react-bootstrap";
import * as Select from "../Select";
import axios from 'axios';

export default class Create extends React.Component {
  state = {
    type: null,
    users: [],
    stages: [],
    name: '',
    rounds: 0,
    errors: []
  };

  handleUserChange = (options) => {
    if (options) {
      this.setState({users: options.map(option => option.value)});
    }
    else {
      this.setState({users: []});
    }
  };

  handleStageChange = (options) => {
    if (options) {
      this.setState({stages: options.map(option => option.value)});
    }
    else {
      this.setState({stages: []});
    }
  };

  handleTournamentTypeChange = (option) => {
    this.setState({type: option.value});
  };

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  };

  handleRoundsChange = (e) => {
    this.setState({rounds: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { type, users, stages, name, rounds } = this.state;
    const errors = [];

    if (!type) {
      errors.push('Type is a required field');
    }
    if (!users.length) {
      errors.push('Participants is a required field');
    }

    if (!stages.length) {
      errors.push('Stages is a required field');
    }

    if (!name) {
      errors.push('Name is a required field');
    }

    if (type === 'swiss' && !rounds) {
      errors.push('Rounds is a required field and should be greater than 0');
    }

    this.setState({errors});
  };


  render() {
    return (
      <React.Fragment>
        {this.state.errors.length ? (this.state.errors.map((message, idx) => (
          <Alert key={idx} variant="danger">
            {message}
          </Alert>
        ))): null}
        <Card>
          <Card.Body>
            <Card.Title>Tournament</Card.Title>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="name">
                    <Form.Label column={false}>
                      Name
                    </Form.Label>
                    <Form.Control required type="text" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label column={false} htmlFor={'userSelect'}>
                    Participants
                  </Form.Label>
                  <Select.User required onChange={this.handleUserChange} id='userSelect'/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label column={false} htmlFor={'stageSelect'}>
                    Stages
                  </Form.Label>
                  <Select.Stage onChange={this.handleStageChange} id='stageSelect'/>
                </Col>
                <Col>
                  <Form.Label column={false} htmlFor={'typeSelect'}>
                    Tournament Type
                  </Form.Label>
                  <Select.TournamentType onChange={this.handleTournamentTypeChange} id="typeSelect"/>
                </Col>
                {this.state.type === 'swiss' ? (
                  <Col>
                    <Form.Group controlId="numberOfSwissRounds">
                      <Form.Label column={false}>
                        Number of rounds
                      </Form.Label>
                      <Form.Control type="number" placeholder="Number of rounds" min={0} max={Math.floor((this.state.users.length*2)/3)} value={this.state.rounds} onChange={this.handleRoundsChange}/>
                    </Form.Group>
                  </Col>
                ): null}
              </Row>
              <Row>
                <Col>
                  <Button variant="primary" type="submit" style={{marginTop: 15}}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}
