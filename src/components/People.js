import React from 'react';
import { useQuery } from 'react-query'
import Person from './Person';

const fetchPeople = async () => {
    const response = await fetch('https://swapi.dev/api/people/')
    const data = await response.json()

    return data
}

const People = () => {
    const { data, status } = useQuery('people', fetchPeople)

    return (
        <div>
            <h2>People</h2>
            
            {
                status === 'loading' ? (
                    <div>Loading data...</div>
                ) :
                status === 'error' ? (
                    <div>Error fetching data</div>
                ) :
                status === 'success' ? (
                    data.results.map((person) => (
                        <Person key={person.name} person={person} />
                    ))
                ) : (
                    <p>Nothing to display...</p>
                )
            }
        </div>
    );
}
 
export default People;