import "./App.css"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/login/LoginPage"
import GamePage from "./pages/game/GamePage"
import LogPage from "./pages/log/LogPage"
import HistoryPage from "./pages/history/HistoryPage"
import { useSelector } from "react-redux"
import RegisterPage from "./pages/register/RegisterPage"

function App() {
  const { isAuthenticated } = useSelector((state) => state.user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/game"
            element={isAuthenticated ? <GamePage /> : <Navigate to="/" />}
          />
          <Route
            path="/games"
            element={isAuthenticated ? <HistoryPage /> : <Navigate to="/" />}
          />
          <Route
            path="/game-log/:id"
            element={isAuthenticated ? <LogPage /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
