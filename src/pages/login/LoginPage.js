import { Form, Spinner } from "react-bootstrap"
import Layout from "../../components/layout/Layout"
import "./login.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loginAction } from "../../redux/user/userAction"
import { setGameAction } from "../../redux/game/gameAction"

const initialState = {
  username: "",
  password: "",
}
const LoginPage = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState(initialState)
  const navigate = useNavigate()
  const query = new URLSearchParams(window.location.search)
  const boardSize = parseInt(query.get("size"))
  const { game } = useSelector((state) => state.game)
  const { user, isLoading } = useSelector((state) => state.user)

  // const authUsers = [...users]
  const handleChange = (e) => {
    const { name, value } = e.target

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginAction(form))
  }

  useEffect(() => {
    if (user?._id && boardSize) {
      dispatch(
        setGameAction({
          size: +boardSize,
        })
      )
    } else if (user?._id) {
      navigate("/")
    }
  }, [boardSize, user?._id, dispatch, navigate])

  useEffect(() => {
    game?._id && navigate(`/game/${game._id}`)
  }, [game?._id, game?.size, navigate])
  return (
    <Layout>
      <div className="form-container">
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            placeholder="Username"
            autoFocus
            name="username"
            onChange={handleChange}
          />
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button className="global-btn" type="submit">
            {isLoading ? <Spinner variant="light" /> : "LOGIN"}
          </button>
        </Form>
        <p className="text-center mt-3" style={{ fontSize: "12px" }}>
          Don&apos;t have an account?{" "}
          <span>
            <Link to={"/register"}>Register</Link>
          </span>
        </p>
      </div>
    </Layout>
  )
}
export default LoginPage
