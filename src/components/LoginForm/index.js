import React from 'react';
import { Alert, Form, Row, Col, Card, Button } from 'react-bootstrap';
import smashtrackApi from '../../api/smashtrack';

export default class LoginForm extends React.Component {
    state = {
        tag: '',
        password: '',
        errors: []
    };

    handleTagChange = e => {
        this.setState({ tag: e.target.value });
    };

    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();
        const { tag, password } = this.state;
        const errors = [];

        if (!tag) {
            errors.push('Tag is a required field');
        }
        if (!password) {
            errors.push('Password is a required field');
        }


        let success = await smashtrackApi.login(this.state.tag, this.state.password);

        if (success) {
            window.location.reload();
        }
        else {
            errors.push('Invalid credentials');
        }

        this.setState({ errors });
    };

    render() {
        return (
            <React.Fragment>
                {this.state.errors.length
                    ? this.state.errors.map((message, idx) => (
                          <Alert key={idx} variant="danger">
                              {message}
                          </Alert>
                      ))
                    : null}
                <Card>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="tag">
                                        <Form.Label column={false}>
                                            Tag
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Name"
                                            value={this.state.tag}
                                            onChange={this.handleTagChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="password">
                                        <Form.Label column={false}>
                                            Tag
                                        </Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handlePasswordChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        style={{ marginTop: 15 }}
                                    >
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
