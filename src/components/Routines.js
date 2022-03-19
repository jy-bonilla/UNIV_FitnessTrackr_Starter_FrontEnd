// import React from "react";

// const Routines = ({ token, routines }) => {

//   return <div>
//     <h1 className='header'>Routines Page</h1>
//     {
//       routines.map(routine => <div key={routine.id}> {routine.name}, {routine.goal}:
//       {routine.activities.map(activity => <div key={activity.id}> {activity.name}, { activity.description}, {activity.duration}, {activity.count} </div>)} </div>)
//     }
//   </div>
// };

// export default Routines;
import React, { useEffect, useState } from "react";
import { fetchRoutines } from "../api";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  const handleRoutines = async () => {
    const fetchedRoutines = await fetchRoutines();
    setRoutines(fetchedRoutines);
  };

  useEffect(() => {
    handleRoutines();
  }, []);

  return (
    <div>
      <h2>Hello welcome to routines</h2>
      {routines.map((routine) => {
        return (
          <div>
            <div>{routine.name}</div>
            <div>{routine.goal}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Routines;