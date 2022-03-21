import React, { useEffect, useState } from 'react';
import CreateActivity from './CreateActivity';
import { callApi } from '../api';
import EditActivity from './EditActivity';
import { Link } from "react-router-dom"

const AllActivities = (props) => {
    const loadedActivities = props.loadedActivities
    const setLoadedActivities = props.setLoadedActivities

    return (
        <div className="allPosts-list" id="allPosts">
            {(localStorage.token) ?
                <CreateActivity loadedActivities={loadedActivities} setLoadedActivities={setLoadedActivities} /> :
                <></>}
            {loadedActivities.map((item, index) =>
                <div key={index} className="activities-post">
                    <Link id="viewindividualactivity" to={`/activities/${item.id}/routines`}>
                        <span id="postTitle"> {item.name}</span>
                    </Link>
                    <p key={"desc" + index}>{item.description}</p>
                    <EditActivity loadedActivities={loadedActivities} setLoadedActivities={setLoadedActivities} id={item.id} origName={item.name} origDescription={item.description} />
                </div>)}
        </div>
    );
}


export default AllActivities;