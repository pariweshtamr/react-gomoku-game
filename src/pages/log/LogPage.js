import { Container } from "react-bootstrap"
import Layout from "../../components/layout/Layout"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Board from "../../components/board/Board"
import { getPreviousGameAction } from "../../redux/game/gameAction"

const LogPage = () => {
  const dispatch = useDispatch()
  const { previousGame } = useSelector((state) => state.game)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getPreviousGameAction(id))
  }, [dispatch, id])

  return (
    <Layout>
      <Container className="py-5">
        {previousGame?.size && (
          <Board boardSize={previousGame?.size} storedGame={previousGame} />
        )}
      </Container>
    </Layout>
  )
}
export default LogPage
