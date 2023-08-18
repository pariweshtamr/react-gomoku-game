import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  isAuthenticated: sessionStorage.getItem("isAuthenticated")
    ? JSON.parse(sessionStorage.getItem("isAuthenticated"))
    : false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestPending: (state) => {
      state.isLoading = true
    },
    loginSuccess: (state, { payload }) => {
      state.isAuthenticated = payload
      sessionStorage.setItem("isAuthenticated", payload)
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
