import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './GameModal.module.css'
import Button from '../../components/Button/Button'
import { changeVisibility } from '../../redux/slices/gameModalSlice'
import { Link } from 'react-router-dom'
import { changeRoomId } from '../../redux/slices/gameRoomSlice'

const GameModal = ({client}) => {
    const visibility = useSelector(state => state.gameModal.visibility)
    const content = useSelector(state => state.gameModal.content)
    const dispatch = useDispatch()

    return (
        <>
            <div className={`${styles.modal} ${ visibility ? styles.showed : null}`}>
                
                {/* Title */}
                <h3 className={styles.title}>
                    {content.title}
                </h3>
                
                {/* Form */}
                <form>
                    
                    {/* Input */}
                    <label htmlFor="id-input" className={styles.label}>Room ID:</label>
                    <input type="text" className={styles.input} id="id-input" required/>

                    {/* Buttons */}
                    <div className={styles.btns}>

                        {/* Submit button */}
                        <Link to="/game">
                            <Button isShow={true} type={'submit'} onClick={() => {
                                // e.preventDefault()
                                const roomId = document.getElementById('id-input').value

                                dispatch(changeVisibility({ visibility: false }))
                                dispatch(changeRoomId({ roomId }))
                            }}>
                                Play
                            </Button>
                        </Link>

                        {/* Cancel button */}
                        <Button isShow={true}  onClick={(e) => {
                            dispatch(changeVisibility({ visibility: false }))
                            e.preventDefault()
                        }}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default GameModal