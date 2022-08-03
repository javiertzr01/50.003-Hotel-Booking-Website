import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import FormPage from "./form";

// beforeAll(() => {
    // let unlisten = history.listen(({ action, location }) => {
    //     console.log(
    //         `The current URL is ${location.pathname}${location.search}${location.hash} ${location.state}`
    //     );
    //     console.log(`The last navigation action was ${action}`);
    // });
// })

// //Primary Guest
// test("guestFirstName non-empty input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );

//     const guestFirstName = screen.getByLabelText("guestFirstName");
//     await userEvent.type(guestFirstName, "a");
//     guestFirstName.blur();
//     expect(guestFirstName).toHaveValue("a");
//     expect(
//         screen.queryByLabelText("guestFirstNameError")
//     ).not.toBeInTheDocument();

// });

// test("guestFirstName empty input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const guestFirstName = screen.getByLabelText("guestFirstName");
//     await userEvent.click(guestFirstName)
//     guestFirstName.blur();
//     const guestFirstNameError = await screen.findByLabelText(
//         "guestFirstNameError"
//     );
//     expect(guestFirstName).toHaveValue("");
//     expect(guestFirstNameError).toBeInTheDocument();
// });

// test("guestLastName non-empty input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const guestLastName = screen.getByLabelText("guestLastName");
//     await userEvent.type(guestLastName, "a");
//     guestLastName.blur();
//     expect(guestLastName).toHaveValue("a");
//     expect(
//         screen.queryByLabelText("guestLastNameError")
//     ).not.toBeInTheDocument();
// });

// test("guestLastName empty input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const guestLastName = screen.getByLabelText("guestLastName");
//     await userEvent.click(guestLastName);
//     guestLastName.blur();
//     const guestLastNameError = await screen.findByLabelText(
//         "guestLastNameError"
//     );
//     expect(guestLastName).toHaveValue("");
//     expect(guestLastNameError).toBeInTheDocument();
// });

// test("guestHpNum valid numeric input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const guestHpNum = screen.getByLabelText("guestHpNum");
//     await userEvent.type(guestHpNum, "6599999999");
//     guestHpNum.blur();
//     expect(guestHpNum).toHaveValue("+65 9999 9999");
//     expect(screen.queryByLabelText("guestHpNumError")).not.toBeInTheDocument();
// });

// test("guestHpNum invalid numeric input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const guestHpNum = screen.getByLabelText("guestHpNum");
//     await userEvent.type(guestHpNum, "+659090");
//     await guestHpNum.blur();
//     const guestHpNumError = await screen.findByText(
//         "Please enter valid Phone Number"
//     );
//     expect(guestHpNum).toHaveValue("+65 9090");
//     expect(guestHpNumError).toBeInTheDocument();
// });

// test("guestHpNum non-numeric input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const guestHpNum = screen.getByLabelText("guestHpNum");
//     await userEvent.type(guestHpNum, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*, -./:;<=>?@[\]^_`{|}~");
//     guestHpNum.blur();
//     const guestHpNumError = await screen.findByText(
//         "Please enter your handphone number"
//     );
//     expect(guestHpNum).toHaveValue("");
//     expect(guestHpNumError).toBeInTheDocument();
// });

// test("guestHpNum empty input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const guestHpNum = screen.getByLabelText("guestHpNum");
//     await userEvent.click(guestHpNum, "");
//     guestHpNum.blur();
//     const guestHpNumError = await screen.findByText("Please enter your handphone number");
//     expect(guestHpNum).toHaveValue("");
//     expect(guestHpNumError).toBeInTheDocument();
// });

// // Your Details (Customer)
// test("customerFirstName non-empty input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const customerFirstName = screen.getByLabelText("customerFirstName");
//     await userEvent.type(customerFirstName, "a");
//     customerFirstName.blur();
//     expect(customerFirstName).toHaveValue("a");
//     expect(
//         screen.queryByLabelText("customerFirstNameError")
//     ).not.toBeInTheDocument();
// });

