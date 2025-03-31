"use client"
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { Bell, Cart } from "react-bootstrap-icons"

function Header() {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    navigate("/login")
  }

  return (
    <header>
      <Navbar bg="light" expand="lg" className="py-2 border-bottom">
        <Container fluid>
          <div className="d-flex align-items-center">
            <Navbar.Brand as={Link} to="/" className="me-3">
              <span style={{ color: "#e53238" }}>e</span>
              <span style={{ color: "#0064d2" }}>b</span>
              <span style={{ color: "#f5af02" }}>a</span>
              <span style={{ color: "#86b817" }}>y</span>
            </Navbar.Brand>
            <NavDropdown title="Shop by category" id="basic-nav-dropdown" className="me-3">
              <NavDropdown.Item as={Link} to="/store/1">
                Electronics
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/store/2">
                Fashion
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/store/3">
                Home & Garden
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/store/4">
                Sports
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/store/5">
                Toys
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/store/6">
                Collectibles
              </NavDropdown.Item>
            </NavDropdown>
          </div>

          <Form className="d-flex flex-grow-1 mx-3">
            <FormControl type="search" placeholder="Search for anything" className="me-2" aria-label="Search" />
            <Button variant="primary">Search</Button>
          </Form>

          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/watchlist">
                  Watchlist
                </Nav.Link>
                <Nav.Link as={Link} to="/account">
                  My eBay
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Sign in
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  register
                </Nav.Link>
              </>
            )}
            <Nav.Link href="#">
              <Bell />
            </Nav.Link>
            <Nav.Link href="#">
              <Cart />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Navbar bg="light" expand="lg" className="py-1 border-bottom">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Explore
            </Nav.Link>
            <Nav.Link as={Link} to="/store/1">
              Electronics
            </Nav.Link>
            <Nav.Link as={Link} to="/store/2">
              Fashion
            </Nav.Link>
            <Nav.Link as={Link} to="/store/6">
              Collectibles
            </Nav.Link>
            <Nav.Link as={Link} to="/store/3">
              Home & Garden
            </Nav.Link>
            <Nav.Link as={Link} to="/store/4">
              Sports
            </Nav.Link>
            <Nav.Link as={Link} to="/store/5">
              Toys
            </Nav.Link>
            <Nav.Link as={Link} to="admin">
              Admin
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

