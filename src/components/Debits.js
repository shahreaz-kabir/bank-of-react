// src/components/Debits.js
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Debits extends Component {
  constructor(props) {  
    super(props);
    this.submitIt = this.submitIt.bind(this);

  }



//Once submit button event occurs, update debit information
submitIt(event){
    event.preventDefault();
       let temp = [event.target.dDesc.value, event.target.dAmount.value, new Date().toLocaleString()]
  
        this.props.addDebit(Number(event.target.dAmount.value));
        this.props.addDebitInfo(temp)      

}

  render() {

    return (
        <div >
            <Link to="/">Return to Home</Link>
          
            <div style={{margin:"10%"}}>
            <h1>Debits</h1>
            <h2 >
            ${(Math.round(this.props.debitAmount* 100) / 100).toFixed(2)} 
            </h2>
            
          <form  onSubmit={this.submitIt}>    
            <input type='text' name="dDesc" placeholder="Description" />
            <input type='text'  name="dAmount" placeholder="Amount"/>
            <button>Submit</button>
            </form>


        <div class="col-md-1 text-center"> 
            
                {this.props.debitInfo.map ((x , index) =>
                      <div key = {index} style={{border:"2px black solid"}}>
                        <p class="list-group-item"  > Description: {x[0]}</p>   
                        <p  class="list-group-item"> Amount: ${x[1]} </p>
                        <p  class="list-group-item "> Date:  {x[2]} </p>
                          </div>)}  
                </div>                   
            </div>
        </div>
    );
  }
}

export default Debits;

