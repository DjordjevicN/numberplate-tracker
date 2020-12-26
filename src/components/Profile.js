import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FcGlobe } from "react-icons/fc";
import * as actionCreator from '../Store/Actions'
function Profile(props) {
    let plates = props.platesIFound;
    let user = props.authUser;
    console.log(plates);
    return (
        <div className="profileWrapper">
            <div className="profileContent">
                <div className="userInfoWrapper">
                    <div className="gravatar">
                        {user.avatar ? <img className="gravatarImage" src="./images/trumpmeme.jpg" alt="gravatar" /> : <img className="gravatarImage" src="./images/client.png" alt="gravatar" />}

                    </div>
                    <div className="userInfo">
                        <h3>{user.name && user.name}</h3>
                        <p>{user.email && user.email}</p>
                        <p>Pronasao {plates.length} tablica.</p>
                    </div>
                </div>

                <div className="plateIFoundWrapper">
                    <div className="cards">
                        {plates && plates.map((item) => (
                            <div className="cardBlock" key={item.plate_id}>
                                <div className="plateCard" >
                                    <Link className="plateCardLink link" to='/map'>
                                        <FcGlobe /> MAPA</Link>
                                    <img src={`http://localhost:3001/uploads/${item.picture}`} alt="plates" />
                                    <p><span>Broj tablice: </span> {item.plateNumber}</p>
                                    {item.address && <p><span>Ulica: </span>{item.address}</p>}
                                    {item.message && <p><span>Poruka: </span>{item.message}</p>}
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
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        authUser: state.authUser,
        loading: state.loading,
        platesIFound: state.platesIFound
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        findNumberplate: (numberPlate) => dispatch(actionCreator.findNumberplate(numberPlate))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

