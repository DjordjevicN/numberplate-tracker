import React from 'react';

function PlateNotFound() {
    return (
        <div className='plateNotFoundWrapper'>
            <div className="plateNotFoundContent">
                <div className="plateNotFoundInformation">
                    <h1>Tablica nije pronadjena</h1>
                    <div className="plateNotFoundInstructions">
                        <p className="notFoundInstructionsTitle">Kako mozemo da vam pomognemo</p>
                        <p className="notFoundInstructionsTab">1. Napravi nalog</p>
                        <p className="notFoundInstructionsTab">2. Oglasi tablicu kao izgubljena</p>
                        <p className="notFoundInstructionsTitle">Ukoliko neko nadje tablicu obavesticemo vas na vas email</p>
                    </div>
                    <p className='addLostPlateBtn'>Oglasi</p>
                </div>
                {/* <div className="searchWrapper">
                    <div className="search">
                        <div className='searchInputBlock'>
                            <input type="text" placeholder='BG456CS' className="searchInput" />
                            <p className="searchBTN">TRAŽI</p>
                        </div>
                        <div className="tut">
                            <p>when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially </p>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}


export default PlateNotFound


