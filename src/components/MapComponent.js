
import React, { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { FiClock, FiTag } from "react-icons/fi";
// import { FaMoneyBill } from "react-icons/fa";
import { connect } from 'react-redux'
// const iconMarker = new Icon({
//     iconUrl: "/marker2.svg",
//     iconSize: [40, 40]
// })
function MapComponent(props) {
    const [activePopup, setActivePopup] = useState(null);
    let plates = props.foundNumberPlates
    return (
        <div className='map' >
            <MapContainer center={[44.82081203, 20.41482925]} zoom={11}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {plates && plates.map((item) => (
                    <div key={item.plate_id} >

                        <Marker position={[
                            item.latitude,
                            item.longitude
                        ]}
                            onclick={() => {
                                setActivePopup(item)
                            }}
                        // icon={iconMarker}
                        />

                    </div>
                )
                )}
                {activePopup &&
                    <Popup position={[
                        activePopup.latitude,
                        activePopup.longitude
                    ]}
                        onClose={() => {
                            setActivePopup(null)
                        }}
                    >
                        <div className='mapPopupWrapper'>
                            <div className="mapPopupContent">

                            </div>
                        </div>
                    </Popup>
                }
            </MapContainer>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        foundNumberPlates: state.foundNumberPlates

    }
}

export default connect(mapStateToProps, null)(MapComponent)