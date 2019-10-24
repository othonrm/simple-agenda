import React, { Component } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn
} from "mdbreact";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toast } from 'react-toastify';

import EventList from '../../components/EventList';

import { Creators as EventActions } from './../../store/ducks/events';

import AddEventModal from './../../components/AddEventModal';

import WeatherForecast from './../../components/WeatherForecast';
import Offline from './../../components/Offline';


class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            online: navigator.onLine,
            showModal: false,
        }

        this.addBtn = React.createRef();
    }

    componentDidMount() {

        window.addEventListener('online', this.handleNetworkChange);
        window.addEventListener('offline', this.handleNetworkChange);

    }
    
    componentWillUnmount() {
        window.removeEventListener('online', this.handleNetworkChange);
        window.removeEventListener('offline', this.handleNetworkChange);
    }

    handleNetworkChange = () => {
        this.setState({ online: navigator.onLine });

        if(!navigator.onLine)
        {
            toast.error("Você está offline!");
        }
        else
        {
            toast.success("Você está online!");
        }
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    render() {

        return (
            <>
                <AddEventModal isOpen={this.state.showModal}  toggleModal={this.toggleModal} addEvent={this.props.addEvent} />
                <MDBContainer>
                    <MDBRow>

                        <MDBCol md="3">
                            <h3 className="text-uppercase my-3">Hoje</h3>

                            <h6 className="mt-3 mb-5">
                                {
                                    this.props.events.length === 0 ?
                                    "Hoje vai ser sussa, você não tem eventos programados..."
                                    :
                                    `Hoje vai ser ${this.props.events.length < 6 ? "tranquilo" : "puxado"}. Você tem ${this.props.events.length < 6 ? "apenas" : ""}` + (this.props.events.length) + "eventos  hoje."
                                }
                            </h6>

                            <WeatherForecast />
                        </MDBCol>

                        <MDBCol md="9" className="mb-r">
                            <h3 className="text-uppercase my-3">Agenda</h3>
                            
                            <EventList/>

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
                <Offline online={this.state.online} >{this.state.online ? 'Online' : 'Offline'}</Offline>
            </>
        );
    }

}

const mapStateToProps = state => ({
    events: state.events
});

const mapDispatchToProps = dispatch => bindActionCreators(EventActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);