import React, { Component } from 'react';
import { Provider } from "react-redux";
import {Main} from './routes'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {BrowserRouter as Router} from 'react-router-dom'
import SimpleAppBar from './component/navbar'
import SimpleBottomNavigation from './component/bottombar'
import './component/styles.css'
import {danger,success} from "./constants/color";
import store from './store/index'
import {isMobile} from 'react-device-detect';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from 'material-ui/styles';



const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: false,
    productionPrefix: 'c',
});
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: success,
            dark: success,
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: danger,
            dark: '#88dba3',
            contrastText: '#88dba3',
        },
    },
    error: {
        "500":danger
    },
    shape:{
        borderRadius: 4
    }

});
class App extends Component {

    componentDidMount(){
        if(!isMobile){
            let g = document.createElement('div');
            g.setAttribute("id", "background");
            document.getElementsByTagName('body')[0].appendChild(g)
            const root = document.getElementById('root').style
            const body = document.getElementsByTagName('body')[0].style
            root.minHeight = (window.outerHeight - 56)+"px"
            root.maxWidth ="500px"
            root.backgroundColor = "white"
            root.width = "100%"
            root.zIndex = "1"
            body.display = "flex"
        }
    }

    render() {
        return (

            <Provider store={store}>
                <div>
                    <Router>
                        <JssProvider generateClassName={generateClassName}>
                            <MuiThemeProvider theme={theme} >
                                <SimpleAppBar/>
                                <Main/>
                                <SimpleBottomNavigation/>
                            </MuiThemeProvider>
                        </JssProvider>
                    </Router>
                </div>

            </Provider>

        );
    }
}

export default App;
