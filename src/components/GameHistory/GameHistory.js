import React from 'react'
import { useSelector } from 'react-redux'
import styles from './GameHistory.module.css'
import GameHistoryItem from './GameHistoryItem'

const GameHistory = props => {
    const history = useSelector(state => state.history.history)

    return (
        <div className={styles.history}>
            
            {/* Title */}
            <h2 className={styles.title}>Game History</h2>
            <hr />

            {/* History */}
            <div className={styles.container}>
                { history.map(elem => <GameHistoryItem winner={elem.winner} time={elem.time} key={elem.time} />) }
            </div>
        </div>
    )
}

export default GameHistory