// test("customerFirstName empty input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const customerFirstName = screen.getByLabelText("customerFirstName");
//     await userEvent.click(customerFirstName);
//     customerFirstName.blur();
//     const customerFirstNameError = await screen.findByLabelText(
//         "customerFirstNameError"
//     );
//     expect(customerFirstName).toHaveValue("");
//     expect(customerFirstNameError).toBeInTheDocument();
// });

// test("customerEmail valid non-empty input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const customerEmail = screen.getByLabelText("customerEmail");
//     await userEvent.type(customerEmail, "a@gmail.com");
//     customerEmail.blur();
//     expect(customerEmail).toHaveValue("a@gmail.com");
//     expect(
//         screen.queryByLabelText("customerEmailError")
//     ).not.toBeInTheDocument();
// });

// test("customerEmail invalid non-empty input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const customerEmail = screen.getByLabelText("customerEmail");
//     await userEvent.type(customerEmail, "a");
//     customerEmail.blur();
//     const customerEmailError = await screen.findByLabelText(
//         "customerEmailError"
//     );
//     expect(customerEmail).toHaveValue("a");
//     expect(customerEmailError).toBeInTheDocument();
// });

// test("customerEmail empty input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const customerEmail = screen.getByLabelText("customerEmail");
//     await userEvent.click(customerEmail);
//     customerEmail.blur();
//     const customerEmailError = await screen.findByLabelText(
//         "customerEmailError"
//     );
//     expect(customerEmail).toHaveValue("");
//     expect(customerEmailError).toBeInTheDocument();
// });

// // Payment Information
// test("cardName non-empty input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const cardName = screen.getByLabelText("cardName");
//     await userEvent.type(cardName, "a");
//     cardName.blur();
//     expect(cardName).toHaveValue("a");
//     expect(screen.queryByLabelText("cardNameError")).not.toBeInTheDocument();
// });

// test("cardName empty input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const cardName = screen.getByLabelText("cardName");
//     await userEvent.click(cardName);
//     cardName.blur();
//     const cardNameError = await screen.findByLabelText("cardNameError");
//     expect(cardName).toHaveValue("");
//     expect(cardNameError).toBeInTheDocument();
// });

// // TODO: Card Number Picture

test("cardNumber valid non-empty input", async () => {
        let history = createMemoryHistory();

    const state = [
        "1000",
        "TeSt",
        "TESTDES",
        "2022-08-05",
        "2022-08-07",
        "ENG",
        "SGD",
        "2",
        "Roomtype",
        "cool Hotel",
    ];

    history.push("/submission", state);
    render(
        <Router navigator={history} location={history.location}>
            <FormPage />
        </Router>
    );
    const cardNumber = screen.getByLabelText("Card number");
    await userEvent.type(cardNumber, "4111111111111111");
    cardNumber.blur();
    expect(cardNumber).toHaveValue("4111 1111 1111 1111");
    expect(screen.queryByText("Card number is invalid")).not.toBeInTheDocument();
    expect(screen.queryByText("Enter a card number")).not.toBeInTheDocument();
});

test("cardNumber invalid non-empty input", async () => {
    let history = createMemoryHistory();

    const state = [
        "1000",
        "TeSt",
        "TESTDES",
        "2022-08-05",
        "2022-08-07",
        "ENG",
        "SGD",
        "2",
        "Roomtype",
        "cool Hotel",
    ];

    history.push("/submission", state);
    render(
        <Router navigator={history} location={history.location}>
            <FormPage />
        </Router>
    );
    const cardNumber = screen.getByLabelText("Card number");
    await userEvent.type(cardNumber, "4111");
    cardNumber.blur();
    const cardNumberError = await screen.findByText("Card number is invalid");
    expect(cardNumber).toHaveValue("4111");
    expect(cardNumberError).toBeInTheDocument();
});

test("cardNumber empty input", async () => {
        let history = createMemoryHistory();

    const state = [
        "1000",
        "TeSt",
        "TESTDES",
        "2022-08-05",
        "2022-08-07",
        "ENG",
        "SGD",
        "2",
        "Roomtype",
        "cool Hotel",
    ];

    history.push("/submission", state);
    render(
        <Router navigator={history} location={history.location}>
            <FormPage />
        </Router>
    );
    const cardNumber = screen.getByLabelText("Card number");
    const cardPic = await screen.findByLabelText("Placeholder card");
    await userEvent.click(cardNumber);
    cardNumber.blur();
    const cardNumberError = await screen.findByText("Enter a card number");
    expect(cardNumber).toHaveValue("");
    expect(cardPic).toBeInTheDocument();
    expect(cardNumberError).toBeInTheDocument();
});

