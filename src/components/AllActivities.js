import React, { useEffect, useState } from 'react';
import CreateActivity from './CreateActivity';
import { callApi } from '../api';


const AllActivities = () => {
    const [loadedActivities, setLoadedActivities] = useState([]);
    useEffect(() => {
        callApi({ url: "/activities" }).then(result => {
            setLoadedActivities(result)
        }).catch(error => {
            console.error(error)
        })
    }, []);

    return (
        <div id="allPosts">
            {(localStorage.token) ?
                <CreateActivity loadedActivities={loadedActivities} /> :
                <></>}
            {loadedActivities.map((item, index) =>
                <div key={index}><h2 onClick={() => console.log("clicked" + item.id)} key={"name" + index}>{item.name}</h2>
                    <p key={"desc" + index}>{item.description}</p>
                </div>)}
        </div>
    );
}


export default AllActivities;