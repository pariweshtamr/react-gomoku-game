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
    loginSuccess: (state, { payload }) => {
      state.isLoading = false
      state.user = payload
      state.isAuthenticated = true
      sessionStorage.setItem("isAuthenticated", true)
    },
    logoutSuccess: (state, { payload }) => {
      state.isAuthenticated = payload
      sessionStorage.removeItem("isAuthenticated")
    },
  },
})

const { reducer, actions } = userSlice

export const { requestPending, loginSuccess, logoutSuccess } = actions

export default reducer
