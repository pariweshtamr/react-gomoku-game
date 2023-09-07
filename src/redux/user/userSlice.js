import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  isAuthenticated: sessionStorage.getItem("isAuthenticated")
    ? JSON.parse(sessionStorage.getItem("isAuthenticated"))
    : false,
  user: {},
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },
    getUserSuccess: (state, { payload }) => {
      state.isLoading = false
      state.user = payload
    },
    loginSuccess: (state, { payload }) => {
      state.isLoading = false
      state.isAuthenticated = true
      sessionStorage.setItem("isAuthenticated", true)
      sessionStorage.setItem("accessToken", payload)
    },
    logoutSuccess: (state, { payload }) => {
      state.isAuthenticated = payload
      state.user = {}
      sessionStorage.removeItem("isAuthenticated")
      sessionStorage.removeItem("accessToken")
    },
  },
})

const { reducer, actions } = userSlice

export const { requestPending, loginSuccess, logoutSuccess, getUserSuccess } =
  actions

export default reducer
