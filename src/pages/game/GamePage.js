import Layout from "../../components/layout/Layout"
import Board from "../../components/board/Board"
import { Container } from "react-bootstrap"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSingleGameAction } from "../../redux/game/gameAction"
import { useParams } from "react-router-dom"

const GamePage = () => {
  const dispatch = useDispatch()
  const { game } = useSelector((state) => state.game)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getSingleGameAction(id))
  }, [dispatch, id])

  return (
    <Layout>
      <Container className="py-5">
        <Board game={game} boardSize={game?.size} />
      </Container>
    </Layout>
  )
}
export default GamePage
