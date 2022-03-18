import React from "react";

const Routines = ({ token, routines }) => {

  return <>
    <h1 className='header'>Routines Page</h1>
    {
      routines.map(routine => <div key={routine.id}> {routine.name}, {routine.goal}:
      {routine.activities.map(activity => <div key={activity.id}> {activity.name}, { activity.description}, {activity.duration}, {activity.count} </div>)} </div>)
    }
  </>
};

export default Routines;