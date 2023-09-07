import { requestApi } from "./requestHandler"

const rootUrl = process.env.REACT_APP_API_URL
const gameEp = rootUrl + "/game"

const gameAPI = {
  setGame: async (obj) => {
    const axiosData = {
      url: gameEp,
      method: "POST",
      data: obj,
    }
    const data = await requestApi(axiosData, true)
    return data
  },
  updateGame: async (obj) => {
    const axiosData = {
      url: gameEp,
      method: "PATCH",
      data: obj,
    }
    const data = await requestApi(axiosData, true)
    return data
  },
  getGames: async () => {
    const axiosData = {
      url: gameEp,
      method: "GET",
    }
    const data = await requestApi(axiosData, true)
    return data
  },
  getSingleGame: async (id) => {
    const axiosData = {
      url: `${gameEp}/${id}`,
      method: "GET",
    }
    const data = await requestApi(axiosData, true)
    return data
  },
  deleteGame: async (id) => {
    const axiosData = {
      url: `${gameEp}?id=${id}`,
      method: "DELETE",
    }
    const data = await requestApi(axiosData, true)
    return data
  },
}

export default gameAPI
