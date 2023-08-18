import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./header.css"
import { useDispatch, useSelector } from "react-redux"
import { logoutSuccess } from "../../redux/user/userSlice"
const Header = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logoutSuccess(false))
  }

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
                <button
                  type="button"
                  className="global-btn"
                  style={{ width: "max-content" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <Link to="/games">Previous Games</Link>
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
