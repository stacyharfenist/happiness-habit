import React, { Component } from 'react';
import axios from 'axios'
import styled from "styled-components"

const Button = styled.button`

background: ${props => props.primary? "gray" : "#20BDAD"};
color: "white";
height: 3em
width: 3em
font-size: .75em;
margin: .25em;
padding: .5em .5em;
border-radius: 80%
`;

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
                <Button onClick = {this.handleClick}>{this.props.day.dayNum}</Button>
        )
        } else {
            return (
                <Button primary onClick = {this.handleClick}>{this.props.day.dayNum}</Button>
            )
        }
    }
  }

  export default TaskBox