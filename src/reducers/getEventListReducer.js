const getEventListReducers = (state = [], action) =>{
    if(action.type === 'GET_EVENTLIST'){
        return [...state]
    }
    return state;
}

export default getEventListReducers;