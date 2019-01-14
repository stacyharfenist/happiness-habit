import axios from 'axios'

//action types
const SET_DATES = 'SET_DATES'

//action creators

const setDates = datesArr => ({
    type: SET_DATES,
    datesArr
})

//thunks

export const createDates = reqObj => {
    return async dispatch => {
        //const datesArr = await axios.post('http://localhost:8080/api/date', reqObj)
        const datesArr = await axios.post('https://habit-tracker-api-sharf.herokuapp.com/api/date', reqObj)
        dispatch(setDates(datesArr.data))
    }
}

export const getDates = reqObj => {
    const month = reqObj.month
    const year = reqObj.year
    return async dispatch => {
        //const datesArr = await axios.get(`http://localhost:8080/api/date/${month}/${year}`)
        const datesArr = await axios.get(`https://habit-tracker-api-sharf.herokuapp.com/api/date/${month}/${year}`)
        dispatch(setDates(datesArr.data))
    }
}

const initialState = {
    dates: []
}

const datesReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_DATES: 
        return {...state, dates: action.datesArr}
        default: 
        return state
    }
}

export default datesReducer