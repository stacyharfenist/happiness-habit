import axios from 'axios'

//action types

const GOT_ALL_TASKS = 'GOT_ALL_TASKS'
const RANKED_TASKS = 'RANKED_TASKS'

//action creators

const gotAllTasks = taskArr => ({
    type: GOT_ALL_TASKS,
    taskArr
})

const rankedTasks = taskArr => ({
    type: RANKED_TASKS,
    taskArr
})

//thunks

export const getAllTasks = userId => {
    return async dispatch => {
        const {data} = await axios.get(`https://habit-tracker-api-sharf.herokuapp.com/api/task/${userId}`)
        //const {data} = await axios.get(`http://localhost:8080/api/task/${userId}`)
        dispatch(gotAllTasks(data))
    }
}

export const rankTasks = (allTasks) => {
    allTasks.sort(function(a,b) {
        return b.score - a.score
    })
    return dispatch => {
        dispatch(rankedTasks(allTasks))
    }
}

const initialState = {
    allTasks: [],
    topTasks: []
}

const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_ALL_TASKS:
        return {...state, allTasks: action.taskArr}
        case RANKED_TASKS: 
        return {...state, topTasks: action.taskArr}
        default:
        return state
    }
}

export default taskReducer