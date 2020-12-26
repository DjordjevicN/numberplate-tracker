import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { IoIosAddCircle } from "react-icons/io";
import * as actionCreator from '../Store/Actions'
function Menu(props) {
    let userLogged = Object.keys(props.authUser).length === 0 ? false : true;
    return (
        <div className='menuWrapper'>
            <div className="menuContent">
                <Link className="logo link" to='/'>Izgubljene-tablice.com</Link>
                <div className='menuActions'>

                    {userLogged ?
                        <div className=" ">
                            <Link className="link menuItem" to='/profile' onClick={() => {
                                props.getPlatesIPosted(props.authUser.id)
                            }}>Profil</Link>
                            <Link className="link menuLogin" to='/' onClick={() => {
                                props.logoutUser()
                            }}>Logout</Link>
                        </div> :
                        <Link className="link menuItem" to='/login'>Login</Link>}
                </div>
            </div>
            {userLogged ? <Link to='/addFoundPlate' className='signUpBtn  link'><IoIosAddCircle className='addAction' /></Link> : <Link to='/signUp' className='signUpBtn link'><IoIosAddCircle className="addAction" /></Link>}
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
        logoutUser: () => dispatch(actionCreator.logoutUser()),
        getPlatesIPosted: (id) => dispatch(actionCreator.getPlatesIPosted(id)),


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

