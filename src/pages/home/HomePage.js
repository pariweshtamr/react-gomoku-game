import { useState } from "react"
import Layout from "../../components/layout/Layout"
import "./home.css"
import { Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
const HomePage = () => {
  const navigate = useNavigate()
  const [boardSize, setBoardSize] = useState(null)
  const sizes = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  const { isAuthenticated } = useSelector((state) => state.user)

  const handleStart = (boardSize) => {
    if (!boardSize) {
      toast.error("Please select a board size!")
      return
    }
    isAuthenticated && boardSize
      ? navigate(`/game?size=${boardSize}`)
      : navigate(`/login?size=${boardSize}`)
  }

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
          <button
            type="button"
            onClick={() => handleStart(boardSize)}
            className="global-btn"
          >
            Start
          </button>
        </div>
      </Container>
    </Layout>
  )
}
export default HomePage
