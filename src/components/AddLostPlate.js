import React from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import * as actionCreator from '../Store/Actions'
function AddLostPlate(props) {
    const { register, handleSubmit, errors } = useForm()
    let onSubmit = (data) => {
        data.owner_id = props.authUser.id;
        data.found = 0
        props.createLostPlate(data)
    }

    return (
        <div className="formWrapper">
            <div className="formContent">
                <h1 className='formTitle'>Oglasi Tablicu</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className='inputLabel'>Broj tablice</p>
                    <input type="text"
                        placeholder='BG432CS'
                        name='plateNumber'
                        ref={register({ required: true })} />
                    <p className='inputLabel'>Poruka</p>
                    <input
                        type="textarea"
                        placeholder='Ostavite poruku'
                        name='message'
                        ref={register({ required: true })} />
                    {errors.password && <p>{errors.password.message}</p>}
                    <input type="submit" className='submitBTN' />
                </form>

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
        createLostPlate: (data) => dispatch(actionCreator.createLostPlate(data))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddLostPlate);


