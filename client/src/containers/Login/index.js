import React, { Component } from 'react';
import { isEmail } from 'validator';
import httpClient from '../../httpInstance';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';

import 'react-toastify/dist/ReactToastify.min.css'; 
import './style.css';   

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginButtonActive: false,
            isValidEmail: "default",
            isValidPassword: "default",
            emailValue: "",
            passwordValue: "",
            isLoading: false,
            token: null
        }
    }
    emailChange = e => {
        this.setState({
            emailValue: e.target.value
        },() => this.validateEmail());
        
    }
    passwordChange = e => {
        this.setState({
            passwordValue: e.target.value
        },() => this.validatePassword());
    }
    validateEmail = () => {
        if(isEmail(this.state.emailValue)){
            this.setState({
                isValidEmail: "valid"
            },() => this.validateButton())
        } else {
            this.setState({
                isValidEmail: "invalid"
            },() => this.validateButton())
        }
    }
    validatePassword = () => {
        if(this.state.passwordValue.length >= 6 && this.state.passwordValue.length <= 18){
            this.setState({
                isValidPassword: "valid"
            },() => this.validateButton())
        } else {
            this.setState({
                isValidPassword: "invalid"
            },() => this.validateButton())
        }
    }
    validateButton = () => {
        let { isValidEmail, isValidPassword } = this.state;
        this.setState({
            loginButtonActive: isValidEmail === "valid" && isValidPassword === "valid"
        })
    }
    onClickLogin = () => {
        this.setState({
            isLoading: true
        })
        const { emailValue, passwordValue } = this.state;

        httpClient.post('login', {
            email: emailValue,
            password: passwordValue
        }).then( data => {
                localStorage.setItem("token", data.data.data._id);
                localStorage.setItem("userName", data.data.data.name);
                localStorage.setItem("gender", data.data.data.gender);
                this.forceUpdate();
        }).catch( err => {
            this.setState({
                isLoading: false,
                isValidEmail: "invalid",
                isValidPassword: "invalid"
            },() => {
                this.validateButton();
                toast.error("invalid email or password", {
                    position: "top-center",
                    autoClose: 6000, 
                    closeButton: true
                })
            })
        })  
    }
    render(){
        return(
            <main className="Login container-fluid flex justify-center align-center">

              {localStorage.getItem("token") && <Redirect to="/users"/>}
                
                <ToastContainer />

                <ReactLoading type="spin" className={ this.state.isLoading? "" : "none" }/>

                <div className={ "loginForm flex column align-center" + (this.state.isLoading? " none" : "") }>
                    <label>
                        <p>Email</p>
                        <input 
                            className={ "input-" + this.state.isValidEmail }
                            onChange={ this.emailChange }  
                            type="text" 
                            required={ true }
                            placeholder="user1@gmail.com"
                        />
                    </label>
                    <label>
                        <p>Password</p>
                        <input 
                            className={ "input-" + this.state.isValidPassword }
                            onChange={ this.passwordChange }
                            type="password" 
                            required={ true }
                            placeholder="user1111"
                        />
                    </label>
                    <input 
                        className="btn"
                        onClick={ this.onClickLogin }
                        type="button" 
                        value="Log In"
                        disabled={ !this.state.loginButtonActive }
                    />
                </div>
            </main>
        )
    }
}