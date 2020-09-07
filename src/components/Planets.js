import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query'
import Planet from './Planet';

const fetchPlanets = async (key, page) => {
    const response = await fetch(`https://swapi.dev/api/${key}/?page=${page}`)
    return response.json()
}

const Planets = () => {
    const [page, setPage] = useState(1)
    const { 
        resolvedData, 
        latestData, 
        status 
    } = usePaginatedQuery(['planets', page], fetchPlanets)

    return (
        <div>
            <h2>Planets</h2>

            {
                status === 'loading' ? (
                    <div>Loading data...</div>
                ) :
                status === 'error' ? (
                    <div>Error fetching data</div>
                ) :
                status === 'success' ? (
                    <>
                        <button 
                            disabled={page === 1}
                            onClick={
                            () => setPage(old => Math.max(old - 1, 1))
                        }>Previous Page</button>
                        <span>{page}</span>
                        <button 
                            disabled={!latestData || !latestData.next}
                            onClick={
                                () => setPage(old => (
                                    !latestData || !latestData.next ? old : old + 1
                                ))
                        }>Next Page</button>
                        <div>
                        {
                            resolvedData.results ? resolvedData.results.map((planet) => (
                                <Planet key={planet.name} planet={planet} />
                            )) : <p>Nothing to display...</p>
                        }
                        </div>
                    </>
                ) : (
                    <p>Nothing to display...</p>
                )
            }
        </div>
    );
}
 
export default Planets;