// // TODO: Card Expiry

// test("cardCVC valid 3 number input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const cardCVC = screen.getByLabelText("cardCVC");
//     await userEvent.type(cardCVC, "123");
//     cardCVC.blur();
//     expect(cardCVC).toHaveValue("123");
//     expect(screen.queryByLabelText("cardCVCError")).not.toBeInTheDocument();
// });

// test("cardCVC valid 4 number input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const cardCVC = screen.getByLabelText("cardCVC");
//     await userEvent.type(cardCVC, "1234");
//     cardCVC.blur();
//     expect(cardCVC).toHaveValue("1234");
//     expect(screen.queryByLabelText("cardCVCError")).not.toBeInTheDocument();
// });

// test("cardCVC empty input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const cardCVC = screen.getByLabelText("cardCVC");
//     await userEvent.click(cardCVC);
//     cardCVC.blur();
//     const cardCVCError = await screen.findByLabelText("cardCVCError");
//     expect(cardCVC).toHaveValue("");
//     expect(cardCVCError).toBeInTheDocument();
// });

// // Billing Address details
// test("billingAddress non-empty input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const billingAddress = screen.getByLabelText("billingAddress");
//     await userEvent.type(billingAddress, "a");
//     billingAddress.blur();
//     expect(billingAddress).toHaveValue("a");
//     expect(
//         screen.queryByLabelText("billingAddressError")
//     ).not.toBeInTheDocument();
// });

// test("billingAddress empty input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const billingAddress = screen.getByLabelText("billingAddress");
//     await userEvent.click(billingAddress);
//     billingAddress.blur();
//     const billingAddressError = await screen.findByLabelText(
//         "billingAddressError"
//     );
//     expect(billingAddress).toHaveValue("");
//     expect(billingAddressError).toBeInTheDocument();
// });

// test("billingCity non-empty input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const billingCity = screen.getByLabelText("billingCity");
//     await userEvent.type(billingCity, "a");
//     billingCity.blur();
//     expect(billingCity).toHaveValue("a");
//     expect(screen.queryByLabelText("billingCityError")).not.toBeInTheDocument();
// });

// test("billingCity empty input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const billingCity = screen.getByLabelText("billingCity");
//     await userEvent.click(billingCity);
//     billingCity.blur();
//     const billingCityError = await screen.findByLabelText("billingCityError");
//     expect(billingCity).toHaveValue("");
//     expect(billingCityError).toBeInTheDocument();
// });

// test("billingPostalCode non-empty input", async () => {
//     let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const billingPostalCode = screen.getByLabelText("billingPostalCode");
//     await userEvent.type(billingPostalCode, "a");
//     billingPostalCode.blur();
//     expect(billingPostalCode).toHaveValue("a");
//     expect(
//         screen.queryByLabelText("billingPostalCodeError")
//     ).not.toBeInTheDocument();
// });

// test("billingPostalCode empty input", async () => {
//         let history = createMemoryHistory();

//     const state = [
//         "1000",
//         "TeSt",
//         "TESTDES",
//         "2022-08-05",
//         "2022-08-07",
//         "ENG",
//         "SGD",
//         "2",
//         "Roomtype",
//         "cool Hotel",
//     ];

//     history.push("/submission", state);
//     render(
//         <Router navigator={history} location={history.location}>
//             <FormPage />
//         </Router>
//     );
//     const billingPostalCode = screen.getByLabelText("billingPostalCode");
//     await userEvent.click(billingPostalCode);
//     billingPostalCode.blur();
//     const billingPostalCodeError = await screen.findByLabelText(
//         "billingPostalCodeError"
//     );
//     expect(billingPostalCode).toHaveValue("");
//     expect(billingPostalCodeError).toBeInTheDocument();
// });

// TODO: Billing Country
