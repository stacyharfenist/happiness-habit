import axios from 'axios'

const initialState = {
    userId: 1,
    userName: 'Stacy'
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
        return state
    }
}

export default userReducer