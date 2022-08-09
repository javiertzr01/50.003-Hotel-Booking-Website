import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Load_data from "./load_data";
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import { createMemoryHistory } from "history";

it("submit form with no errors", async () => {
    
    const history = createMemoryHistory();

    let counter = 0;
    let dest = 'vJh2';
    let startDate = '2022-08-17';
    let endDate = '2022-08-24'; 
    let lang =  'en_US'; 
    let currency = 'SGD';  
    let adult = 1; 
    let children = 0; 
    let room = 1;

    let state = {
    pathname: '/search', 
    search: '?destination_id=P4FZ&checkin=2022-08-10&checkout=2022-08-17&lang=en_US&currency=SGD&guests=1', 
    hash: '', 
    key: '4360ifkn',
    state: ['P4FZ', '2022-08-10', '2022-08-17', 'en_US', 'SGD', 1, 0, 1] 
    }
    
    render(
        <Router location={state}>
            <Load_data />
        </Router>);

    const button = screen.getByTestId("main-block");
    await new Promise((r) => setTimeout(r, 8000));

    while(counter < 1000){
        fireEvent.click(button);
        counter = counter + 1;
    }


  }, 100000);