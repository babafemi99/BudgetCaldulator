import './App.css';
import Expenseform from './Components/Expenseform';
import Expenselist from './Components/Expenselists'
import Alert from './Components/Alert';
import uuid from'uuid/dist/v4';
import {useState, useEffect} from 'react';



const initialExpenses =localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')) : [];

function App() {
  // all expenses, add expenses
const [expenses, setExpenses] = useState(initialExpenses)
// single expense
const [charge, setCharge] = useState('');
// single amount
const [amount, setAmount] = useState('');
// alert
const [alert, setAlert] = useState({show:false})
// edit
const [edit, setEdit] = useState(false)
//edit item
const [id, setId] = useState(0);

/////////////////use Effect/////
useEffect(()=>(
  localStorage.setItem('expenses',JSON.stringify(expenses))
),[expenses]);

/////// functionality ////////////////
const handleCharge = e =>{
  setCharge(e.target.value)
}
const handleAmount = e =>{
  setAmount(e.target.value)
}
const handleAlert =({type,text})=>{
  setAlert({show:true,type,text})
  setTimeout(() => {
    setAlert({show:false})
  }, 5000);
}
const handleSubmit = e =>{
  e.preventDefault();
  if(charge!=='' && amount >0){

    if(edit){
      let tempExpense = expenses.map((item)=>{
        return item.id===id ? {...item, charge ,amount} : item;
      });
      setExpenses(tempExpense)
      setEdit(false)
      handleAlert({type:'success', text: 'Item eited successfully'})
    }
    else{
      const singleExpense ={id:uuid(),charge,amount}
      setExpenses([...expenses,singleExpense])
      handleAlert({type:'success', text: 'Items added successfully'})
    }
     setCharge('')
     setAmount('')
  }
  else{
    //HAndle Alert
    handleAlert({type:`danger`,text:'check out your inputs!'})
  }};


  // clear items
  const clearItems =()=>{
    console.log('Items cleared');
    setExpenses([])
    handleAlert({type: 'danger', text:'ALL EXPENSES CLEARED !'})
  }

  //handle Delete 
  const handleDelete =(id)=>{
    
    let temp = expenses.filter((item)=>(item.id !== id))
    setExpenses(temp)
    handleAlert({type: 'danger', text:'item deleted !'})
  }
  // handle Edit
  const handleEdit =(id)=>{
    console.log(`${id} edited !`);
    let newExpense = expenses.find((item)=>item.id===id);
    const {charge, amount} = newExpense
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id)
  }

  return (
        <>
        {alert.show && <Alert type ={alert.type} text = {alert.text}/>}
    <Alert/>
    <h1>budget calculator</h1>
    <main className="App">
    <Expenseform
      charge = {charge}
      amount = {amount}
      handleCharge ={handleCharge}
      handleAmount ={handleAmount}
      handleSubmit ={handleSubmit}
      edit ={edit}
    />
    <Expenselist 
      expenses ={expenses} 
      handleDelete ={handleDelete} 
      handleEdit ={handleEdit} 
      clearItems ={clearItems} 
      />
    </main>
    <h1>total spending : <span className="total">
      ${expenses.reduce((acc, curr)=>{
       return acc+=parseInt(curr.amount)
        },0)}
      </span></h1>
    </>
  )
    
}

export default App;
