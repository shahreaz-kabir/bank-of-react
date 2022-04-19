import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Credits extends Component {
    constructor(props) {  
      super(props);
      this.submitIt = this.submitIt.bind(this);
    }
  
  
  
  //Once submit button event occurs, update credit information
  submitIt(event){
      event.preventDefault();
         let temp = [event.target.cDesc.value, event.target.cAmount.value, new Date().toLocaleString()]
    
          this.props.addCredit(Number(event.target.cAmount.value));
          this.props.addCreditInfo(temp)      
  
  }
  
    render() {
  
      return (
          <div >
              <Link to="/">Return to Home</Link>
            
              <div style={{margin:"10%"}}>
              <h1>Credits</h1>
              <h2 >
              ${(Math.round(this.props.creditAmount* 100) / 100).toFixed(2)}
              </h2>
              
            <form  onSubmit={this.submitIt}>    
              <input type='text' name="cDesc" placeholder="Description" />
              <input type='text'  name="cAmount" placeholder="Amount"/>
              <button>Submit</button>
              </form>
  
  
          <div class="col-md-1 text-center"> 
              
                  {this.props.creditInfo.map ((x , index) =>
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
  
  export default Credits;