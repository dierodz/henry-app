import Header from 'components/Header/Header'
import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import Dashboard from './Dashboard';
import useStyles from './Admin.styles';
import NavBar from 'components/NavBar/NavBar';
import { useSelector } from 'react-redux';

function Admin() {
  const { authenticated } = useSelector((state) => state.auth);
  const { replace } = useHistory()
  const [show, setShow] = useState(false)
  const classes = useStyles(show)
  useEffect(() => { !authenticated && replace('/auth/signin') }, [authenticated])
  if (authenticated) return (
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
  return null
}

export default Admin
