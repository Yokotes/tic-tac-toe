import { createSlice } from '@reduxjs/toolkit'

const gameModalSlice = createSlice({
    name: 'gameModal',
    initialState: {
        visibility: false,
        content: {
            title: 'Create game',
            messageType: 'initGame'
        } 
    },
    reducers: {
        changeVisibility: (state, action) => {
            state.visibility = action.payload.visibility
        },

        changeModal: (state, action) => {
            state.content = action.payload.content
        }
    }
})

export const { changeVisibility, changeModal } = gameModalSlice.actions

export default gameModalSlice.reducer