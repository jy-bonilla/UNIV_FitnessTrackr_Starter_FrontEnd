import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callApi } from '../api';


const IndividualActivity = (props) => {
    const { id } = useParams();
    const [individualRoutine, setIndividualRoutine] = useState([])
    useEffect(() => {
        callApi({ url: `/activities/${id}/routines` }).then(result => {
            setIndividualRoutine(result)
            if (!result.length) {
                console.log("no routines")
            }
        }).catch(error => {
            console.error(error)
        })
    }, []);


    return (
        <div>
            {individualRoutine.length
                ?
                individualRoutine.map((item, index) =>
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
                ) :
                <div>
                    <h2>No routines with that activity</h2>
                </div>
            }
        </div>
    )
}

export default IndividualActivity