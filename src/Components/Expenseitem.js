import React from 'react';
import {VscEdit, VscError} from 'react-icons/vsc'

export default function Expenseitem({expense, handleEdit, handleDelete}) {

    const {id, charge, amount} = expense
    return (
        <li className = 'item'>
            <div className="info">
                <span className="expense">{charge}</span>
                <span className="amount">${amount}</span>
            </div>
            <div>
                <button className="edit-btn" aria-label='edit-button' onClick = {()=>handleEdit(id)} >
                    <VscEdit/>
                </button>
                <button className="clear-btn" aria-label='delete-button' onClick ={()=>handleDelete(id)}>
                    <VscError/>
                </button>
            </div>
        </li>
    )
}
