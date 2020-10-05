import Header from 'components/Header/Header'
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import useStyles from './Admin.styles';
import NavBar from 'components/NavBar/NavBar';

function Admin() {
  const [show, setShow] = useState(false)
  const classes = useStyles(show)
  return (
    <div>
      <Header handleShowMenu={() => setShow(!show)} />
      <NavBar show={show} />
      <main className={classes.content}>
        <Switch>
          <Route exact path="/admin" component={Dashboard} />
        </Switch>
      </main>
    </div>
  )
}

export default Admin
