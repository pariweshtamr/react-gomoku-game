import { requestApi } from "./requestHandler"

const rootUrl = process.env.REACT_APP_API_URL
const userEp = rootUrl + "/user"

const userAPI = {
  registerUser: async (obj) => {
    const axiosData = {
      url: userEp + "/register",
      method: "POST",
      data: obj,
    }
    const data = await requestApi(axiosData)
    return data
  },

  loginUser: async (obj) => {
    const axiosData = {
      url: userEp + "/login",
      method: "POST",
      data: obj,
    }
    const data = await requestApi(axiosData)
    return data
  },

  getUser: async () => {
    const axiosData = {
      url: userEp,
      method: "GET",
    }
    const data = await requestApi(axiosData, true)
    return data
  },
}

export default userAPI
