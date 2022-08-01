import './App.css';
import {Link} from "react-router-dom";


function Error() {
  return (
    <div className="App">
        <h2>Confirmation form is only available per session use, no reloading allowed for security reasons.</h2>
        <Link to = "/">Please re-start your booking via the following link</Link>
    </div>
  );
}
export default Error;