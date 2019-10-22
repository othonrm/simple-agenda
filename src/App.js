import React, { Component } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn
} from "mdbreact";


import './App.css';

import Event from './components/Event';
import AddEventModal from './components/AddEventModal';

import WeatherForecast from './components/WeatherForecast';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            events: [
                // { 
                //     id: 1,
                //     time: "10:00",
                //     title: "Breakfast with Simon",
                //     location: "Somewhere",
                //     description: "Something cool",
                // },
                // { 
                //     id: 2,
                //     time: "11:00",
                //     title: "Breakfast with Simon",
                //     location: "Somewhere",
                //     description: "Something cool",
                // },
            ]
        }

        this.addBtn = React.createRef();
    }

    handleDelete = event_id => {
        console.log("Deletar evento: ", event_id);
        const events = this.state.events.filter( e => e.id !== event_id);
        this.setState({ events });
    }

    populateEvents() {
        let events = this.state.events.map((event) => 
            <Event 
                key={event.id}
                id={event.id}
                time={event.time}
                title={event.title}
                location={event.location}
                description={event.description}
                handleDelete={this.handleDelete}
            />
        );

        if(this.state.events.length === 0)
        {
            return <h6>Você ainda não adicionou nenhum evento em sua agenda...</h6>
        }

        return events;
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    addEvent = newEvent => {
        let events = [...this.state.events];
        let newId = Math.max.apply(Math, events.map(function(o) { return o.id; })) + 1;

        console.log(newId);
        
        events.push({
            id: newId,
            time: newEvent.time,
            title: newEvent.title,
            location: newEvent.location,
            description: newEvent.description
        });

        this.setState({ events });
    }

    render() {
        return (
            <>                
                <AddEventModal isOpen={this.state.showModal}  toggleModal={this.toggleModal} addEvent={this.addEvent} />
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="9" className="mb-r">
                            <h2 className="text-uppercase my-3">Hoje:</h2>
                            
                            <div id="schedule-items">
                                {this.populateEvents()}
                            </div>

                            <MDBRow className="mb-4">
                                <MDBCol xl="3" md="6" className="mx-auto text-center">
                                    <MDBBtn color="primary" rounded onClick={this.toggleModal}>
                                        Novo evento
                                    </MDBBtn>
                                </MDBCol>

                            </MDBRow>

                        </MDBCol>
                        <MDBCol md="3">
                            <h3 className="text-uppercase my-3">Agenda</h3>

                            <h6 className="my-3">
                                Hoje vai ser {this.state.events.length < 6 ? "tranquilo" : "puxado"}. Você tem {this.state.events.length < 6 ? "apenas" : ""} <b>{this.state.events.length} eventos </b> hoje.
                            </h6>
                            <WeatherForecast />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }

}
