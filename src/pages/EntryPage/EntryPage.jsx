import React from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../../core/Header/Header';

export function EntryPage() {

    const history = useHistory();
    return (
        <div>
            <Header />
            {/* <button onClick={() => history.push('/home')}>Enter</button> */}
        </div>
    );
}