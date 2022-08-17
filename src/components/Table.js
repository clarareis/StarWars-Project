import React, { useEffect } from 'react';
import getAPI from '../services/api_request';

export default function Table() {
  useEffect(async () => {
    const newPlanets = await getAPI();
    console.log(newPlanets);
  }, []);
  return (
    <div>Table</div>
  );
}
