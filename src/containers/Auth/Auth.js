import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions';
import { Redirect } from 'react-router';
import { Route, withRouter } from 'react-router-dom';

class Auth extends Component {
    state = {
        auth: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'ایمیل شما',
                    placeholder: 'ایمیل خود را وارد کنید.'
                },
                value: '',
                validation: {
                    shouldValidate: true,
                    isValid: false,
                    touched: false,
                    rules: {
                        required: true,
                        email: true
                    }
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    label: 'رمز عبور شما',
                    placeholder: 'رمز ععبور خود را وارد کنید.'
                },
                value: '',
                validation: {
                    shouldValidate: true,
                    isValid: false,
                    touched: false,
                    rules: {
                        required: true,
                        minLength: 6
                    }
                }
            }
        },
        authForm: {
            email: '',
            password: ''
        },
        isSignup: true
    }

    
    onUpdateInput = (event) => {
        const authForm = {
            ...this.state.auth
        };
        const inputForm = authForm[event.target.name];
        inputForm.value = event.target.value;
        inputForm.validation.isValid = this.checkValidaty(event.target.name, event.target.value);
        inputForm.validation.touched = true;
        this.setState({authForm: authForm})
    }

    checkValidaty = (name, value) => {
        const inputOrderForm = this.state.auth[name]['validation'];
        if (!inputOrderForm.shouldValidate)
            return true;
        let isValid = true;
        if (inputOrderForm.rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (inputOrderForm.rules.minLength) {
            isValid = value.length >= inputOrderForm.rules.minLength && isValid;
        }
        if (inputOrderForm.rules.maxLength) {
            isValid = value.length <= inputOrderForm.rules.maxLength && isValid;
        }
        if (inputOrderForm.rules.email) {
            isValid = value.includes('@') && isValid;
        }
        return isValid;
    }

    switchAuth = () => {
        this.setState({isSignup: !this.state.isSignup});
    }
    render() {
        const elements = [];
        let authAllowed = true;
        for (let key in this.state.auth) {
            const el = this.state.auth[key];
            const createdInput = <Input 
                invalid={!el.validation.isValid && el.validation.touched}
                changeHandler={this.onUpdateInput}
                key={key}
                name={key}
                inputtype={el.elementType}
                config={el.elementConfig}
                value={el.value} />

            authAllowed = authAllowed && el.validation.isValid;
            elements.push(createdInput);
        }
        
        let form = <Spinner />
        if ( this.props.history.location.pathname.split('/')[2] == 'logout') {
            console.log(this.props.history);
            this.props.onLogout();
        }
        
        if (!this.props.loading) {
            form = (
                <div>
                    {
                        this.props.error ?
                            (
                                <div>
                                    <p>خطایی رخ داده است!</p>
                                    <p>{ this.props.error }</p>
                                </div>
                            )
                        : ''
                    }
                    <form>
                        { elements }
                    </form>
                    <Button disabled={!authAllowed} clicked={() => this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignup)} btnType="Success">{this.state.isSignup ? 'ثبت نام' : 'ورود'}</Button>
                    <Button clicked={this.switchAuth} btnType="Danger">{this.state.isSignup ? 'تغییر به ورود' : 'تغییر به ثبت نام'}</Button>
                    {this.props.authenticated ? <Redirect to="/" /> : null}
                </div>
            )
        }
        return (
            <div style={{textAlign: 'center'}}>
                { form }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        authenticated: state.auth.isAuthenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(authActions.authStart(email, password, isSignup)),
        onLogout: () => dispatch(authActions.authLogOut())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));