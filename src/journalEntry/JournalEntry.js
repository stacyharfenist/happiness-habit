import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import './journal.css'
import {rankTasks, getAllTasks} from '../store'
import { connect } from 'react-redux'

const userId = 1

const today = moment()
const day = String(today._d).split(' ')[2]
const month = String(today._d).split(' ')[1]
const year = String(today._d).split(' ')[3]

const getTodaysId = async (day, month, year) => {
    const today = await axios.get(`http://localhost:8080/api/date/${day}/${month}/${year}`)
    //const today = await axios.get(`https://habit-tracker-api-sharf.herokuapp.com/api/date/${day}/${month}/${year}`)
    return today.data[0].id
}

class JournalEntry extends Component {
    constructor() {
        super();
        this.state = {
            entry: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange = event => {
        this.setState({entry: event.target.value})
    }
    handleSubmit = async event => {
        event.preventDefault()
        const todaysId = await getTodaysId(day, month, year)
        const done = await axios.post('http://localhost:8080/api/journal', {userId: userId, dateId: todaysId, text: this.state.entry})
        //const done = await axios.post('https://habit-tracker-api-sharf.herokuapp.com/api/journal', {userId: userId, dateId: todaysId, text: this.state.entry})
        const happyOrSad = done.data
        alert('Your Journal Entry has been saved!')
        this.setState({entry: ''})
        const stati = await axios.get(`http://localhost:8080/api/status/${todaysId}`)
        //const stati = await axios.get(`https://habit-tracker-api-sharf.herokuapp.com/api/status/${todaysId}`)
        const filtered = stati.data.filter(status => status.status === true)
        // await filtered.map(async task => {
        //     await axios.post(`http://localhost:8080/api/task/${task.taskId}/${happyOrSad}`)
        //     console.log('task updated', task)
        //     //await axios.post(`https://habit-tracker-api-sharf.herokuapp.com/api/task/${task.taskId}/${happyOrSad}`)
        //  })
        for (const task of filtered) {
            await axios.post(`http://localhost:8080/api/task/${task.taskId}/${happyOrSad}`)
        }
        await this.props.getTasks(userId)
        console.log('THIS.PROPS.TASKS', this.props.tasks)
        await this.props.rankTasks(this.props.tasks) 
    }
    render() {
        return (
            <div>
            <h3>How was your day?</h3>
            <form onSubmit = {this.handleSubmit} id = 'journalbox'>
                <textarea id ='textarea' cols = "50" rows = "6"
                onChange = {this.handleChange} value = {this.state.entry}>
                </textarea>
                <button type = 'submit' id= 'submit'>Add to Journal</button>
            </form>   
            </div> 
        )
    }

}

const mapState = state => {
    return {
        tasks: state.task.allTasks,
        userId: state.user.userId
    }
}

const mapDispatch = dispatch => {
    return {
        getTasks: (userId) => dispatch(getAllTasks(userId)),
        rankTasks: (allTask) => dispatch(rankTasks(allTask))
    }
}

export default connect(mapState, mapDispatch)(JournalEntry)
