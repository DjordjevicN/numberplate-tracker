import React from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actionCreator from '../Store/Actions'

function SignUp(props) {
    const { register, handleSubmit, errors } = useForm()
    let onSubmit = (data) => {
        props.createUser(data)
    }
    return (
        <div className="formWrapper">
            <div className="formContent">
                <h1 className='formTitle'>Signup</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder='Ime' name='ime' ref={register} />
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
                <Link to='/login' className='link'>Imam profil</Link>
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
        createUser: (data) => dispatch(actionCreator.createUser(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
