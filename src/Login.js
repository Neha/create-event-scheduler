import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
            this.state ={
                userName :'',
                password : '',
                displayError : 'hidden'
        }
    }

    onHandleChange = e => {
       this.setState({
            [e.target.name] : e.target.value
        })
    }
    
    validateCredintials = (e) => {
        e.preventDefault();
         if(this.state.userName == 'test' && this.state.password == 'test') {
          this.props.history.push('/ScheduleEvent');
        }
        else{
            this.setState({
                displayError : 'show'
            })
        }
    }

    render(){
        return(
            <div>
                <h2>Start the Magic:</h2>
                <p>You can use 'test' and 'test' as username and password :)</p>
                <div className={this.state.displayError}>Wrong credintials. We are stil using 'test' as username and password.</div>
                <form>
                <label>User Name</label>
                <input type="text" 
                        placeholder="Enter your name" 
                        name="userName" 
                        onChange={e => {this.onHandleChange(e)}}/>
    
                <label>Password</label>
                <input type="password" 
                       placeholder="Enter your password" 
                       name="password"
                       onChange={e => {this.onHandleChange(e)}}/>
    
                <button onClick={(e) => {this.validateCredintials(e)}}>Submit</button>
            </form>
            </div>
        )
    }
}

export default Login;