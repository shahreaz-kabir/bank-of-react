import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from "axios";

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0.0,
      debitInfo: [],
      debitAmount: 0.0,
      creditInfo: [],
      creditAmount: 0.0,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      }
    }
    
    this.addDebit = this.addDebit.bind(this)
    this.addDebitInfo = this.addDebitInfo.bind(this)
    this.addCredit = this.addCredit.bind(this)
    this.addCreditInfo = this.addCreditInfo.bind(this)
    
  }

  //grabs information from the given API and updates respective values, along with account balance
  componentDidMount = () => {
    axios
      .get("https://moj-api.herokuapp.com/debits")
      .then((response) => {
        const data = response.data;
        let temp = [];
        for(let i = 0; i < data.length; i++) {
          temp = [data[i].description, data[i].amount, data[i].date]; 
          this.setState ({debitInfo: [...this.state.debitInfo, temp], accountBalance: this.state.accountBalance + data[i].amount, debitAmount: this.state.debitAmount + data[i].amount});
        }
      })

    axios
      .get("https://moj-api.herokuapp.com/credits")
      .then((response) => {
        const data = response.data;
        let temp = [];
        for(let i = 0; i < data.length; i++) {
          temp = [data[i].description, data[i].amount, data[i].date];
          this.setState ({ creditInfo: [...this.state.creditInfo, temp], accountBalance: this.state.accountBalance - data[i].amount, creditAmount : this.state.creditAmount + data[i].amount});
        }
      })
      
  };
  
 //updates numerical information of Debit
  addDebit (event)
  {

    this.setState({accountBalance: this.state.accountBalance + event, debitAmount: this.state.debitAmount + event})

  }

  //updates description of added debit
  addDebitInfo(event)
  {
    this.setState({ debitInfo :[event, ...this.state.debitInfo]})
  }

  //updates numerical information of credit
  addCredit(event)
  {

    this.setState({accountBalance: this.state.accountBalance - event, creditAmount: this.state.creditAmount + event})
  }

  //updates description of added credit
  addCreditInfo(event)
  {
    this.setState({ creditInfo :[event, ...this.state.creditInfo]})   
  }


  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
    const DebitsComponent = () => (<Debits  addDebit={this.addDebit} addDebitInfo = {this.addDebitInfo} debitInfo={this.state.debitInfo} debitAmount={this.state.debitAmount}/>);
    const CreditsComponent = () => (<Credits  addCredit={this.addCredit} addCreditInfo={this.addCreditInfo} creditInfo={this.state.creditInfo} creditAmount={this.state.creditAmount}/>);

    return (
      <Router>
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>   
        </div>
      </Router>
    );
  }
}

export default App;
