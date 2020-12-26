import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actionCreator from '../Store/Actions'
import FoundPlate from './FoundPlate'

function Home(props) {
    let [numberPlate, setNumberPlate] = useState('')
    let [searchActive, setSearchActive] = useState(false)

    const handleSubmit = () => {
        props.findNumberplate(numberPlate)
    }
    return (
        <div className='homeWrapper'>
            <div className="statistics">
                <div className="totalLost statisticsItem"><span>2042</span> Izgubljenih tablica </div>
                <div className="totalFound statisticsItem"><span>1292</span> Pronadjenih tablica</div>
                <div className="totalClaimed statisticsItem"><span>853</span> Preuzete</div>
            </div>
            <div className="homeContent">

                {searchActive && props.loading === false ? <div>
                    {props.foundNumberPlates.length <= 0 ? <div className="plateNotFoundInformation">
                        <h1>Tablica "{numberPlate}" nije pronadjena</h1>
                        <div className="plateNotFoundInstructions">
                            <p className="notFoundInstructionsTitle">Kako mozemo da vam pomognemo</p>
                            <p className="notFoundInstructionsTab">1. Napravi nalog</p>
                            <p className="notFoundInstructionsTab">2. Oglasi tablicu kao izgubljena</p>
                            <p className="notFoundInstructionsTitle">Ukoliko neko nadje tablicu obavesticemo vas na vas email</p>
                        </div>

                        {props.authUser.id ? <Link to='/addLostPlate' className='addLostPlateBtn link' >Oglasi</Link> : <Link to='/signUp' className='addLostPlateBtn link' >Oglasi</Link>}
                    </div> : <FoundPlate />}
                </div> : <div className="hero">
                        <h1>IZGUBIO SI TABLICU ?</h1>
                    </div>}

                <div className="searchWrapper">
                    <div className="search">
                        <div className='searchInputBlock'>
                            <input type="text" placeholder='BG456CS' className="searchInput" onChange={(e) => {
                                e.preventDefault()
                                if (e.target.value === ' ') {
                                    console.log('prazno');
                                }
                                setNumberPlate(e.target.value)
                            }} />
                            <p className="searchBTN" onClick={() => {
                                handleSubmit()
                                setSearchActive(true)
                            }} >TRAŽI</p>
                        </div>
                        <div className="tut">
                            <p>Unesite broj tablice <span>bez razmaka, - , = , /.</span></p>
                            <p>  Slova <span> Đ,Š,Č,Ć,Ž mogu da se koriste </span> ali svakako probajte da trazite i bez kvacica (npr. ČŠ kao CS), mozda neko ne koristi cirilicnu tastaturu a uneo je tablicu kao pronadjenu.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        authUser: state.authUser,
        foundNumberPlates: state.foundNumberPlates,
        loading: state.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        findNumberplate: (numberPlate) => dispatch(actionCreator.findNumberplate(numberPlate))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

