import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

//importing elements
import HoursOfSleep from '../../components/Graphs/Sleep/HoursOfSleep'
import CoffeeVsSleep from '../../components/Graphs/Sleep/CoffeeVsSleep'
import SleepvsExercise from '../../components/Graphs/Sleep/SleepvsExercise'
import HoursOfExercise from '../../components/Graphs/Exercise/HoursOfExercise';
import ExerciseOverview from '../../components/Graphs/Exercise/ExerciseOverview';
import WaterVsExercise from '../../components/Graphs/Exercise/WaterVsExercise';
import Veggies from '../../components/Graphs/Eating/Veggies';
import WaterVsSleep from '../../components/Graphs/Eating/WaterVsSleep';
import EatingOverview from '../../components/Graphs/Eating/EatingOveriew';

// import Social Display
import SocialDisplay from '../../components/SocialDisplay'

//import overview from 
import SleepOverview from '../../components/Graphs/Sleep/SleepOverview'
// //Import api routes to db
import API from '../../utils/API'

import './Graph.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'} variant={'body2'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    homeButton: {
        marginLeft: 'auto',
        paddingLeft: '20px',
        paddingRight: '20px',
        width: '10%',
        backgroundColor: '#3f51b5',
        color: 'white',
        borderRadius: 0, 
        '&:hover' : {
            backgroundColor: '#d0e8f2',
            color: 'black'
        }
    }

}));

export default function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const coffeeTimes = {
        noCoffee: 0,
        morning: 0,
        afternoon: 0,
        evening: 0
    };
    const screenTime = {
        true: 0,
        false: 0
    };
    const exerciseTime = {
        noExercise: 0,
         thirty: 0,
         hour: 0,
         more: 0
    };
    const calories = {
        none: 0,
        min: 0,
        midOne: 0,
        midTwo: 0,
        max: 0
    };
    const active = {
        cardio: 0,
        weights: 0,
        rest: 0,
        zero: 0
    };
    const veg = {
        none: 0,
        two: 0,
        four: 0
    };
    const meals = {
        never: 0,
        half: 0,
        night: 0
    };
    const water = {
        none: 0,
        min: 0,
        mid: 0,
        max: 0
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    //Getting the user ID
    const userId = localStorage.getItem("userId");

    // Setting state to store the journl entries
    const [entries, setEntries] = useState();

    useEffect(() => {
        //Get all journal data for the user logged in 
        API.getJournal(userId)
            .then(res => {
                setEntries(res.data)
            }
            )
            .catch(err => console.log(err))

    }, [])

    let history = useHistory();

    function directHome() {
        history.push('/welcome')
    }


    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    centered
                    
                >
                    <Tab label="Sleep" {...a11yProps(0)} />
                    <Tab label="Exercise" {...a11yProps(1)} />
                    <Tab label="Eating Habits" {...a11yProps(2)} />
                    <Tab label="social" {...a11yProps(3)} />
                    
                    <Button className={classes.homeButton} onClick={directHome}>Home</Button>                  
                        
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                {/* Average hours of sleep per nighth  */}
                {/* sum of all input / number of inputs  */}
                {entries && <SleepOverview
                    sumOfSleep={entries.reduce((totalSleep, entry) => totalSleep = totalSleep + entry.q1_1, 0)}
                    totalNights={entries.length}
                    coffeeConsumption={coffeeTimes}
                    entries={entries}
                    coffeeTimes={coffeeTimes}
                    screenTime={screenTime}
                />}
                {/* once entries has value and linegraph can access values then execute */}
                {entries && <HoursOfSleep
                    // set the prop dates as a map of the entries, taking the date entered and the data poitns from q1_
                    dates={entries.map(entry => ({ date: entry.created_at, point: entry.q1_1 }))}
                />}
                {/* Coffee vs sleep double axis line graph */}
                {entries && <CoffeeVsSleep
                    datesAndSleep={entries.map(entry => ({ date: entry.created_at, point: entry.q1_1 }))}
                    datesAndCoffee={entries.map(entry => ({ date: entry.created_at, point: entry.q1_3 }))}
                />}

                {/* Screen time doughnut graph display */}
                {entries && <SleepvsExercise
                    datesAndSleep={entries.map(entry => ({ date: entry.created_at, point: entry.q1_1 }))}
                    datesAndExercise={entries.map(entry => ({ date: entry.created_at, point: entry.q3_3 }))}

                />}


            </TabPanel>
            <TabPanel value={value} index={1}>

                {entries && <ExerciseOverview
                    entries={entries}
                    exerciseTime={exerciseTime}
                    calories={calories}
                    active={active}
                />}
                {/* once entries has value and linegraph can access values then execute */}
                {entries && <HoursOfExercise
                    // set the prop dates as a map of the entries, taking the date entered and the data poitns from q3_
                    dates={entries.map(entry => ({ date: entry.created_at, point: entry.q3_3 }))}
                />}
                {/* Water vs exercise double axis line graph */}
                {entries && <WaterVsExercise
                    datesAndWater={entries.map(entry => ({ date: entry.created_at, point: entry.q2_3 }))}
                    datesAndCalories={entries.map(entry => ({ date: entry.created_at, point: entry.q3_2 }))}
                />}


            </TabPanel>
            <TabPanel value={value} index={2}>
                {entries && <EatingOverview
                    // sumOfVeggies={entries.reduce((totalVeg, entry) => totalVeg = totalVeg + entry.q2_1, 0)}
                    // totalNights={entries.length}
                    entries={entries}
                    veg={veg}
                    meals={meals}
                    water={water}
                />}
                {entries && <Veggies
                    // set the prop dates as a map of the entries, taking the date entered and the data poitns from q1_
                    dates={entries.map(entry => ({ date: entry.created_at, point: entry.q2_1 }))}
                />}
                {entries && <WaterVsSleep
                    datesAndWater={entries.map(entry => ({ date: entry.created_at, point: entry.q2_3 }))}
                    datesAndSleep={entries.map(entry => ({ date: entry.created_at, point: entry.q1_1 }))}
                />}

            </TabPanel>
            <TabPanel value={value} index={3}>
                <SocialDisplay entries={entries} />
            </TabPanel>

        </div>
    );
}
