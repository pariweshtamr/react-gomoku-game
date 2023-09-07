import axios from "axios"

export const requestApi = async (axiosInfo, sendAuth) => {
  try {
    if (sendAuth) {
      axiosInfo = {
        ...axiosInfo,
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      }
    }
    const { data } = await axios(axiosInfo)
    return data
  } catch (error) {
    if (error.response?.status === 401) {
      return { status: "error", message: "logout user!" }
    }

    return error.response.data || { status: "error", message: error.message }
  }
}
