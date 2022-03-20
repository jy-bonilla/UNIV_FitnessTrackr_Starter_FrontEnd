import React from 'react';
//map over the activities object, then render them the same way as routine
const Routine = ({ name, goal, creatorName, activities }) => {

    return <div>
        <h3>Routine: {name}</h3>
        <p>Goal: {goal}</p>
        <p>Creator: {creatorName}</p>
        {/* <p>Involved activities: {activities}</p> */}
    </div>
}

export default Routine;