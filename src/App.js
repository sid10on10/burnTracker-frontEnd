import React,{useState} from "react";
import { Route, Switch,Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import RegisterPage from "views/RegisterPage.js";
import LoginPage from "views/LoginPage.js";
import ProfilePage from "views/ProfilePage.js";
import ForgotPage from "views/ForgotPage.js";
import ResetPage from "views/ResetPage.js";
import IndexNavbar from "./components/Navbars/IndexNavbar.js";
import Footer from "./components/Footer/Footer.js";
import LogoutPage from "views/LogoutPage.js"

const App = ()=>{

    const [isLoggedIn,setIsLoggedIn] = useState(false)

    return (
        <>
        <IndexNavbar IsLoggedIn={isLoggedIn}/>
        <Switch>
            <Route exact path="/" render={props => <Index {...props} /> } />
            <Route
                path="/register"
                render={props => <RegisterPage {...props} />}
            />
            <Route
                path="/login"
                render={()=>(<LoginPage setIsLoggedIn={setIsLoggedIn}/>)}  />}
            />
            <Route
                path="/dashboard"
                render={() => <ProfilePage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/forgot_password" component={ForgotPage} />
            <Route path="/logout" render={()=>(<LogoutPage setIsLoggedIn={setIsLoggedIn}/>)}  />
            <Route path="/reset/:userid/:reset_token" component={ResetPage}/>
            <Redirect from="/blk-design-system-react" to="/" />
        </Switch>
        <Footer />
        </>
    )
}

export default App;