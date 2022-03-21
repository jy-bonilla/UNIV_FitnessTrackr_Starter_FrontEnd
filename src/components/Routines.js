import React, { useState, useEffect } from 'react';
import { callApi } from '../api';


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
    // const routineElement = routineList.map((routine, index) => {
    //     return <Routine key={'Routine Number' + index}
    //         name={routine.name}
    //         goal={routine.goal}
    //         creatorName={routine.creatorName}
    //         activities={routine.activities}
    //     />
    // })


    return (
        <div>
            {routineList.map((item, index) =>
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <h3>By: {item.creatorName}</h3>
                    <p>Goal: {item.goal}</p>
                    <h3>Activities:</h3>
                    {item.activities.map(item =>
                        <div key={item.id}>
                            <h4>{item.name}</h4>
                            <p>Count: {item.count}</p>
                            <p>Duration: {item.duration}</p>
                            <p>{item.description}</p>
                        </div>)}

                </div>
            )
            }
        </div>
    )
}

export default Routines;
