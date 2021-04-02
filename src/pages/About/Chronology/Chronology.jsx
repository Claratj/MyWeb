import React from 'react';
import TimelineData from '../../../data/TimelineData.json';
import './Chronology.scss';



export default function Chronology() {

    // console.log(TimelineData);

    return (
        <div className="timeline">
            {TimelineData.map((data, i) =>
                <div className="timeline-item">
                    <div className="timeline-item-content" key={i}>
                        <h3>{data.role}</h3>
                        <h4>{data.time}</h4>
                        <p>{data.description}</p>
                    </div>
                </div>
            )}
        </div>

    )
}


