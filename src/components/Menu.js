import React from 'react';
import { Link } from 'react-router-dom'
function Menu() {
    let userLogged = true
    return (
        <div className='menuWrapper'>
            <div className="menuContent">
                <Link className="logo link" to='/'>Izgubljene-tablice.com</Link>
                <Link className="logo link" to='/foundPlate'>Pronadjene</Link>
                <Link className="logo link" to='/plateNotFound'>nije pronadjeno</Link>
                <Link className="logo link" to='/lostPlates'>izgubljena</Link>
                {userLogged ? <Link to='/addFoundPlate' className='signUpBtn link'>+ Dodaj tablicu</Link> : <Link to='/signUp' className='signUpBtn link'>Uloguj Se</Link>}


            </div>
        </div>
    );
}

export default Menu;
