import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import './Monthly.css'
import TaskRow from './TaskRow'
import moment from 'moment'
import {getAllTasks, createDates, getDates} from '../store'
import { connect } from 'react-redux';
import axios from 'axios'

const userId = 1


const today = moment()
const month = String(today._d).split(' ')[1]
const year = 2018

const ObjCreator = (month, year, monthLength) => {
    let datesArr = []
    for (let i = 0; i< monthLength; i++) {
        let newDay = {
            dayNum: i+1,
            month: month,
            year: year
        }
        datesArr.push(newDay)
    }
    return datesArr
}
const daysInMonth = {
    Jan: 31,
    Feb: 28,
    Mar: 31,
    Apr: 30,
    May: 31,
    Jun: 30,
    Jul: 31,
    Aug: 31,
    Sep: 30,
    Oct: 31,
    Nov: 30,
    Dec: 31
}
const newMonth = ObjCreator(month, year, 31)

const reqObj = {arr: newMonth}

class Monthly extends Component {
    constructor () {
        super();
    }

    async componentDidMount () {
        await this.props.getTasks(userId)
        await this.props.getDates({month: month, year: year})
        if(this.props.days.length === 0) {
        await this.props.createDates(reqObj)
        //await axios.post('http://localhost:8080/api/status', {tasks: this.props.tasks, dates: this.props.days})
        await axios.post('https://habit-tracker-api-sharf.herokuapp.com/api/status', {tasks: this.props.tasks, dates: this.props.days})
        }
    }

    render() {
        if(this.props.tasks && this.props.days) {
            this.props.tasks.sort(function(a,b) {
                return a.id - b.id
            })
            return (
                <div>
                    <h1>Monthly Tracker</h1>
                        <TaskRow tasks = {this.props.tasks} days = {this.props.days} /> 
                </div>
            )
        } else {
            return null
        }
    }
}


const mapState = state => {
    return {
        tasks: state.task.allTasks,
        days: state.date.dates
    }
}

const mapDispatch = dispatch => {
    return {
        getTasks: (userId) => dispatch(getAllTasks(userId)),
        createDates: (reqObj) => dispatch(createDates(reqObj)),
        getDates: (reqObj)=> dispatch(getDates(reqObj))
    }
}

export default connect(mapState, mapDispatch)(Monthly)
//num of days in month
//tasks
//days where task is true

//mapDispatchToProps
//thunks i need to retrieve data

