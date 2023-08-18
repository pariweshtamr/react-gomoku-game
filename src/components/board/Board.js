import { useCallback, useState } from "react"
import Square from "../square/Square"
import "./board.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setGameInfo } from "../../redux/game/gameSlice"
import { v4 as uuidv4 } from "uuid"

const Board = ({ boardSize, storedGame }) => {
  const dispatch = useDispatch()
  const [isWhite, setIsWhite] = useState(true)
  const [winner, setWinner] = useState("")
  const [isFinished, setIsFinished] = useState(false)
  const navigate = useNavigate()
  const [grid, setGrid] = useState(
    Array(boardSize)
      .fill()
      .map((x) => Array(boardSize).fill("+"))
  )

  const checkWin = useCallback(
    (x, y, color) => {
      const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
      ]
      for (const [dx, dy] of directions) {
        let count = 0
        let _x = x
        let _y = y
        while (
          _x >= 0 &&
          _x < boardSize &&
          _y >= 0 &&
          _y < boardSize &&
          grid[_x][_y] === color
        ) {
          count++
          _x += dx
          _y += dy
        }
        _x = x - dx
        _y = y - dy
        while (
          _x >= 0 &&
          _x < boardSize &&
          _y >= 0 &&
          _y < boardSize &&
          grid[_x][_y] === color
        ) {
          count++
          _x -= dx
          _y -= dy
        }
        if (count >= 5) {
          setIsFinished(true)
          return true
        }
      }
      return false
    },
    [boardSize, grid]
  )

  const handleClick = useCallback(
    (x, y) => {
      if (grid[x][y] === "+") {
        const newGrid = [...grid]
        newGrid[x][y] = isWhite ? "w" : "b"
        setGrid(newGrid)
        setIsWhite(!isWhite)

        // Game logic for checking wins
        if (checkWin(x, y, isWhite ? "w" : "b")) {
          setIsFinished(true)
          setWinner(isWhite ? "White" : "Black")
          dispatch(
            setGameInfo({
              id: uuidv4(),
              winner: isWhite ? "White" : "Black",
              date: new Date(),
              boardState: grid,
              size: boardSize,
            })
          )
        }
      }
    },
    [grid, isWhite, checkWin, dispatch, boardSize]
  )

  const handleReset = useCallback(() => {
    const newGrid = Array(boardSize)
      .fill()
      .map((x) => Array(boardSize).fill("+"))
    setGrid(newGrid)
    setIsWhite(true)
    setWinner("")
    setIsFinished(false)
  }, [boardSize])

  const handleLeave = () => {
    if (!isFinished) {
      navigate("/")
    } else {
      navigate("/games")
    }
  }

  return (
    <div
      style={{ textAlign: "center" }}
      className="d-flex flex-column gap-3 justify-content-center align-items-center"
    >
      {storedGame?.id ? (
        <>
          <h5>Winner: {storedGame.winner}</h5>
        </>
      ) : (
        <>
          {winner ? (
            <h5>Winner: {winner}</h5>
          ) : (
            <h5 className="text-center pb-2">
              Current Player: {isWhite ? "White" : "Black"}
            </h5>
          )}
        </>
      )}

      <div style={{ margin: "auto", width: "40%" }}>
        {storedGame?.boardState ? (
          <table cellSpacing={0}>
            <tbody>
              {storedGame.boardState?.map((row, i) => (
                <tr key={"row_" + i}>
                  {row.map((col, j) => {
                    console.log(col)
                    const color =
                      col === "+" ? "#e4e4a1" : col === "w" ? "white" : "black"
                    return (
                      <Square
                        color={color}
                        status={isFinished}
                        key={i + "_" + j}
                      />
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table cellSpacing="0">
            <tbody>
              {grid.map((row, i) => (
                <tr key={"row_" + i}>
                  {row.map((col, j) => {
                    const color =
                      grid[i][j] === "+"
                        ? "#e4e4a1"
                        : grid[i][j] === "w"
                        ? "white"
                        : "black"
                    return (
                      <Square
                        handleClick={() => handleClick(i, j)}
                        status={isFinished}
                        color={color}
                        key={i + "_" + j}
                      />
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {storedGame?.id ? (
        <Link
          to="/games"
          className="global-btn px-4"
          style={{ width: "max-content" }}
        >
          Back
        </Link>
      ) : (
        <div
          className="d-flex justify-content-around m-auto"
          style={{ width: "50%" }}
        >
          <button
            className="global-btn px-4"
            onClick={handleReset}
            style={{ width: "max-content" }}
          >
            Restart
          </button>
          <button
            className="global-btn px-4"
            style={{ width: "max-content" }}
            onClick={handleLeave}
          >
            Leave
          </button>
        </div>
      )}
    </div>
  )
}
export default Board
