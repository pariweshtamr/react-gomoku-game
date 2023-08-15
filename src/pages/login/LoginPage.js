import { Form } from "react-bootstrap"
import Layout from "../../components/layout/Layout"
import "./login.css"
const LoginPage = () => {
  return (
    <Layout>
      <div className="form-container">
        <h2>Login</h2>
        <Form>
          <Form.Control placeholder="Username" autoFocus />
          <Form.Control placeholder="Password" />
          <button className="global-btn">LOGIN</button>
        </Form>
      </div>
    </Layout>
  )
}
export default LoginPage
