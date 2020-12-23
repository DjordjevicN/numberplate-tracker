import React from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux'
import * as actionCreator from '../Store/Actions'
function AddFoundPlate(props) {
    const { register, handleSubmit, errors } = useForm()
    console.log(props.authUser.id);



    let plateStatusChecker = async (data) => {
        let plateNumber = data.plateNumber;
        await props.plateChecker(plateNumber);
        if (props.matchedPlates.length > 0) {
            console.log("SENDING EMAIL");
        }
        return

    }



    let onSubmit = (data) => {
        data.users_id = props.authUser.id;
        data.found = 1;
        // console.log(data);
        // upload data
        // props.createFoundPlate(data)
        plateStatusChecker(data)

    }

    return (
        <div className="formWrapper">
            <div className="formContent">
                <h1 className='formTitle'>Dodaj Tablicu</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className='inputLabel'>Slika</p>
                    <input type="file" placeholder='Dodaj Sliku' name='image' className='fileInput' ref={register()} />
                    <p className='inputLabel'>Broj tablice <span>*</span></p>
                    <input type="text"
                        placeholder='BG432CS'
                        name='plateNumber'
                        ref={register({ required: true })} />

                    <p className='inputLabel'>Adresa</p>
                    <input type="text"
                        placeholder='npr. Jurija Gagarina 12'
                        name='address'
                        ref={register()}
                    />
                    <p className='inputLabel'>Poruka <span>*</span></p>
                    <input
                        type="textarea"
                        placeholder='Ostavite poruku'
                        name='message'
                        ref={register({ required: true })} />
                    {/* {errors.password && <p>{errors.password.message}</p>} */}
                    <input type="submit" className='submitBTN' />
                </form>
                <p className='tut'>ambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of </p>
                <button onClick={() => {
                    plateStatusChecker()
                }}>TEST</button>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        authUser: state.authUser[0],
        matchedPlates: state.matchedPlates
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createFoundPlate: (data) => dispatch(actionCreator.createFoundPlate(data)),
        plateChecker: (plateNumber) => dispatch(actionCreator.plateChecker(plateNumber))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFoundPlate);
