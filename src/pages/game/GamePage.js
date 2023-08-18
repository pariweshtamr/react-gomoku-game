import Layout from "../../components/layout/Layout"
import Board from "../../components/board/Board"
import { Container } from "react-bootstrap"

const GamePage = () => {
  const query = new URLSearchParams(window.location.search)
  const boardSize = parseInt(query.get("size")) || 15

  return (
    <Layout>
      <Container className="py-5">
        <Board boardSize={boardSize} />
      </Container>
    </Layout>
  )
}
export default GamePage
