import React from 'react'
import Button from '../Button/Button'
import styles from './MainMenu.module.css'
import GameModal from '../../modals/GameModal/GameModal'
import { changeModal, changeVisibility } from '../../redux/slices/gameModalSlice'
import { useDispatch } from 'react-redux'

const MainMenu = ({client}) => {
    const dispatch = useDispatch()

    const showGameModal = (content) => {
        dispatch(changeModal({content}))
        dispatch(changeVisibility({
            visibility: true
        }))
    }

    return (
        <>
            <div className={styles.container}>

                {/* Title */}
                <h1 className={styles.title}>
                    Tic-Tac-Toe
                </h1>

                {/* Buttons container */}
                <div className={styles.btns}>

                    {/* Start game button */}
                    <Button isShow={true} onClick={() => showGameModal({
                        title: 'Create game',
                        messageType: 'createRoom'
                    })}>
                        Start Game
                    </Button>

                    {/* Connect button */}
                    <Button isShow={true} onClick={() => showGameModal({
                        title: 'Connect to game',
                        messageType: 'connectToRoom'
                    })}>
                        Connect
                    </Button>
                </div>

                {/* Modals */}
                <GameModal client={client}/>
            </div>
        </>
    )
}

export default MainMenu