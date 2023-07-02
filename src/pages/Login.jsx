import React from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";



const Login =()=>{
    return (<> <Form>
        <Row style={{
            justifyContent: "center",
            paddingTop:"10%"
        }}>
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control  type="email" placeholder="Email"/>
              <Form.Control  type="password" placeholder="Password"/>
              <Button variant="primary" type="submit">Login </Button>
              <Alert variant="danger">An Error  Occured</Alert>
            </Stack>
          </Col>
        </Row>
      </Form></>)
}

export default Login;
