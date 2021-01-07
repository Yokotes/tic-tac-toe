import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { compose } from 'redux'
import { changePlayer, setPlayer } from '../../redux/slices/currentPlayerSlice'
import { changeState } from '../../redux/slices/gameStateSlice'
import { restartTable, updateTable } from '../../redux/slices/gameTableSlice'
import Cell from '../Cell/Cell'
import styles from './GameTable.module.css'

const GameTable = ({client}) => {
    const table = useSelector(state => state.table.table)
    const roomId = useSelector(state => state.gameRoom.roomId)
    const oldPlayer = useSelector(state => state.player.player)
    const dispatch = useDispatch()

    useEffect(()=>{
        client.on('newTable', (table, player) => {
            dispatch(updateTable({ table }))
            dispatch(setPlayer({ player }))
        })

        client.on('win', (winner) => {
            dispatch(changeState({ value: 'Win', winner }))
        })

        client.on('tie', () => {
            dispatch(changeState({ value: 'Tie', winner: 'Tie' }))
        })

        client.on('restart', (player) => {
            dispatch(changeState({ value: 'Play', winner: null }))
            dispatch(restartTable())
            dispatch(setPlayer({ player }))
        })
    })

    // Check winner
    const checkWin = (cellID, player) => {
        const localTable = [...table]
        if (cellID !== null) localTable[cellID] = player

        let winner = null

        // Check diagonal win
        if ( localTable[0] == player && 
            localTable[4] == player && 
            localTable[8] == player) 
            winner = player

        else if ( localTable[2] == player && 
            localTable[4] == player && 
            localTable[6] == player) 
            winner = player

        // Check vertical win
        else if ( localTable[0] == player && 
            localTable[3] == player && 
            localTable[6] == player) 
            winner = player

        else if ( localTable[1] == player && 
            localTable[4] == player && 
            localTable[7] == player) 
            winner = player

        else if ( localTable[2] == player && 
            localTable[5] == player && 
            localTable[8] == player) 
            winner = player

        // Check horizontal win
        else if ( localTable[0] == player && 
            localTable[1] == player && 
            localTable[2] == player) 
            winner = player

        else if ( localTable[3] == player && 
            localTable[4] == player && 
            localTable[5] == player) 
            winner = player

        else if ( localTable[6] == player && 
            localTable[7] == player && 
            localTable[8] == player) 
            winner = player

        // Changing game state
        if (winner) {
            dispatch(changeState({ value: 'Win', winner }))
            client.emit('hasWinner', winner, roomId)
        }
    }

    // Check tie
    const checkTie = (cellID, player) => {
        const localTable = [...table]
        if (cellID !== null) localTable[cellID] = player

        const hasNull = localTable.some( elem =>{
            return elem === null
        })

        if (!hasNull) {
            dispatch(changeState({ value: 'Tie', winner: 'Tie' }))
            client.emit('hasTie', roomId)
        }
    }

    // Send to server table
    const sendTable = (cellID, player) => {
        const localTable = [...table]
        localTable[cellID] = player

        const currentPlayer = player === 'X' ? 'O': 'X'

        client.emit('updateTable', localTable, currentPlayer, roomId)
    }

    return (
        <div className={styles.table}>
            { table.map((cell, id) => <Cell key={id} id={id} checkWin={checkWin} checkTie={checkTie} sendTable={sendTable}>
                {cell}
            </Cell>) }
        </div>
    )
}

export default GameTable