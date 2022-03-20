import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { callApi } from '../api';
import Routine from './Routine';

const Routines = () => {

    const [routineList, setRoutineList] = useState([]);


    useEffect(() => {
        callApi({ url: "/routines" }).then(result => {
            setRoutineList(result)
        }).catch(error => {
            console.error(error)
        })
    }, []);
    console.log(routineList)
    const routineElement = routineList.map((routine, index) => {
        return <Routine key={'Routine Number' + index}
            name={routine.name}
            goal={routine.goal}
            creatorName={routine.creatorName}
            activities={routine.activities}
        />
    })


    return (
        <div>
            <h1>List of all the public routines</h1>
            <p>Want to update or create a routine? <Link to="/register"> Sign In Here!</Link></p>
            {routineElement}
        </div>
    )
}

export default Routines;
