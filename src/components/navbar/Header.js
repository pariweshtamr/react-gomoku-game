import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./header.css"
const Header = () => {
  const isAuthenticated = true
  return (
    <Navbar expand="lg" bg="dark" className="bg-body-tertiary navbar">
      <Container>
        <Link to="/" className="logo">
          GOMOKU
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto right-links">
            {isAuthenticated ? (
              <>
                <Link to="/login">Logout</Link>
                <Link to="/history">Previous Games</Link>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header
