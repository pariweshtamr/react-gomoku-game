import { Container } from "react-bootstrap"
import Layout from "../../components/layout/Layout"
import "./history.css"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { getAllGamesAction } from "../../redux/game/gameAction"
const HistoryPage = () => {
  const dispatch = useDispatch()
  const { games } = useSelector((state) => state.game)

  useEffect(() => {
    dispatch(getAllGamesAction())
  }, [dispatch])
  return (
    <Layout>
      <Container className="py-5">
        <div className="games">
          {games?.length > 0 ? (
            games?.map((game, i) => (
              <div className="game-box" key={game._id}>
                <div className="left">
                  <div className="left-box d-flex align-items-center gap-4">
                    <h6>
                      Game #{i + 1} @
                      {new Date(game?.createdAt).toLocaleString("en-GB")}
                    </h6>
                    <h5>Winner: {game?.winner}</h5>
                  </div>
                </div>
                <div className="right">
                  <Link
                    to={`/game-log/${game._id}`}
                    className="global-btn"
                    style={{ textTransform: "none", letterSpacing: "1px" }}
                  >
                    View game log
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h1>No Game History Available!</h1>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  )
}
export default HistoryPage
