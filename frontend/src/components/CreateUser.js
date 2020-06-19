import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Card,
  CardHeader,
  CardBody,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';
import axios from 'axios';

export default class CreateUser extends Component {
  state = {
    users: [],
    username: '',
  };

  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users');
    this.setState({ users: res.data });
  };

  componentDidMount = async () => {
    this.getUsers();
    console.log(this.state.users);
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/users', {
      username: this.state.username,
    });
    this.setState({ username: '' });
    this.getUsers();
  };

  deleteUser = async (id) => {
    await axios.delete(`http://localhost:4000/api/users/${id}`);
    this.getUsers();
  };

  render() {
    return (
      <Row>
        <Col md="5">
          <Card>
            <CardHeader className="font-weight-bold">
              Create New User
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.onSubmit}>
                <FormGroup row>
                  <Col sm={9}>
                    <Input
                      type="text"
                      name="user"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                    />
                  </Col>
                  <Col sm={3}>
                    <Button>Save</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col md="7">
          <ListGroup>
            {this.state.users.map((user) => (
              <ListGroupItem
                key={user._id}
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.username}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}
