import React from "react"


class Layout extends React.Component{
    render(){
        const {children} = this.props
        const {container} = style
        return(
            <div style={container}>
                {children}
            </div>
        )
    }
}
export default Layout

var style = {
    container:{
        marginTop:65,
        marginBottom:80,
        marginLeft:20,
        marginRight:20
    },
}