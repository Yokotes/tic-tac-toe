import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './client.css'
import App from './components/App/App'
import {gameStore} from './redux/gameStore'
import * as socket from 'socket.io-client'

// Connect to server
const client = socket.io().connect('ws://localhost:3000')

ReactDOM.render(
    <Provider store={ gameStore }>
        <App client = {client}/>
    </Provider>,
    document.getElementById('root')
)