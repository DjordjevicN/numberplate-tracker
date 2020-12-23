import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FcGlobe } from "react-icons/fc";
function FoundPlate(props) {
    // let map = false;
    let plates = props.foundPlates

    return (
        <div className="fountPlatesWrapper">
            <div className="foundPlatesContent">
                {plates && plates.map((item) => (
                    <div className="cardBlock" key={item.plate_id}>
                        <div className="plateCard" >
                            <Link className="plateCardLink link" to='/map'>
                                <FcGlobe /> MAPA</Link>
                            <img src={item.image} alt="plate" />
                            <p><span>Broj tablice: </span> {item.plateNumber}</p>
                            {item.address && <p><span>Ulica: </span>{item.address}</p>}
                            {item.message && <p><span>Marko: </span>{item.message}</p>}
                        </div>
                        {item.latitude && item.longitude ?
                            <div className="foundPlateMap">
                                MAPA
                            </div>
                            : null}
                    </div>

                ))}
            </div>
        </div>
    );
}



const mapStateToProps = (state) => {

    return {
        foundPlates: state.foundNumberPlates
    }
}


export default connect(mapStateToProps, null)(FoundPlate);
