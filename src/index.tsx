import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components/macro'
import { HelmetProvider } from 'react-helmet-async'
import { Theme } from 'themes'
import { PlayViewer, Menu } from 'components'

import './index.css'

ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={Theme}>
        <Router>
          <Switch>
            <Route path="/play/:playId/">
              <PlayViewer />
            </Route>
            <Route path="/">
              <Menu />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
)
