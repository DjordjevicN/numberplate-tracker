import React from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as actionCreator from '../Store/Actions'
function Login(props) {
    const { register, handleSubmit, errors } = useForm()
    let isLoggedIn = props.authUser.id ? true : false;
    if (isLoggedIn) { return <Redirect to='/profile' /> }
    let onSubmit = (data) => {
        props.loginUser(data)
    }
    return (
        <div className="formWrapper">
            <div className="formContent">
                <h1 className='formTitle'>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className='inputLabel'>Email</p>
                    <input type="text"
                        placeholder='example@gmail.com'
                        name='email'
                        ref={register({ required: true })} />
                    <p className='inputLabel'>Password</p>
                    <input
                        type="password"
                        placeholder='Password (min 6 char)'
                        name='password'
                        ref={register({ required: "Password is required", minLength: 6, message: 'Password je kratak' })} />

                    {errors.password && <p>{errors.password.message}</p>}
                    <input type="submit" className='submitBTN' />
                </form>
                <Link to='/signUp' className='link switchForm'>Nemam profil</Link>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        authUser: state.authUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (data) => dispatch(actionCreator.loginUser(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
