import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {getAllTasks, rankTasks} from '../store'

class TaskList extends Component {
    async componentDidMount () {
        await this.props.getTasks(this.props.userId)
        const copy = this.props.tasks.slice()
        await this.props.rankTasks(copy)
    } 
    render() {
        if(this.props.rankedTasks) {
        //     const copy = this.props.tasks.slice()
        //   copy.sort(function (a, b) {
        //       return b.score - a.score
        //   })  
          return (
            <div>
                <h2>Habits ranked by Happiness</h2>
                    {this.props.rankedTasks.map(task => {
                        return (
                            <h4 key = {task.id}>{task.name}</h4>
                        )
                    })}
            </div>
          )
        }
    }
}

const mapState = state => {
    return {
        userId: state.user.userId,
        tasks: state.task.allTasks,
        rankedTasks: state.task.topTasks
    }
}

const mapDispatch = dispatch => {
    return {
        getTasks: (userId) => dispatch(getAllTasks(userId)),
        rankTasks: (taskArr) => dispatch(rankTasks(taskArr))
    }
}

export default connect(mapState, mapDispatch)(TaskList)