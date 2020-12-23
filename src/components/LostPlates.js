import React from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
function LostPlates(props) {
    // let map = false;
    let plates = props.lostPlates

    return (
        <div className="lostPlatesWrapper">
            <div className="lostPlatesContent">
                {plates && plates.map((item) => (
                    <div className="lostPlateCard" key={item.plate_id}>
                        <h1>{item.plateNumber.toUpperCase()}</h1>
                        <p>{item.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        lostPlates: state.lostNumberPlates
    }
}
export default connect(mapStateToProps, null)(LostPlates);


