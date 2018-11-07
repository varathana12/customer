import React from "react"
import ProfileInfo from '../component/profile_info'
import {connect} from 'react-redux'
import {profile} from "../api";
import {studentInfo} from "../actions";

class Home extends React.Component{
    state={
        data:{}
    }
    componentDidMount(){
        const {student_info,studentInfo} =this.props
        if(!(student_info.email)){
            profile().then(res=>{
                studentInfo(res)
            })
        }


    }
    render(){
        const {student_info} =this.props
        return(
            <ProfileInfo data={student_info}/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        studentInfo:data=>(dispatch(studentInfo(data)))
    }
}
const mapStateToProps =state =>{
    return {
        student_info:state.student_info
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);