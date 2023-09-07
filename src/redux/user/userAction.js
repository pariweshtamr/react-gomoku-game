import { toast } from "react-hot-toast"
import userAPI from "../../api/userApi"
import { getUserSuccess, loginSuccess, requestPending } from "./userSlice"

export const getUserAction = () => async (dispatch) => {
  dispatch(requestPending())
  try {
    const { status, user } = await userAPI.getUser()

    status === "success"
      ? dispatch(getUserSuccess(user))
      : dispatch(getUserSuccess())
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}
export const loginAction = (formData) => async (dispatch) => {
  dispatch(requestPending())
  try {
    const { status, message, accessToken } = await userAPI.loginUser(formData)
    status === "success"
      ? dispatch(loginSuccess(accessToken)) && dispatch(getUserAction())
      : dispatch(loginSuccess()) && toast.error(message)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}
