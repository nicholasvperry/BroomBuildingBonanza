import { Grommet } from 'grommet'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import { Nutshell } from './components/Nutshell'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
  <Grommet>
  <Router>
  <Nutshell />
  </Router>
  </Grommet>
  </React.StrictMode>
  , document.getElementById('root'))

