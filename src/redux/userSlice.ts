import { createSlice } from '@reduxjs/toolkit'
import { Socket } from "socket.io-client";


// Define a type for the slice state
export interface UserState {
    _id: string,
    name: string,
    email: string,
    profile_pic: string,
    token: string,
    onlineUser?: string,
    socketConnection?: Socket | null

}

// Define the initial state using that type
const initialState: UserState = {
    _id: '',
    name: '',
    email: '',
    profile_pic: '',
    token: '',
    socketConnection: null
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.profile_pic = action.payload.profile_pic

        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        logout: () => initialState,
        setOnlineUser: (state, action) => {
            state.onlineUser = action.payload
        },
        setSocketConnection: (state, action)=>{
            state.socketConnection = action.payload
        }

    }
})

export const { setUser, setToken, logout, setOnlineUser, setSocketConnection } = userSlice.actions

export default userSlice.reducer