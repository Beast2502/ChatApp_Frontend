import React,{useContext} from "react";
import { AuthContext } from "../context/AuthContext";

import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

const Login = () => {
  const {loginUser,updateLoginInfo,loginInfo ,loginError,isLoginLoading} =
  useContext(AuthContext);
  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control type="email" placeholder="Email"
              onChange={(e) =>
                updateLoginInfo({ ...loginInfo, email: e.target.value })
              } />
              <Form.Control type="password" placeholder="Password" 
               onChange={(e) =>
                updateLoginInfo({ ...loginInfo, password: e.target.value })
              }
              />
              <Button variant="primary" type="submit">
                {isLoginLoading ? "Logged In" : "SUMBIT"}
              </Button>
              {loginError?.error && ( <Alert variant="danger">{loginError.message}</Alert>)}
             
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
