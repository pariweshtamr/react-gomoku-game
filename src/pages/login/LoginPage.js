import { Form } from "react-bootstrap"
import Layout from "../../components/layout/Layout"
import "./login.css"
import { useEffect, useState } from "react"
import { users } from "../../constants/authorizedUsers"
import { useDispatch, useSelector } from "react-redux"
import { loginSuccess } from "../../redux/user/userSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

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
  const { isAuthenticated } = useSelector((state) => state.user)

  const authUsers = [...users]
  const handleChange = (e) => {
    const { name, value } = e.target

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { username, password } = form
    const validUser = authUsers.find((user) => {
      const valid = user.username === username
      return valid
    })

    if (!validUser) {
      toast.error("Invalid credentials!")
      return
    }

    if (validUser?.password !== password) {
      toast.error("Invalid password!")
      return
    }

    dispatch(loginSuccess(true))
  }

  useEffect(() => {
    isAuthenticated && navigate(`/game?size=${boardSize}`)
  }, [isAuthenticated, boardSize, navigate])
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
            LOGIN
          </button>
        </Form>
      </div>
    </Layout>
  )
}
export default LoginPage
