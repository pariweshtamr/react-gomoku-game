import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./redux/user/userSlice"
import gameReducer from "./redux/game/gameSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
  },
})

export default store
