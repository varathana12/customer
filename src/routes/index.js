import React from 'react'
import Home from '../screens/home'
import { Route} from 'react-router-dom'
import History from '../screens/history'
import Profile from '../screens/profile'
import BookingRequest from '../screens/booking_request'
import Introduce_Request from '../screens/introduce_request'
import {PREFIX} from "../constants/variable";

export const Main = () => (

    <div>
        <Route exact path={PREFIX+"customer(|/Booking)"} component={Home}/>
        <Route exact path={PREFIX+"customer/History"} component={History}/>
        <Route exact path={PREFIX+"customer/Profile"} component={Profile}/>
        <Route exact path={PREFIX+"customer/Request"} component={BookingRequest}/>
    </div>

)
