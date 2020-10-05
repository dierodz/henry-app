import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom';
import useStyles from './Admin.styles';
import { useSelector } from 'react-redux';

function Admin() {
  const { authenticated } = useSelector((state) => state.auth);
  const { replace } = useHistory()
  const [show, setShow] = useState(false)
  const classes = useStyles(show)
  //useEffect(() => { !authenticated && replace('/auth/signin') }, [authenticated])
  if (authenticated) return (
    <div>
      <main className={classes.content}>
        <Switch>
        </Switch>
      </main>
    </div>
  )
  return null
}

export default Admin
