import React from "react";
import RoutineForm from "./RoutineForm";

const MyRoutines = ({ token, routines, user, fetchRoutines }) => {

  const myRoutines = routines.filter(routine => user.id === routine.creatorId);
  

  return <div>
    <h1 className='header'>My Routines Page</h1>
    {
      token && <RoutineForm token={token} fetchRoutines={fetchRoutines}/>
    }
    {
      myRoutines.map(myRoutine => <div key={myRoutine.id}> {myRoutine.name}, {myRoutine.goal}:
      {myRoutine.activities.map(activity => <div key={activity.id}> {activity.name}, { activity.description}, {activity.duration}, {activity.count} </div>)} </div>)
    }
  </div>
}

export default MyRoutines;
