import { toast } from 'react-toastify';

const INITIAL_STATE = [
    // { 
    //     id: 1,
    //     time: "10:00",
    //     title: "Breakfast with Simon",
    //     location: "Somewhere",
    //     description: "Something cool",
    // },
    // { 
    //     id: 2,
    //     time: "11:30",
    //     title: "Breakfast with Othon",
    //     location: "Somewhere",
    //     description: "Something cool",
    // }
];

export default function events(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'ADD_EVENT':

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

        case 'DELETE_EVENT':
            // console.log("Deletar evento: ", action.payload.event_id);
            toast.info("Evento deletado com sucesso!");

            return state.filter( e => e.id !== action.payload.event_id);            
        default:
            return state;
    }
}