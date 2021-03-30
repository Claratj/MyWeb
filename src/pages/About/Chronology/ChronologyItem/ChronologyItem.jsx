import React from 'react';
// import  TimelineData  from '../../../../data/TimelineData';

export default function ChronologyItem(props) {

    return (
        <div className="content">
            <div className="chronology-item-content">
                <h3>{props.data.title}</h3>
                <p>{props.data.description}</p>
                <h4>{props.data.time}</h4>
            </div>

        </div>
    )
}
