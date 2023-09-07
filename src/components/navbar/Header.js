import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import "./header.css"
import { useDispatch, useSelector } from "react-redux"
import { logoutSuccess } from "../../redux/user/userSlice"
import Swal from "sweetalert2"
import { deleteIncompleteGameAction } from "../../redux/game/gameAction"
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.user)
  const { game } = useSelector((state) => state.game)

  const handleLogout = () => {
    dispatch(logoutSuccess(false))
  }

  const handleClick = () => {
    if (game?._id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to leave your current game?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ffca2b",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Leave it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteIncompleteGameAction(game?._id)) && navigate("/")
        }
      })
    } else {
      navigate("/")
    }
  }

  return (
    <Navbar expand="lg" bg="dark" className="bg-body-tertiary navbar">
      <Container>
        <button onClick={handleClick} className="logo">
          GOMOKU
        </button>
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
              <div className="d-flex align-items-center gap-4">
                <Link to="/login">Login</Link>
                <Link to="/register" className="register-btn">
                  Register
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header
