import { toast } from 'react-toastify';

import moment from 'moment';

export const Types = {
    ADD: 'event/ADD',
    DELETE: 'event/DELETE',
}

const INITIAL_STATE = [
    { 
        id: 1,
        time: moment().format("HH:mm"),
        title: "Evento de exemplo",
        location: "Algum lugar",
        description: "Apenas para mostrar como é um evento...",
    }
];

export default function events(state = INITIAL_STATE, action) {
    switch(action.type) {
        case Types.ADD:

            let events = state;

            let newId = events.length > 0 ? Math.max.apply(Math, events.map(function(o) { return o.id; })) + 1 : 1;
    
            const { event_data } = action.payload;

            let newEvent = {
                id: newId,
                time: event_data.time,
                title: event_data.title,
                location: event_data.location,
                description: event_data.description
            }

            // console.log("Adicionar evento: ", action.payload.event_data);
            toast.success("Evento cadastrado com sucesso!");
            
            return [...events, newEvent];

        case Types.DELETE:
            // console.log("Deletar evento: ", action.payload.event_id);
            toast.info("Evento deletado com sucesso!");

            return state.filter( e => e.id !== action.payload.event_id);            
        default:
            return state;
    }
}

export const Creators = {    
    addEvent: event_data => ({ 
        type: Types.ADD,
        payload: { event_data }
    }),

    deleteEvent: event_id => ({ 
        type: Types.DELETE,
        payload: { event_id }
    }),
};