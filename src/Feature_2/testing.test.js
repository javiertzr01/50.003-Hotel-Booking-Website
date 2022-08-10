import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Load_data from "./load_data";
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router, useLocation} from 'react-router-dom';
import { createBrowserHistory, createLocation, createMemoryHistory } from "history";
//^5.3.0 --> current version

/*"""
(alias) function createLocation<S = unknown>(
    path: LocationDescriptor<S>, 
    state?: S, 
    key?: LocationKey, 
    currentLocation?: Location<S>)  : Location<S>
"""*/ 

it("submit form with no errors", async () => { 

    let counter = 0;
    let dest = 'vJh2';
    let startDate = '2022-08-17';
    let endDate = '2022-08-24'; 
    let lang =  'en_US'; 
    let currency = 'SGD';  
    let adult = 1; 
    let children = 0; 
    let room = 1;
 
    let location_obj = {
    pathname: '/search', 
    search: '?destination_id=P4FZ&checkin=2022-08-10&checkout=2022-08-17&lang=en_US&currency=SGD&guests=1', 
    hash: '', 
    key: '4360ifkn',
    state: ['P4FZ', '2022-08-10', '2022-08-17', 'en_US', 'SGD', 1, 0, 1] 
    }

    let current_obj = {
        pathname: '/', 
        search: '', 
        hash: '', 
        key: '',
        state: [] 
        }

    //let location = createLocation(location_obj.pathname + location_obj.search, location_obj.state, location_obj.key);

    render(
        <Router>
            <Load_data location={location}/>
        </Router>);

    const button = screen.getByTestId("main-block");
    await new Promise((r) => setTimeout(r, 8000));

    while(counter < 1000){
        fireEvent.click(button);
        counter = counter + 1;
    }


  }, 100000);