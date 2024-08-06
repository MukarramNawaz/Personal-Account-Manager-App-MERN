import React, { useState,useEffect } from 'react';
import '../App.css'
import { toast } from 'react-toastify';
import Header from './Header';
const dotenv = require("dotenv").config();
const BACKEDND_URL = process.env.BACKEDND_URL;
function Dashboard() {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [transectionType, setTransectionType] = useState('');
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const fetchData = (async() =>
    {
      try {
        let userId = localStorage.getItem('userId');
        userId = JSON.parse(userId);
      const response = await fetch(`${BACKEDND_URL}/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
      const data = await response.json();
      setUser(data);
      setTransactions(data.transactions);
      setBalance(data.accountBalance);
      setIncome(data.income);
      setExpenses(data.expenses);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    })
    useEffect(  ()  => {

      fetchData();
          
     

  }, []);

  
    const handleTextChange = (e) => {
        setText(e.target.value);
      };
    
      const handleAmountChange = (e) => {
        setAmount(e.target.value);
      };
    
      const handleIncomeTransaction = async (e) => {
        e.preventDefault();
       
        if (!text || !amount) {
          toast.error('Please enter text and amount');
          return;
        }
         setTransectionType("Income  : ")
        const newTransaction = { transectionType, text, amount };
        const updatedTransactions = [...transactions, newTransaction];
        const updatedBalance = balance + Math.abs(amount);
        const updatedIncome = income + Math.abs(amount) ;

        // udating in MB
        const response = await fetch(`https://personal-account-manager-app-mern.vercel.app/${user._id}/income`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTransaction),
        });
        console.log(user._id, newTransaction)
        if (response.ok) {
          toast.success('Transaction added successfully');
          setTransactions(updatedTransactions);
          setBalance(updatedBalance);
          setIncome(updatedIncome);
        } else {
          toast.error('Failed to add transaction');
        }
    
        // Clear the input fields
        setText('');
        setAmount('');
    };
    
    const handleExpensesTransaction = async (e) => {
    
      e.preventDefault();
      setTransectionType("Expenses  : ")
      if (!text || !amount) {
        toast.error('Please enter text and amount');
        return;
      }

      const newTransaction = { transectionType, text, amount };
      const updatedTransactions = [...transactions, newTransaction];
      const updatedBalance = balance - Math.abs(amount);

      const updatedExpenses = expenses + Math.abs(amount) ;

      // udating in MB
      const response = await fetch(`https://personal-account-manager-app-mern.vercel.app/${user._id}/expense`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      console.log(user._id, newTransaction)
      if (response.ok) {
        toast.success('Transaction added successfully');
        setTransactions(updatedTransactions);
        setBalance(updatedBalance);
        setExpenses(updatedExpenses);
      } else {
        toast.error('Failed to add transaction');
      }
  
      // Clear the input fields
      setText('');
      setAmount('');
  };
    
//   const handleAddTransaction = async (e) => {
//     e.preventDefault();
      
//     if (!text || !amount) {
//       toast.error('Please enter text and amount');
//       return;
//     }
//     setText(`Expenses: ${text}`);
//     const newTransaction = { text, amount };
//     const updatedTransactions = [...transactions, newTransaction];

//     const updatedBalance = amount < 0 ? balance - Math.abs(amount) : balance + Math.abs(amount);
//     const updatedExpenses = amount<0 ? expenses + Math.abs(amount) : expenses;
//     const updatedIncome = amount>0 ? income + Math.abs(amount) : income;
//     // udating in MB
//     const response = await fetch(`https://personal-account-manager-app-mern.vercel.app/${user._id}/transection`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newTransaction),
//     });
//     console.log(user._id, newTransaction)
//     if (response.ok) {
//       toast.success('Transaction added successfully');
//       setTransactions(updatedTransactions);
//       setBalance(updatedBalance);
//       setIncome(updatedIncome);
//       setExpenses(updatedExpenses);
//     } else {
//       toast.error('Failed to add transaction');
//     }

//     // Clear the input fields
//     setText('');
//     setAmount('');
// };



  return (  
    <div>
      <Header />

      <div className="AccountInfo" > 
      <h1 >Account Information</h1>
      <h2 >Username: {user.username}</h2>
      <p className='accountBalance'>Account Balance: {balance}</p>
      <p1 className='income'>Income: {income}</p1>
      <p1 className='expenses'>Expenses: {expenses}</p1>
      </div>

      <form className="TransactionForm">
      <label>Details:</label>
      <input type="text" value={text} onChange={handleTextChange} required />
      <label>Amount:</label>
      <input type="number" value={amount} onChange={handleAmountChange} onClick={() => setAmount("")} required />
      <button type="submit" className='income_button' onClick={handleIncomeTransaction}>Income</button>
      <button type="submit" className='expense_button' onClick={handleExpensesTransaction}>Expenses</button>
      
     </form>
     <div className="TransactionHistory">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <p> {transaction.transectionType} {transaction.text} | {transaction.amount}</p>
          </li>
        ))}
      </ul>
     </div>
  </div>
  )
}

export default Dashboard
