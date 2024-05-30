import React, { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logOutUSer } = useContext(AuthContext);

  return (
    <>
      <Navbar  className="mb-4" style={{ height: "3.75rem" , background:"rgb(56, 1, 60)"}}>
        <Container>
          <h2>
            <Link to="/" className="link-light text-decoration-none">
            Walkie Talkie
            </Link>
          </h2>
          {user && ( <span className="text-warning">Login in as {user?.name}</span>)}
          {!user && ( <span className="text-warning">Welcome Personl Chat</span>)}
          <Nav>
            <Stack direction="horizontal" gap={3}>
              {user && (
                <>
                  <Link
                    onClick={() => {
                      logOutUSer();
                    }}
                    to="/login"
                    className="link-light text-decoration-none"
                  >
                    Logout
                  </Link>
                </>
              )}

              {!user && (
                <>
                  <Link to="/login" className="link-light text-decoration-none">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="link-light text-decoration-none"
                  >
                    Register
                  </Link>
                </>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
