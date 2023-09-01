import { Form } from "react-bootstrap"
import Layout from "../../components/layout/Layout"
import "./register.css"
import { useState } from "react"
import { toast } from "react-hot-toast"

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
}
const RegisterPage = () => {
  const [form, setForm] = useState(initialState)
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { password, confirmPassword, username } = form

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!")
      return
    }
  }
  return (
    <Layout>
      <div className="form-container">
        <h2>Register</h2>
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
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <button className="global-btn" type="submit">
            REGISTER
          </button>
        </Form>
      </div>
    </Layout>
  )
}
export default RegisterPage
