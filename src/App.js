import React, { Component } from 'react'
import School from '../build/contracts/School.json'
import ReportCard from '../build/contracts/ReportCard.json'
import Web3 from 'web3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Name: '',
      SchoolAddress: '',
      ReportCardAddress: '',
      ReportCardAddress2: '',
      Students: []
    }
  }

  componentWillMount() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    // So we can update state later.
    var self = this

    // Get the RPC provider and setup our SimpleStorage contract.
    const provider = new Web3.providers.HttpProvider('http://localhost:8545')
    const contract = require('truffle-contract')
    const school = contract(School)
    const rc = contract(ReportCard)
    school.setProvider(provider)
    rc.setProvider(provider)

    // Get Web3 so we can get our accounts.
    const web3RPC = new Web3(provider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var schoolInstance
    var rcInstance
    var studs = []
    // Get accounts.
    web3RPC.eth.getAccounts(function(error, accounts) {
      console.log(accounts)

      school.deployed().then(function(instance) {
        schoolInstance = instance
        return schoolInstance.getSchoolName();
      }).then(function(result) {
        // Update state with the result.
        self.setState({ Name: web3RPC.toAscii(result) })
        return schoolInstance.address;
      }).then(function(result){
        return self.setState({SchoolAddress: result})
      })
 
       rc.new(accounts[1], {from:accounts[1], gas: 500000}).then(function(instance){

        rcInstance = instance
        console.log(instance)
        return rcInstance.address;
      }).then(function(result){
        self.setState({ReportCardAddress: result});
        return rcInstance.enroll(schoolInstance.address, 'Novak', {from:accounts[0], gas:500000});
        //schoolInstance.enterGrades(result, 'Math', 4, {from:accounts[0], gas:500000});
      }).then(function(result){
        console.log('enroll:', result);
        //schoolInstance.enterGrades()
      })
 

   
       rc.new(accounts[1], {from:accounts[1], gas: 500000}).then(function(instance){

        rcInstance = instance
        console.log(instance)
        return rcInstance.address;
      }).then(function(result){
        self.setState({ReportCardAddress2: result});
        return rcInstance.enroll(schoolInstance.address, 'Skylar', {from:accounts[0], gas:500000});
        //schoolInstance.enterGrades(result, 'Math', 4, {from:accounts[0], gas:500000});
      }).then(function(){

        return schoolInstance.getNumberOfReportCards.call();
      }).then(function(result){
              console.log('cards:', result);
              for (var index = 0; index < result; index++) {
                schoolInstance.getStudentName.call(index).then(function(name){
                    studs.push(name);
                });
                
                //var element = array[index];
                console.log('number:', index);
        
            }
            console.log(studs);
            self.setState({Students: studs });
      })
/*
      for (var index = 0; index < array.length; index++) {
        var element = array[index];
        
      }
*/ 

   })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
            {/*}<ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">News</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Sports</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Finance</a></li>
            </ul>*/}
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <p>Your Truffle Box is installed and ready.</p>
              <h2>Smart Contract Example</h2>
              <p>The below will show a school name by default if your contracts compiled and migrated successfully.</p>
              <p>The school name is: {this.state.Name}</p>
              <p>The school address is: {this.state.SchoolAddress}</p>
              <p>The report card address of the 1st student is: {this.state.ReportCardAddress}</p>
              <p>The report card address of the 2nd student is: {this.state.ReportCardAddress2}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
