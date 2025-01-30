import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface CounterState {
    _id: string,
    name: string,
    email: string,
    profile_pic: string,
    token: string,

}

// Define the initial state using that type
const initialState: CounterState = {
    _id: '',
    name: '',
    email: '',
    profile_pic: '',
    token: ''

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
        // logout: (state)=>{
        //     state._id = ''
        //     state.name = ''
        //     state.email = ''
        //     state.profile_pic = ''
        //     state.token = ''
        // }
        logout: () => initialState

    }
})

export const { setUser, setToken, logout } = userSlice.actions

export default userSlice.reducer