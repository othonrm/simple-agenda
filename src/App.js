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

    addEvent = event_data => {
        let events = [...this.state.events];
        let newId = events.length > 0 ? Math.max.apply(Math, events.map(function(o) { return o.id; })) + 1 : 1;

        let newEvent = {
            id: newId,
            time: event_data.time,
            title: event_data.title,
            location: event_data.location,
            description: event_data.description
        }

        console.log(newEvent);
        
        events.push(newEvent);

        this.setState({ events });
    }

    render() {
        return (
            <>                
                <AddEventModal isOpen={this.state.showModal}  toggleModal={this.toggleModal} addEvent={this.addEvent} />
                <MDBContainer>
                    <MDBRow>

                        <MDBCol md="3">
                            <h3 className="text-uppercase my-3">Hoje</h3>

                            <h6 className="mt-3 mb-5">
                                {
                                    this.state.events.length === 0 ?
                                    "Hoje vai ser sussa, você não tem eventos programados..."
                                    :
                                    `Hoje vai ser ${this.state.events.length < 6 ? "tranquilo" : "puxado"}. Você tem ${this.state.events.length < 6 ? "apenas" : ""} <b>${this.state.events.length} eventos </b> hoje.`
                                }
                            </h6>
                            <WeatherForecast />
                        </MDBCol>

                        <MDBCol md="9" className="mb-r">
                            <h3 className="text-uppercase my-3">Agenda</h3>
                            
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
                    </MDBRow>
                </MDBContainer>
            </>
        );
    }

}
