import React from 'react';
import TimelineData from '../../../data/TimelineData.json';
import ChronologyItem from './ChronologyItem/ChronologyItem';

export default function Chronology() {

    return (
        <div className="timeline">
            {TimelineData.map((data, i)=>{
                <ChronologyItem data={data} key={i}/>
            })
            }

        </div>

    )
}


