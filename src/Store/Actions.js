import Axios from 'axios'
let hosting = "http://localhost:3001"
// let hosting = "http://api.izgubljene-tablice.com"

export const findNumberplate = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        let response = await Axios.get(`${hosting}/findNumberplate/${value}`);
        dispatch({
            type: 'SET_FOUND_NUMBER_PLATES',
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
export const getPlatesIPosted = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        let response = await Axios.get(`${hosting}/getPlatesIPosted/${value}`);
        dispatch({
            type: 'PLATES_I_FOUND',
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
export const plateChecker = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        let response = await Axios.get(`${hosting}/plateChecker/${value}`);
        dispatch({
            type: 'SET_MATCHED_PLATE',
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
export const createLostPlate = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })

        await Axios.post(`${hosting}/createLostPlate`, { value })
        dispatch({
            type: 'LOADING_FALSE'
        })
        // dispatch({
        //     type: "NOTIFICATION",
        //     payload: post.data.notification
        // })
        // if (post.data.status) {
        //     notifications.success(post.data.notification)
        // } else {
        //     notifications.fail(post.data.notification)
        // }
    }
}
export const createFoundPlate = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        // if (value.taskAddress) {
        //     const response = await Axios.get(` https://api.opencagedata.com/geocode/v1/json?q=${value.taskAddress}&key=aa1b2e2507e3478f9059aabe4850e45f&language=en&pretty=1`)
        //     value.taskLatitude = response.data.results[0].geometry.lat
        //     value.taskLongitude = response.data.results[0].geometry.lng
        // }
        let response = await Axios.post(`${hosting}/createFoundPlate`, { value })
        console.log(response);
        dispatch({
            type: 'SET_NEW_PLATE',
            payload: response.data.results
        })
        dispatch({
            type: 'LOADING_FALSE'
        })
        // dispatch({
        //     type: "NOTIFICATION",
        //     payload: post.data.notification
        // })
        // if (post.data.status) {
        //     notifications.success(post.data.notification)
        // } else {
        //     notifications.fail(post.data.notification)
        // }
    }
}
export const createUser = (value) => {
    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        const response = await Axios.post(`${hosting}/createUser`, { value })
        console.log(response);
        // dispatch({
        //     type: "NOTIFICATION",
        //     payload: response.data.notification
        // })
        // if (response.data.status) {
        //     notifications.success(response.data.notification)
        // } else {
        //     notifications.fail(response.data.notification)
        // }
        dispatch({
            type: 'LOADING_FALSE'
        })
    }
}
// LOGIN USER
export const loginUser = (value) => {

    return async (dispatch) => {
        dispatch({
            type: "LOADING_TRUE"
        })
        console.log('vvv');
        const response = await Axios.post(`${hosting}/loginUser`, { value });

        console.log('ovde');
        console.log(response);
        if (response.data.results.length <= 0) {
            // dispatch({
            //     type: "NOTIFICATION",
            //     payload: response.data.notification
            // })
            dispatch({
                type: "LOADING_FALSE"
            })
        } else {
            dispatch({
                type: 'LOGIN_USER',
                payload: response.data.results[0]
            })

            dispatch({
                type: 'SET_LOCAL_STATE_TOKEN',
                payload: response.data.token
            })

        }
    }
}
// LOGOUT USER
export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT_USER"
        })
        dispatch({
            type: 'SET_LOCAL_STATE_LOGOUT'
        })
    }
}