import React, { Component } from 'react';
import axios from 'axios'


class TaskBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = async () => {
        const newStat = await axios.post(`https://habit-tracker-api-sharf.herokuapp.com/api/status/update/${this.props.day.id}/${this.props.taskId}`)
        //const newStat = await axios.post(`http://localhost:8080/api/status/update/${this.props.day.id}/${this.props.taskId}`)
        this.setState({status: newStat.data.status})
    }

    async componentDidMount () {
        const status = await axios.get(`https://habit-tracker-api-sharf.herokuapp.com/api/status/${this.props.day.id}/${this.props.taskId}`)
        //const status = await axios.get(`http://localhost:8080/api/status/${this.props.day.id}/${this.props.taskId}`)
        this.setState({status: status.data})
    }
    render() {
        if(this.state.status) {
            return (
                <button id = 'true' onClick = {this.handleClick}>{this.props.day.dayNum}</button>
        )
        } else {
            return (
                <button id = 'false' onClick = {this.handleClick}>{this.props.day.dayNum}</button>
            )
        }
    }
  }

  export default TaskBox