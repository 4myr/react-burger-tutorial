import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';

const Auth = props => {
    const [auth, setAuth] = useState({
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
    });
    const [authForm, setAuthForm] = useState({
        email: '',
        password: ''
    });
    const [isSignup, setIsSignup] = useState(true);

    
    const onUpdateInput = (event) => {
        const authForm = {
            ...auth
        };
        const inputForm = authForm[event.target.name];
        inputForm.value = event.target.value;
        inputForm.validation.isValid = checkValidaty(event.target.name, event.target.value);
        inputForm.validation.touched = true;
        setAuthForm(authForm);
    }

    const checkValidaty = (name, value) => {
        const inputOrderForm = auth[name]['validation'];
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

    const switchAuth = () => {
        setIsSignup(!isSignup);
    }
    
    const elements = [];
    let authAllowed = true;
    for (let key in auth) {
        const el = auth[key];
        const createdInput = <Input 
            invalid={!el.validation.isValid && el.validation.touched}
            changeHandler={onUpdateInput}
            key={key}
            name={key}
            inputtype={el.elementType}
            config={el.elementConfig}
            value={el.value} />

        authAllowed = authAllowed && el.validation.isValid;
        elements.push(createdInput);
    }
    
    let form = <Spinner />
    if ( props.history.location.pathname.split('/')[2] === 'logout') {
        props.onLogout();
    }
    
    if (!props.loading) {
        form = (
            <div>
                {
                    props.error ?
                        (
                            <div>
                                <p>خطایی رخ داده است!</p>
                                <p>{ props.error }</p>
                            </div>
                        )
                    : ''
                }
                <form>
                    { elements }
                </form>
                <Button disabled={!authAllowed} clicked={() => props.onAuth(authForm.email.value, authForm.password.value, isSignup)} btnType="Success">{isSignup ? 'ثبت نام' : 'ورود'}</Button>
                <Button clicked={switchAuth} btnType="Danger">{isSignup ? 'تغییر به ورود' : 'تغییر به ثبت نام'}</Button>
                {props.authenticated ? <Redirect to="/" /> : null}
            </div>
        )
    }
    return (
        <div style={{textAlign: 'center'}}>
            { form }
        </div>
    );
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