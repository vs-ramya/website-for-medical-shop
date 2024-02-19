import { Fragment, useState } from "react"
const Form=(props) => {
    const[name,setname]=useState('');
    setname
    return (
        <Fragment>
            <div>
            
        <label>  Medicine Name : </label>
        <input type="text"/>
       <label>  Description : </label>
       <input type="text"/>
       <label>  Price : </label>
       <input type="number"></input>
       <label>  Quantity Available : </label>
       <input type="number"></input> 
      
      <button>Add Product</button> 
      
        
        </div>
        
        </Fragment>
    )
        
    }
    export default Form;