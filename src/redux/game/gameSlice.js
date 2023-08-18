import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  games: JSON.parse(localStorage.getItem("gamesState"))
    ? JSON.parse(localStorage.getItem("gamesState"))
    : [],
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameInfo: (state, { payload }) => {
      state.games.push(payload)
      localStorage.setItem("gamesState", JSON.stringify(state.games))
    },
  },
})

const { reducer, actions } = gameSlice

export const { setGameInfo } = actions

export default reducer
