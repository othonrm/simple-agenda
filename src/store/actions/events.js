export const addEvent = event_data => ({ 
    type: 'ADD_EVENT',
    payload: { event_data }
});

export const deleteEvent = event_id => ({ 
    type: 'DELETE_EVENT',
    payload: { event_id }
});