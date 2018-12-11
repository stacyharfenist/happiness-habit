import React, { Component } from 'react';
import TaskBox from './TaskBox'



const TaskRow = props => {
  return (
    props.tasks.map(task=> {
      return (
      <div key = {task.id}>
      <h3>{task.name}</h3>
      {props.days.map(day => {
        return(
          <TaskBox day = {day} taskId = {task.id} key = {day.id}/>
        )
      })}
      </div>
      )
    })
  )
}
      


export default TaskRow