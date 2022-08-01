import './App.css';
import {Link} from "react-router-dom"

function Button() {

  let link = "hotels/prices?destination_id=WD0M&checkin=2022-08-05&checkout=2022-08-08&lang=en_US&currency=SGD&landing_page=&partner_id=16&country_code=SG&guests=1";
  let destination_id = "WD0M"
  let checkin = '2022-08-05'
  let checkout = '2022-08-08'
  let lang = 'en_US'
  let currency = 'SGD'
  let guests = '1'

  return (
    <div className="App">
        <h1>Selected parameters (mock of feature 1)</h1>
        <p>destination_id=WD0M</p>
        <p>checkin=2022-08-05</p>
        <p>checkout=2022-08-08</p>
        <p>lang=en_US</p>
        <p>currency=SGD</p>
        <p>guests=1</p>
        <Link to={`/search?destination_id=${destination_id}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&guests=${guests}`} state = {
          {destination_id, checkin, checkout, lang, currency, guests}}>
        Let's go book</Link>
    </div>
  );
}
export default Button;