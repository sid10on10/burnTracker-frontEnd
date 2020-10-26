import React from "react";
// reactstrap components
import {
    Container,
    Button
  } from "reactstrap";

import { Route, Switch, Link } from "react-router-dom";
import Exercise from "./Exercise";
import Category from "./Category";
import Categoryexercise from "./CategoryExercise"
import Logs from "./Logs";


const Dashboard = (props)=>{
    
    const name = props.name

    return(
        <div className="content">
              <h2>Hello {name}</h2>
              <Container>
                    <div className="title">
                        <h3 className="mb-3">Dashboard</h3>
                        <Button tag={Link} to="/dashboard/exercise" className="btn-round" color="primary" type="button">
                            Exercise
                        </Button>
                        <Button tag={Link} to="/dashboard/category" className="btn-round" color="primary" type="button">
                            Category
                        </Button>
                    </div>
                
                    <Switch>
                        <Route exact path="/dashboard/exercise" render={props => <Exercise {...props} /> } />
                        <Route path="/dashboard/exercise/:exerciseid">
                                <Logs />
                        </Route>
                        <Route path="/dashboard/category/:categoryid">
                                <Categoryexercise />
                        </Route>
                        <Route
                            path="/dashboard/category"
                            render={props => <Category {...props} />}
                        />
                    </Switch>
                </Container>
        </div>
    )
}


export default Dashboard;