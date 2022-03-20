import React, { useEffect, useState } from 'react';
import CreateActivity from './CreateActivity';
import { callApi } from '../api';
import EditActivity from './EditActivity';
import { Link } from "react-router-dom"

const AllActivities = (props) => {

    const setSelectedActivity = props.setSelectedActivity
    const selectedActivity = props.selectedActivity
    const [loadedActivities, setLoadedActivities] = useState([]);
    useEffect(() => {
        callApi({ url: "/activities" }).then(result => {
            setLoadedActivities(result)
        }).catch(error => {
            console.error(error)
        })
    }, []);

    return (
        <div id="allActivities">
            {(localStorage.token) ?
                <CreateActivity loadedActivities={loadedActivities} setLoadedActivities={setLoadedActivities} /> :
                <></>}
            {loadedActivities.map((item, index) =>
                <div key={index}>

                    <Link id="viewindividualactivity" to={`/activities/${item.id}/routines`}>
                        <h2 key={"name" + index}>{item.name}</h2>
                    </Link>
                    <p key={"desc" + index}>{item.description}</p>
                    <EditActivity loadedActivities={loadedActivities} setLoadedActivities={setLoadedActivities} id={item.id} origName={item.name} origDescription={item.description} />
                </div>)}
        </div>
    );
}


export default AllActivities;