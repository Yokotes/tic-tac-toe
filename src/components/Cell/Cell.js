import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Cell.module.css'
import { nextTurn } from '../../redux/slices/gameTableSlice'
import { changePlayer } from '../../redux/slices/currentPlayerSlice'

const Cell = props => {
    const dispatch = useDispatch();
    const currentPlayer = useSelector(state => state.player.player)
    const gameState = useSelector(state => state.gameState.value)

    return (
        <button className={styles.cell} onClick={()=> {
            if (props.children) return false
            if (gameState === 'Stopped') return false

            dispatch(nextTurn({ cell: props.id, value: currentPlayer }))
            dispatch(changePlayer())

            props.checkWin(props.id, currentPlayer)
            props.checkTie(props.id, currentPlayer)
            props.sendTable(props.id, currentPlayer)
        } }>
            { props.children }
        </button>
    )
}

export default Cell