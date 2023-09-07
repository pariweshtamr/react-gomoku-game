import "./App.css"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/login/LoginPage"
import GamePage from "./pages/game/GamePage"
import LogPage from "./pages/log/LogPage"
import HistoryPage from "./pages/history/HistoryPage"
import { useDispatch, useSelector } from "react-redux"
import RegisterPage from "./pages/register/RegisterPage"
import { useEffect } from "react"
import { getUserAction } from "./redux/user/userAction"

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken")
    if (accessToken) {
      dispatch(getUserAction())
    }
  }, [dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/game/:id"
            element={user?._id ? <GamePage /> : <Navigate to="/" />}
          />
          <Route
            path="/games"
            element={user?._id ? <HistoryPage /> : <Navigate to="/" />}
          />
          <Route
            path="/game-log/:id"
            element={user?._id ? <LogPage /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
