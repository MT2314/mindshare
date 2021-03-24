import React, { useEffect, useState } from 'react';

//Importing line graph from
import LineGraph from '../../components/Graphs/LineGraph'
import DblAxisLine from '../../components/Graphs/DblAxisLine'
import ScreenVsSleep from '../../components/Graphs/ScreenVsSleep'
import DoughnutScreenTime from '../../components/Graphs/DoughnutScreenTime'

//Import api routes to db
import API from '../../utils/API'

function Graphs() {

    // Getting User logged in
    const userId = localStorage.getItem("userId");

    //Setting state to store the journl entries
    const [entries, setEntries] = useState([]);

    //Load all journal entries and store them 
    useEffect(() => {
        loadEntries()
    }, [])

    function loadEntries() {
        //Get all journal data for the user logged in 
        API.getJournals()
        .then(res => setEntries(res.data)
        )
        .catch(err => console.log(err))
        console.log(entries)
        console.log(userId)
        // setEntries(entries.filter(posts => posts.postedBy == userId))
        // console.log(entries)
    }



    return (
        <div>
            <button onClick={loadEntries}>load saved data</button>
            <LineGraph />
            <DblAxisLine />
            <ScreenVsSleep />
            <DoughnutScreenTime />
        </div>
    )
}

export default Graphs;