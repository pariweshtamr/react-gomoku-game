import { Container } from "react-bootstrap"
import Layout from "../../components/layout/Layout"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Board from "../../components/board/Board"

const LogPage = () => {
  const { games } = useSelector((state) => state.game)
  const [selectedGame, setSelectedGame] = useState()
  const { id } = useParams()

  useEffect(() => {
    if (games?.length) {
      setSelectedGame(games?.find((game) => game.id === id))
    }
  }, [games, id])

  return (
    <Layout>
      <Container className="py-5">
        {selectedGame?.size && (
          <Board boardSize={selectedGame?.size} storedGame={selectedGame} />
        )}
      </Container>
    </Layout>
  )
}
export default LogPage
