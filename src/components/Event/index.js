import React from 'react';
import {
    MDBBadge
} from "mdbreact";

export default class Event extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            time: this.props.time,
            title: this.props.title,
        }
    }

    render() {
        return (
            <>
                <div className="media mt-1">
                    <h3 className="h3-responsive font-weight-bold mr-3">
                        {this.state.time}
                    </h3>
                    <div className="media-body mb-3 mb-lg-3">
                        <MDBBadge onClick={() => this.props.handleDelete(this.props.id)} color="red" className="ml-2 float-right"> - </MDBBadge>

                        <h6 className="mt-0 font-weight-bold">{this.state.title} </h6>{" "}

                        <hr className="hr-bold my-2"/>

                        { this.props.location && <h6>Location: {this.props.location}</h6> }
                        {this.props.description && (
                            <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
                                {this.props.description}
                            </p>
                        )}
                    </div>
                </div>
            </>
        );
    }
}
