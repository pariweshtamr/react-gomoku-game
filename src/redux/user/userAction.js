import { toast } from "react-hot-toast"
import userAPI from "../../api/userApi"
import { loginSuccess, requestPending } from "./userSlice"

export const loginAction = (formData) => async (dispatch) => {
  dispatch(requestPending())
  try {
    const { status, message, user } = await userAPI.loginUser(formData)
    status === "success"
      ? dispatch(loginSuccess(user))
      : dispatch(loginSuccess()) && toast.error(message)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}
