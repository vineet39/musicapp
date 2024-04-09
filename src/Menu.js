import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    let localStorageUser = localStorage.getItem("user");
    const data = JSON.parse(localStorageUser);
    if (data) setUser(data.user_name);
  }, []);
  const onLog = () => {
    navigate("/login");
    if (user) {
      localStorage.clear();
    }
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user && <Navbar.Brand>Welcome {user}</Navbar.Brand>}
              <Nav.Link onClick={() => navigate("/register")}>
                {user === null ? "Register" : "Update user details"}
              </Nav.Link>
              {user && (
                <Nav.Link onClick={() => navigate("/main")}>Main Page</Nav.Link>
              )}
              <Nav.Link onClick={() => onLog()}>
                {user === null ? "Login" : "Logout"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Menu;
