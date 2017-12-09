import {Map} from "immutable";
import {CLEAR_RESTAURANT_DETAILS, RESET_STATE, SET_STATE, SHOW_LIST, SHOW_RESTAURANT_DETAILS} from "../actions";

function setState(state, newState) {
    return state.merge(newState);
}

function resetState() {
    return Map();
}

function clearRestaurantDetails(state) {
    if(state.get(`selectedRestaurant`)) {
        return state.remove(`selectedRestaurant`);
    }

    return state;
}

export default function (state = Map(), action) {
    switch(action.type) {
        case SET_STATE: {
            return setState(resetState(state), action.state);
        }
        case RESET_STATE: {
            return resetState();
        }
        case CLEAR_RESTAURANT_DETAILS: {
            return clearRestaurantDetails(state);
        }
        case SHOW_LIST: {
            return state.set(`restaurantList`, action.restaurantList);
        }
        case SHOW_RESTAURANT_DETAILS: {
            return state.set(`selectedRestaurant`, action.restaurant);
        }
    }

    return state;
}