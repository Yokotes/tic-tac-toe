import { createSlice } from '@reduxjs/toolkit'

const gameRoomSlice = createSlice({
    name: 'gameRoom',
    initialState: {
        roomId: null
    },
    reducers: {
        changeRoomId: (state, action) => {
            state.roomId = action.payload.roomId
        }
    }
})

export const { changeRoomId } = gameRoomSlice.actions

export default gameRoomSlice.reducer