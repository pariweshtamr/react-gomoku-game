import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/login/LoginPage"
import GamePage from "./pages/game/GamePage"
import LogPage from "./pages/log/LogPage"
import HistoryPage from "./pages/history/HistoryPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/logs" element={<LogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
