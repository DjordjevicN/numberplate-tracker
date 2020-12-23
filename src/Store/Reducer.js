
const initState = {
    authUser: [
        { id: 33 }
    ],
    lostNumberPlates: [
        {
            plate_id: 1,
            active: true,
            found: false,
            claimed: false,
            plateNumber: 'bg232cs',
            latitude: '',
            longitude: '',
            address: 'Jurija gagarina',
            image: './images/testPlate.jpg',
            message: 'pronagjena tablica kod bajlonove pijace u bunaru kod levog cigana sto prodaje duvan',
            user_id: 90,
            owner_id: null,
        },
        {
            plate_id: 2,
            active: true,
            found: false,
            claimed: false,
            plateNumber: 'bg232cs',
            latitude: '',
            longitude: '',
            address: '',
            image: './images/testPlate.jpg',
            message: 'pronagjena tablica kod bajlonove pijace pored bunara Uzo cigan',
            user_id: '',
            owner_id: null,
        }
    ],
    foundNumberPlates: [],
    matchedPlates: [],
    loading: false,
    success: '',
    message: ''

}
const Reducer = (state = initState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case "UPDATE_LOST_PLATES":
            newState.lostNumberPlates = newState.lostNumberPlates.concat(action.payload)
            break;
        case "SET_FOUND_NUMBER_PLATES":
            newState.foundNumberPlates = action.payload;
            break;
        case "SET_MATCHED_PLATE":
            newState.matchedPlates = action.payload;
            break;
        case "SET_LOADING":
            newState.loading = action.payload;
            break;
        case "SET_NOTIFICATION":
            newState.notification = action.payload;
            break;
        case "LOGIN_USER":
            newState.authUser = action.payload;
            break;
        case "LOGOUT_USER":
            newState.authUser = [];
            break;

        default:
            newState = state
    }
    return newState;
}
export default Reducer;





