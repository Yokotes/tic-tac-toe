import React from 'react'
import styles from './Button.module.css'

const Button = ({ isShow, onClick, type, children }) => {

    const classNames = `${styles.button} ${!isShow ? styles.hidden : null}`

    return (
        <button className={classNames} onClick={onClick} type={type}>
            { children }
        </button>
    )
}

export default Button