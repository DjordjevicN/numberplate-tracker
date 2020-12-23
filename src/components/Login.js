import React from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actionCreator from '../Store/Actions'
function Login(props) {
    const { register, handleSubmit, errors } = useForm()
    let onSubmit = (data) => {
        props.loginUser(data)
    }
    return (
        <div className="formWrapper">
            <div className="formContent">
                <h1 className='formTitle'>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input type="text"
                        placeholder='Email'
                        name='email'
                        ref={register({ required: true })} />

                    <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        ref={register({ required: "Password is required", minLength: 6, message: 'Password je kratak' })} />

                    {errors.password && <p>{errors.password.message}</p>}
                    <input type="submit" className='submitBTN' />
                </form>
                <Link to='/signUp' className='link'>Nemam profil</Link>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        lostPlates: state.lostNumberPlates
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (data) => dispatch(actionCreator.loginUser(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
