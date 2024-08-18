import { useEffect, useState } from "react";
import { getDataFromServer } from "../services/menu";
import {ExpenseTracker} from "./ExpenseTracker";

export function ShowData() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [sum, setSum] = useState(0);
  const [rahulspent, setRahulspent] = useState(0);
  const [rameshspent, setRameshspent] = useState(0);
  const [showform, setShowForm] = useState(false);

  var rahulspent1 = 0;
  var rameshspent1 = 0;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getDataFromServer();
        setItems(data);
        //setSum(data.reduce((result, v) => (result = Number(result).toFixed(2) + Number(v.price).toFixed(2)),0
        setSum(data.reduce((result, v) => (result + Number(v.price)), 0).toFixed(2), 0);
        //0
        //));
        Shares(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchMenu();
  }, [showform]);


  const Shares = (data) => {
    data.map((sams) => {
      if(sams.payeeName === "Rahul")
      {
        (rahulspent1 = Number(rahulspent1).toFixed(2) + Number(sams.price).toFixed(2))
      }
      else{

       (rameshspent1 = Number(rameshspent1).toFixed(2) + Number(sams.price).toFixed(2))
      }
    //
  });
    setRahulspent(rahulspent1);
    setRameshspent(rameshspent1);
  //};


/*
const Shares = (data) => {
  let rameshTotal = 0;
  let rahulTotal = 0;

  data.forEach((item) => {
    if (item.payeeName === "Rahul") {
      rahulTotal += item.price; // Add price directly to number variable
    } else {
      rameshTotal += item.price;
    }
  });
*/
  //setRahulspent(rahulTotal.toFixed(2)); // Update state with final value after loop
  //setRameshspent(rameshTotal.toFixed(2));
};
  const success = () => {
    setShowForm(false);
  };
  const cancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {showform && (
        <div className="form">
          <ExpenseTracker onTrue={success} onClose={cancel} />
        </div>
      )}
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>
          Payee
        </div>
      </>
      {items &&
        items.map((user, idx) => (
          <div key={idx}>
            <div className="use-inline date">{user.setDate}</div>
            <div className="use-inline">{user.product}</div>
            <div className="use-inline price">{user.price}</div>
            <div className={`use-inline ${user.payeeName}`}>
              {user.payeeName}
            </div>
          </div>
        ))}
      <hr />
      <div className="use-inline ">Total: </div>
      <span className="use-inline total">{Number(sum).toFixed(2)}</span> <br />
      <div className="use-inline ">Rahul paid: </div>
      <span className="use-inline total Rahul">{rahulspent1.toFixed(2)}</span> <br />
      <div className="use-inline ">Ramesh paid: </div>
      <span className="use-inline total Ramesh">{rameshspent1.toFixed(2)}</span> <br />
      <span className="use-inline payable">
        {rahulspent1 > rameshspent1 ? "Pay Rahul " : "Pay Ramesh"}
      </span>
      <span className="use-inline payable price">
        {}
        {Math.abs((rahulspent1 - rameshspent1) / 2)}
      </span>
      {error && <>{error?.message}</>}
    </>
  );
}
export default {ShowData};
