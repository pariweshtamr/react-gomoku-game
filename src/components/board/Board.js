import { useCallback, useEffect, useState } from "react"
import Square from "../square/Square"
import "./board.css"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {
  deleteIncompleteGameAction,
  updateGameAction,
} from "../../redux/game/gameAction"
import { setGameSuccess } from "../../redux/game/gameSlice"
import Swal from "sweetalert2"

const Board = ({ game, boardSize, storedGame }) => {
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
        dispatch(updateGameAction({ id: game?._id, boardState: newGrid }))

        // Game logic for checking wins
        if (checkWin(x, y, isWhite ? "w" : "b")) {
          setIsFinished(true)
          setWinner(isWhite ? "White" : "Black")
          dispatch(
            updateGameAction({
              id: game?._id,
              winner: isWhite ? "White" : "Black",
              boardState: grid,
              isComplete: true,
            })
          )
        }
      }
    },
    [grid, isWhite, checkWin, dispatch, game?._id]
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
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ffca2b",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Leave it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteIncompleteGameAction(game?._id))
        }
      })
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ffca2b",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Leave it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(setGameSuccess({})) && navigate("/games")
        }
      })
    }
  }

  useEffect(() => {
    !game?._id && !storedGame && navigate("/")
  }, [game?._id, navigate, storedGame])

  return (
    <div
      style={{ textAlign: "center", width: "50%", margin: "auto" }}
      className="d-flex flex-column gap-3 justify-content-center align-items-center"
    >
      {storedGame?._id ? (
        <>
          <h5>Winner: {storedGame?.winner}</h5>
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

      <div style={{ margin: "auto", width: "90%" }}>
        {storedGame?.boardState ? (
          <table cellSpacing={0}>
            <tbody>
              {storedGame?.boardState?.map((row, i) => (
                <tr key={"row_" + i}>
                  {row.map((col, j) => {
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

      {storedGame?._id ? (
        <Link
          to="/games"
          className="global-btn px-4"
          style={{ width: "max-content" }}
        >
          Back
        </Link>
      ) : (
        <div className="d-flex justify-content-around w-100">
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
