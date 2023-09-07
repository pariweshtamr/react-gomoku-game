import gameAPI from "../../api/gameApi"
import {
  getGameSuccess,
  getGamesSuccess,
  getPreviousGameSuccess,
  requestPending,
  setGameSuccess,
} from "./gameSlice"

export const setGameAction = (obj) => async (dispatch) => {
  dispatch(requestPending())
  try {
    const { status, game } = await gameAPI.setGame(obj)

    status === "success"
      ? dispatch(setGameSuccess(game))
      : dispatch(setGameSuccess())
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const updateGameAction = (obj) => async (dispatch) => {
  dispatch(requestPending())
  try {
    const { status, game } = await gameAPI.updateGame(obj)
    status === "success"
      ? dispatch(setGameSuccess(game))
      : dispatch(setGameSuccess())
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const getAllGamesAction = () => async (dispatch) => {
  dispatch(requestPending())
  try {
    const { status, games } = await gameAPI.getGames()
    status === "success"
      ? dispatch(getGamesSuccess(games))
      : dispatch(getGamesSuccess())
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const getSingleGameAction = (id) => async (dispatch) => {
  dispatch(requestPending())
  try {
    const { status, game } = await gameAPI.getSingleGame(id)

    status === "success"
      ? dispatch(getGameSuccess(game))
      : dispatch(getGameSuccess())
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}
export const getPreviousGameAction = (id) => async (dispatch) => {
  dispatch(requestPending())
  try {
    const { status, game } = await gameAPI.getSingleGame(id)

    status === "success"
      ? dispatch(getPreviousGameSuccess(game))
      : dispatch(getPreviousGameSuccess())
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const deleteIncompleteGameAction = (id) => async (dispatch) => {
  dispatch(requestPending())
  try {
    const { status } = await gameAPI.deleteGame(id)

    status === "success" && dispatch(setGameSuccess({}))
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}
