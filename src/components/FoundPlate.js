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
                                {item.latitude && item.longitude ?
                                    <div className="foundPlateMap">
                                        <FcGlobe /> MAPA
                            </div>
                                    : null}    </Link>
                            <img src={`http://api.tablice.nikola-djordjevic.com/uploads/${item.picture}`} alt="plate" />
                            <p><span>Broj tablice: </span> {item.plateNumber}</p>
                            {item.address && <p><span>Ulica: </span>{item.address}</p>}
                            {item.message && <p><span>Poruka: </span>{item.message}</p>}
                        </div>


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
