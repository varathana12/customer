import axios from 'axios'

axios.defaults.headers.common[window.headerName] = window.token;
axios.defaults.headers.common["ajax"] = "true";
