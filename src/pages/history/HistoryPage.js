import { Container } from "react-bootstrap"
import Layout from "../../components/layout/Layout"
import "./history.css"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const HistoryPage = () => {
  const { games } = useSelector((state) => state.game)
  return (
    <Layout>
      <Container className="py-5">
        <div className="games">
          {games?.length > 0 ? (
            games?.map((game, i) => (
              <div className="game-box" key={game.id}>
                <div className="left">
                  <div className="left-box d-flex align-items-center gap-4">
                    <h6>
                      Game #{i + 1} @{new Date(game?.date).toLocaleString()}
                    </h6>
                    <h5>Winner: {game?.winner}</h5>
                  </div>
                </div>
                <div className="right">
                  <Link
                    to={`/game-log/${game.id}`}
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
