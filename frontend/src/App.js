import React, {useState, useEffect} from 'react';
import 'assets/css/App.css';
import {Link, Redirect, Route, Router, Switch} from "react-router-dom";
import Login from "./views/Login";
import Main from "./views/Main";
import axios from "axios";

function App() {
    const [userId, setUserId] = useState("");
    useEffect(()=>{
        axios.get('/api/v1/user').then(res => {
            setUserId(res.data.id);
        }).catch(err => {
            console.log(err);
        });
    })
    return (
      <>
          <Switch>
              <Route exact path="*">
                  {userId !== "" ? <Main userId={userId} /> : <Login />}
              </Route>
          </Switch>
      </>
    );
}

export default App;
