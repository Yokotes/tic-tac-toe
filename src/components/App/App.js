import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Game from '../Game/Game'
import MainMenu from '../MainMenu/MainMenu'

const App = ({ client }) => {

    return (
        <>
            <Router>
                <Switch>
                    
                    {/* Main menu */}
                    <Route path="/" exact>
                        <MainMenu client={client}/>
                    </Route>

                    {/* Game */}
                    <Route path="/game">
                        <Game client={client}/>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default App