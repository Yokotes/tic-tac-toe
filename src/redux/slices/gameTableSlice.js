import { createSlice } from '@reduxjs/toolkit'

const gameTableSlice = createSlice({
    name: 'gameTable',
    initialState: {
        table: [
            null, null, null,
            null, null, null,
            null, null, null
        ]
    },
    reducers: {
        nextTurn: (state, action) => {
            state.table[action.payload.cell] = action.payload.value
        },

        restartTable: (state) => {
            state.table = [
                null, null, null,
                null, null, null,
                null, null, null
            ]
        },

        updateTable: (state, action) => {
            state.table = action.payload.table
        }
    }
})

export const { nextTurn, restartTable, updateTable } = gameTableSlice.actions

export default gameTableSlice.reducer