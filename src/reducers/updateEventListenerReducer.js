const updateEventListenerReducer = (state = [], action) =>{
    if(action.type === 'UPDATE_EVENTLIST'){
        return [...state, action.payload]
    }
    return state;
}

export default updateEventListenerReducer;