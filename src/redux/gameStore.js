import { configureStore } from '@reduxjs/toolkit'
import gameModalSlice from './slices/gameModalSlice'
import currentPlayerSlice from './slices/currentPlayerSlice'
import gameHistorySlice from './slices/gameHistorySlice'
import gameStateSlice from './slices/gameStateSlice'
import gameTableSlice from './slices/gameTableSlice'
import gameRoomSlice from './slices/gameRoomSlice'

export const gameStore = configureStore({
    reducer: {
        table: gameTableSlice,
        player: currentPlayerSlice,
        gameState: gameStateSlice,
        history: gameHistorySlice,
        gameModal: gameModalSlice,
        gameRoom: gameRoomSlice
    }
})