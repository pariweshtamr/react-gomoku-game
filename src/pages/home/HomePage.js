import { useState } from "react"
import Layout from "../../components/layout/Layout"
import "./home.css"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
const HomePage = () => {
  const [boardSize, setBoardSize] = useState(null)
  const sizes = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

  const isAuthenticated = false

  return (
    <Layout>
      <Container className="home-container">
        <div className="size-select-container">
          <h1>Let&apos; Play</h1>
          <i>Select a board size and press start</i>
          <select
            name=""
            className="size-select"
            onChange={(e) => setBoardSize(e.target.value)}
          >
            <option value="">Select Board Size</option>
            {sizes?.map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
          <Link
            to={isAuthenticated ? `/game?size=${boardSize}` : "/login"}
            className="global-btn"
          >
            Start
          </Link>
        </div>
      </Container>
    </Layout>
  )
}
export default HomePage
