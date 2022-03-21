import React, { useState } from 'react';
import { callApi } from '../api';
import { useHistory } from 'react-router-dom';


const RoutineForm = (isLoggedIn) => {

    const defaultState = { name: '', goal: '', isPublic: null };
    const [routine, setroutine] = useState(defaultState);

    let history = useHistory();


    function handleChange(event, stateKey) {
        const newroutine = { ...routine };
        let value = event.target.value;
        newroutine[stateKey] = value;
        setroutine(newroutine);
    }

    async function onSubmit(event) {
        try {
            event.preventDefault();
            const newroutine = { routine }
            await callApi.makeRequest('/routines', 'routine', newroutine);
            setroutine(defaultState);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            history.push('/routines');
        }
    }

    return <div className="routine-form">
        <input onChange={event => handleChange(event, 'name')} id="name" value={routine.name} type="text" required placeholder="Routine Name" />
        <input onChange={event => handleChange(event, 'goal')} id="goal" value={routine.goal} type="text" required placeholder="Routine Goal" />
        <button onClick={onSubmit}>Add routine</button>
    </div>
}

export default RoutineForm;