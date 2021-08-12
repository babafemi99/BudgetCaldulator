import React from 'react';
import Item from './Expenseitem'
import { VscTrash } from "react-icons/vsc";

export default function Expenselists(props) {
 const {expenses, handleEdit, handleDelete, clearItems} = props
    return (
        <>
           <ul className="lst">
               {
                   expenses.map((item)=>(
                        <Item key ={item.id} expense = {item} handleDelete={handleDelete} handleEdit ={handleEdit} />
                   ))
               }
           </ul>
           {
               expenses.length > 0 && <button className="btn"  onClick ={clearItems}>clear expenses <VscTrash className = 'btn-icon' /> </button>
           }
        </>
    )
}
