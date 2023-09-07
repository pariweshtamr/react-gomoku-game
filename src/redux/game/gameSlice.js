import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  games: [],
  game: {},
  previousGame: {},
  isLoading: false,
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },
    setGameSuccess: (state, { payload }) => {
      state.isLoading = false
      state.game = payload
    },
    getGamesSuccess: (state, { payload }) => {
      state.isLoading = false
      state.games = payload
    },
    getGameSuccess: (state, { payload }) => {
      state.isLoading = false
      state.game = payload
    },
    getPreviousGameSuccess: (state, { payload }) => {
      state.isLoading = false
      state.previousGame = payload
    },
  },
})

const { reducer, actions } = gameSlice

export const {
  setGameInfo,
  setGameSuccess,
  requestPending,
  getGamesSuccess,
  getGameSuccess,
  getPreviousGameSuccess,
} = actions

export default reducer
