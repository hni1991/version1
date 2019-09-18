import React ,{Component} from 'react';
import './Register.css'

class Register extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="registerArea col-lg-6 col-sm-12">
                  <div class="card card-signin my-5 mx-auto loginForm" id="registerForm">
                        <div class="card-body">
                            <h5 class="card-title text-center">Signup</h5>
                            <form class="form-signin">
                                <div class="row">
                                    <div class="form-label-group col-6">
                                        <input type="text" id="firstName" class="form-control" placeholder="First Name *"
                                            required autofocus/>
                                    </div>
                                    <div class="form-label-group col-6">
                                        <input type="text" id="lastName" class="form-control" placeholder="Last Name *"
                                            required autofocus/>
                                    </div>
                                    <div class="form-label-group col-6">
                                        <select class="custom-select" id="gender">
                                            <option selected>Gender</option>
                                            <option value="1">Female</option>
                                            <option value="2">Male</option>
                                        </select>
                                    </div>
                                    <div class="form-label-group col-6">
                                        <input type="email" id="inputEmail" class="form-control"
                                            placeholder="Email address *" required autofocus/>
                                    </div>
                                    <div class="form-label-group col-6">
                                        <input type="password" id="inputPassword" class="form-control"
                                            placeholder="Password *" required autofocus/>
                                    </div>
                                    <div class="form-label-group col-6">
                                        <input type="text" id="city" class="form-control" disabled="true" placeholder="Hamburg" required
                                            autofocus/>
                                    </div>
                                    <div class="form-label-group col-6">
                                        <input type="number" id="phoneNumber" class="form-control"
                                            placeholder="phoneNumber" required autofocus/>
                                    </div>
                                    <div class="form-label-group col-6">
                                        <select class="custom-select" id="cityArea" required autofocus>
                                            <option selected>Choose your Area *</option>
                                            <option value="1">Hamburg-Mitte</option>
                                            <option value="2">Altona</option>
                                            <option value="3">Eimsbüttel</option>
                                            <option value="4">Hamburg-Nord</option>
                                            <option value="5">Wandsbek</option>
                                            <option value="6">Bergedorf</option>
                                            <option value="7">Harburg</option>
                                        </select>
                                    </div>
                                 
                                  
                                        <div class="form-label-group col-6">
                                        <input type="text" id="Street" class="form-control"
                                            placeholder="Street"/>
                                    </div>
                                    <div class="form-label-group col-6">
                                        <input type="number" id="houseNumber" class="form-control"
                                            placeholder="House Number"/>
                                    </div>
                                    <div class="form-label-group col-6">
                                        <input type="number" id="plz" class="form-control"
                                            placeholder="PLZ"/>
                                    </div>
                                    <div class="form-label-group col-6">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="inputImage"
                                                aria-describedby="inputGroupFileAddon04"/>
                                            <label class="custom-file-label" for="inputGroupFile04">Your Image</label>
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input"/>
                                    <label class="custom-control-label" for="customCheck1">Remember password</label>
                                </div>
                                <button class="btn btn-lg btn-primary btn-block text-uppercase"
                                    type="submit">Signup</button>
                                <hr class="my-4"/>
                            </form>
                            <span>Have tou already an account ?</span>
                            <span><a onclick="loginBtn()" href="#">Sign In</a> here</span>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Register;