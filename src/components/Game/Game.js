import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GameTable from '../GameTable/GameTable'
import Button from '../Button/Button'
import styles from './Game.module.css'
import GameHistory from '../GameHistory/GameHistory'
import { addNewItem } from '../../redux/slices/gameHistorySlice'
import { changeState } from '../../redux/slices/gameStateSlice'
import { changePlayer } from '../../redux/slices/currentPlayerSlice'
import { restartTable } from '../../redux/slices/gameTableSlice'

let once = true

const Game = ({client}) => {
    const gameState = useSelector(state => state.gameState)
    const player = useSelector(state => state.player.player)
    const text = gameState.value === 'Play' ? 'Current player: ' + player : 'Winner: ' + gameState.winner
    const winner = useSelector(state => state.gameState.winner)
    const roomId = useSelector(state => state.gameRoom.roomId)
    const content = useSelector(state => state.gameModal.content)
    const dispatch = useDispatch()

    // Add new item to history and update game table
    useEffect(()=> {
        if (once) {
            client.emit(content.messageType, roomId)
            once = false
        }

        // Win
        if (gameState.value === 'Win') {
            const time = new Date(Date.now()).toLocaleTimeString()
    
            dispatch(addNewItem({ winner, time }))
            dispatch(changeState({ value: 'Stopped', winner }))
            dispatch(changePlayer())
        }

        // Tie
        if (gameState.value === 'Tie') {
            const time = new Date(Date.now()).toLocaleTimeString()

            dispatch(addNewItem({ winner, time }))
            dispatch(changeState({ value: 'Stopped', winner }))
            dispatch(changePlayer())
        }
    })

    // client.connect('ws://localhost:3000/game')


    return (
        <>
            <div className={styles.container}>

                {/* Text */}
                <div className={styles.info}>{ text }</div>

                {/* Game table */}
                <GameTable client={client}/>

                {/* Restart button */}
                <Button isShow={gameState.winner} onClick={()=> {
                    dispatch(restartTable())
                    dispatch(changeState({ value: 'Play', winner: null }))
                    client.emit('hasPlay', player, roomId)
                }}>Restart</Button>

                {/* Game history */}
                <GameHistory />
            </div>
        </>
    )
}

export default Game