import React from 'react';
import {
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
    MDBBtn
} from 'mdbreact';

import { TimePicker } from 'antd';

// import moment from 'moment';

export default class AddEventModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            time: '',
            title: '',
            location: '',
            description: ''
        };
    }

    handleInputChange = inputName => value => {
        const nextValue = value;
        this.setState({ [inputName]: nextValue });

        // console.log(this.state);
    }

    handleAddNewEvent = () => {
        const newEvent = {
            time: this.state.time,
            title: this.state.title,
            location: this.state.location,
            description: this.state.description 
        }

        this.props.addEvent(newEvent);
        this.props.toggleModal();
    }

    handleTimePickerChange = (time, timeString) => {
        this.setState({ time: timeString });
    }

    render() {
        return (
            <MDBModal 
                // toggle={this.props.toggleModal} 
                isOpen={this.props.isOpen}
                centered
            >
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={this.props.toggleModal}
                >
                    Novo evento
                </MDBModalHeader>

                <MDBModalBody>
                    <form className="mx-3 grey-text">
                        {/* <MDBInput
                            name="time"
                            label="Time"
                            icon="clock"
                            hint="12:30"
                            group
                            type="text"
                            getValue={this.handleInputChange("time")}
                        /> */}
                        <div className="md-form form-group">
                            <i data-test="fa" className="fa fa-clock prefix"></i>
                            <TimePicker onChange={this.handleTimePickerChange} className="ml-5" placeholder="" format={"HH:mm"} name="time" />
                            <label className="active" data-error="" data-success="">Time</label>
                        </div>
                        <MDBInput
                            name="title"
                            label="Title"
                            icon="edit"
                            group
                            type="text"
                            getValue={this.handleInputChange("title")}
                        />
                        <MDBInput
                            name="location"
                            label="Location (optional)"
                            icon="map"
                            group
                            type="text"
                            getValue={this.handleInputChange("location")}
                        />
                        <MDBInput
                            name="description"
                            label="Description"
                            icon="sticky-note"
                            group
                            type="textarea"
                            getValue={this.handleInputChange("description")}
                        />
                    </form>
                </MDBModalBody>

                <MDBModalFooter className="justify-content-center">
                    <MDBBtn color="success" rounded onClick={this.handleAddNewEvent}>
                        Add
                    </MDBBtn>
                </MDBModalFooter>
                
            </MDBModal>
        );
    }
}