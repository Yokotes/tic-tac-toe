import { createSlice } from '@reduxjs/toolkit'

const currentPlayerSlice = createSlice({
    name: 'currentPlayer',
    initialState: {
        player: 'X'    
    },
    reducers: {
        changePlayer: state => {
            if (state.player === 'X') state.player = 'O'
            else state.player = 'X'
        },

        setPlayer: (state, action) => {
            state.player = action.payload.player
        }
    }
})

export const { changePlayer, setPlayer } = currentPlayerSlice.actions

export default currentPlayerSlice.reducer