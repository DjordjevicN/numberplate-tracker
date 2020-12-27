import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreator from '../Store/Actions'
function Profile(props) {
    let plates = props.platesIFound;
    let user = props.authUser;
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
                        <div className="profileActions">
                            <Link to='/addLostPlate' className='link'><p>Oglasi Izgubljenu tablicu</p></Link>
                            <Link to='/addFoundPlate' className='link'><p>Oglasi Pronadjenu tablicu</p></Link>
                        </div>
                    </div>
                </div>
                <div className="plateIFoundWrapper">
                    <div className="cards">
                        {plates && plates.map((item) => (
                            <div className="cardBlock" key={item.plate_id}>
                                <div className="plateCard" >
                                    {item.picture ? <img src={`http://api.tablice.nikola-djordjevic.com/uploads/${item.picture}`} alt="tablica" /> : null}
                                    <p><span>Broj tablice: </span> {item.plateNumber}</p>
                                    {item.address && <p><span>Adresa: </span>{item.address}</p>}
                                    {item.message && <p><span>Poruka: </span>{item.message}</p>}
                                </div>
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

