import React from 'react';
import { useHistory } from 'react-router-dom';

export function EntryPage() {

    const history = useHistory();
    return (
        <div>
            <button onClick={() => history.push('/home')}>Enter</button>
        </div>
    );
}