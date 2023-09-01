import { Form, Spinner } from "react-bootstrap"
import Layout from "../../components/layout/Layout"
import "./register.css"
import { useState } from "react"
import { toast } from "react-hot-toast"
import userAPI from "../../api/userApi"
import { Link, useNavigate } from "react-router-dom"

const initialState = {
  username: "",
  password: "",
  confirmPassword: "",
}
const RegisterPage = () => {
  const [form, setForm] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { confirmPassword, ...rest } = form

    if (rest.password !== confirmPassword) {
      setIsLoading(false)
      toast.error("Passwords do not match!")
      return
    }

    try {
      const { status, message } = await userAPI.registerUser(rest)
      if (status === "error") {
        setIsLoading(false)
        toast.error(message)
        return
      }
      setIsLoading(false)
      toast.success(message + " You may now login...") &&
        setTimeout(() => {
          navigate("/login")
        }, 3000)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
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
            {isLoading ? <Spinner variant="light" /> : "REGISTER"}
          </button>
        </Form>
        <p className="text-center mt-3" style={{ fontSize: "12px" }}>
          Already have an account?{" "}
          <span>
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </div>
    </Layout>
  )
}
export default RegisterPage
