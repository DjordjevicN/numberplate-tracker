import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actionCreator from '../Store/Actions'
import FormData from 'form-data'
function AddFoundPlate(props) {
    const [inputStage, setInputStage] = useState(1)
    const [plateNumber, setPlateNumber] = useState('')
    const [address, setAddress] = useState('')
    const [message, setMessage] = useState('')
    // const [longitude, setLongitude] = useState('')
    // const [latitude, setLatitude] = useState('')
    const [warning, setWarning] = useState(false)
    let plateStatusChecker = async (data) => {
        let plateNumber = data.plateNumber;
        await props.plateChecker(plateNumber);
    }
    let onSubmit = () => {
        let data = {
            plateNumber,
            address,
            longitude: '',
            latitude: '',
            message,
            users_id: props.authUser.id,
            found: 1
        }
        if (data.plateNumber !== '' && data.message !== '') {
            props.createFoundPlate(data)
            plateStatusChecker(data)
            setInputStage(2)
        } else {
            setWarning(true)
        }
    }
    const handleFile = async (e) => {

        const formData = new FormData()
        formData.append("picture", e.target.files[0])
        formData.append('newPlateAdded', props.newPlateAdded.insertId)
        await fetch("http://api.tablice.nikola-djordjevic.com/picture", {
            method: "POST",
            body: formData
        }).then(res => res.json())
    }


    // let gpsLocation = () => {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         setLongitude(position.coords.longitude)
    //         setLatitude(position.coords.latitude)
    //     });
    // }





    return (
        <div className="formWrapper">
            <div className="formContent">
                <h1 className='formTitle'>Dodaj Tablicu</h1>
                {inputStage === 1 ? <div className='form'>
                    <p className='inputLabel'>Broj tablice <span>*</span></p>
                    {warning ? <p className='inputLabelWarning'>Ova polja moraju da budu popunjena </p> : null}
                    <input className={warning ? `formInput inputWarning` : `formInput`} type="text" placeholder='BG432CS' onChange={(e) => {
                        e.preventDefault()
                        setPlateNumber(e.target.value)
                    }} />
                    {/* <p className='submitBTN formInput' onClick={() => {
                        gpsLocation()
                    }} >Ostavi GPS lokaciju</p>
                    <div className='latLong'>
                        <p className='inputLabel'>latitude</p>
                        <p className='longitude  formInput'>{latitude}</p>
                        <p className='inputLabel'>longitude</p>
                        <p className='latitude  formInput'>{longitude}</p>
                    </div> */}

                    <p className='inputLabel'>Adresa</p>
                    <input className='formInput' type="text" placeholder='npr. Jurija Gagarina 12' onChange={(e) => {
                        setAddress(e.target.value)
                    }} />
                    <p className='inputLabel'>Poruka <span>*</span></p>
                    {warning ? <p className='inputLabelWarning'>Ova polja moraju da budu popunjena </p> : null}
                    <textarea data-gramm_editor="false" className={warning ? `formInput inputWarning` : `formInput`} type="textarea" placeholder='Ostavite poruku' onChange={(e) => {
                        e.preventDefault()
                        setMessage(e.target.value)
                    }} />

                    <p className='submitBTN formInput' onClick={() => {
                        onSubmit()

                    }} >Submit</p>
                </div> : <div>
                        <p className='inputLabel'>Slika</p>
                        <input type="file" placeholder='Dodaj Sliku' name='image' className='pictureInput' onChange={(e) => {
                            e.preventDefault()
                            handleFile(e)
                        }} />
                        <Link to="/" className=' link'><p className='submitBTN formInput '>Upload</p></Link>
                    </div>}

                <div className="tut">
                    <p ><span>Broj Tablice</span> unesite broj bez razmaka ,- ,= ,/</p>
                    <p ><span>Adresa</span> adresu koju unesete ce biti prikazana kao GPS pin na mapi</p>
                </div>
            </div>
        </div >
    );
}
const mapStateToProps = (state) => {
    return {
        authUser: state.authUser,
        matchedPlates: state.matchedPlates,
        newPlateAdded: state.newPlateAdded
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createFoundPlate: (data) => dispatch(actionCreator.createFoundPlate(data)),
        plateChecker: (plateNumber) => dispatch(actionCreator.plateChecker(plateNumber))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddFoundPlate);


