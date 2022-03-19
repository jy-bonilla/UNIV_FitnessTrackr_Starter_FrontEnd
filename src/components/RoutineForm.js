import React, { useState } from 'react';
import { callAPI } from '../api';

function RoutineForm({ token, fetchRoutines }) {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState('');

    const handleRoutineSubmit = async (ev) => {
        ev.preventDefault();

        try {
            const addRoutine = await callAPI({
                method: 'POST',
                url: 'routines',
                token: `${token}`,
                body: {
                    name: name,
                    goal: goal
                }
            });

            setName('');
            setGoal('');
        } catch (error) {
            console.error(error);
        }

        await fetchRoutines();
    };

    return <div>
        <h2 className='header'>Add Routine</h2>
        <form onSubmit={handleRoutineSubmit}>
            <input placeholder='Name' type='text' value={name} onChange={(ev) => setName(ev.target.value)} />
            <input placeholder='Goal' type='text' value={goal} onChange={(ev) => setGoal(ev.target.value)} />
            <input placeholder='Public - true or false' type='text' value={isPublic} onChange={(ev) => setIsPublic(ev.target.value)} />
            <button type='submit'>Add Routine</button>
        </form>
    </div>;
}

export default RoutineForm;
