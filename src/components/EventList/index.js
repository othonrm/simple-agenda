import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PropTypes } from 'prop-types';

import Event from './../Event';
import { Creators as EventActions} from './../../store/ducks/events';

const EventList = (props) => {

    // console.log(props.events);

    function populateEvents () {

        let list = props.events.map((event) => 
            <Event 
                key={event.id}
                id={event.id}
                time={event.time}
                title={event.title}
                location={event.location}
                description={event.description}
                handleDelete={props.deleteEvent}
            />
        );
    
        if(props.events.length === 0)
        {
            return <h6>Você ainda não adicionou nenhum evento em sua agenda...</h6>
        }
    
        return list;
    }

    return (
        <div id="schedule-items">
            {populateEvents(props.events)}
        </div>
    );    
}

EventList.propTypes = {
    deleteEvent: PropTypes.func.isRequired,
    events: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        time: PropTypes.string,
        title: PropTypes.string,
        location: PropTypes.string,
        description: PropTypes.string,
    })).isRequired,
};

const mapStateToProps = state => ({
    events: state.events
});

const mapDispatchToProps = dispatch => bindActionCreators(EventActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
