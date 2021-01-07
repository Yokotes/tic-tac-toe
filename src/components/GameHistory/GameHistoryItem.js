import React from 'react'
import styles from './GameHistory.module.css'

const GameHistoryItem = props => {
    const text = props.winner !== 'Tie' ? `Winner: ${props.winner}` : `Tie`

    return (
        <div className={styles.item}>

            {/* Winner */}
            <div className={styles.winner}>
                {text}
            </div>

            {/* Time */}
            <div className={styles.time}>
                {props.time}    
            </div> 
        </div> 
    )
}

export default GameHistoryItem