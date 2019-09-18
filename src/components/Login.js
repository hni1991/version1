import React ,{Component} from 'react';
import './Login.css'

class Login extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="loginArea col-lg-6 col-sm-12">
                 <div class="card card-signin my-5">
                        <div class="card-body formArea mx-auto col-8">
                            <h5 class="card-title text-center">Sign In</h5>
                            <form class="form-signin">
                                <div class="form-label-group">
                                    <label for="inputEmail">Email address</label>
                                    <input type="email" id="loginEmail" class="form-control" placeholder="Email address"
                                        required autofocus/>
                                </div>
                                <div class="form-label-group">
                                    <label for="inputPassword">Password</label>
                                    <input type="password" id="loginPassword" class="form-control"
                                        placeholder="Password" required/>
                                </div>
                                <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input"/>
                                    <label class="custom-control-label" for="customCheck1">Remember password</label>
                                </div>
                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign
                                    in</button>
                                <hr class="my-4"/>
                            </form>
                            <span>Don't have an account ?</span>
                            <span onclick="registerBtn()"/><span><a  href="#">signup</a> here </span>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Login;