import axios from "axios";

export const SET_STATE = `SET_STATE`;
export const RESET_STATE = `RESET_STATE`;
export const SHOW_LIST = `SHOW_LIST`;
export const SHOW_RESTAURANT_DETAILS = `SHOW_RESTAURANT_DETAILS`;
export const CLEAR_RESTAURANT_DETAILS = `CLEAR_RESTAURANT_DETAILS `;

// REST API constants
const EXPLORE_URI = `https://api.foursquare.com/v2/venues/explore`;
export const SOURCE_COORDINATES = `35.644401,139.699117`; // Nakameguro Station coordinates; TODO: Revise specs and screens and get user location instead
const COORDINATE_ACCURACY = 1000;
const SEARCH_RADIUS = 1000;
const RESULT_LIMIT = 50;
const INCLUDE_PHOTOS = 1;
const OPEN_NOW = 1;
const CLIENT_ID = `54MBSTXZW3QNLZLGVPDXVJO3GIRV21S0IBGGSGPA2AXC04AZ`;
const CLIENT_SECRET = `VKAZZLD5XSIYTK1RRAPGYBFWLF5PMTOGIOES0FTVVPORA5UQ`;
const API_VERSION = 20171210;
const SECTION = `food`; // Used for randomize to only return restaurants
const PHOTO_SETTING_THUMBNAIL = `width200`;
const PHOTO_SETTING_MAIN = `width300`;

// Axios
let CancelToken = axios.CancelToken;
let cancelFindRandomRestaurant;
let cancelSearch;

// Utilities

function cancelCurrentTasks() {
    if(cancelFindRandomRestaurant) {
        cancelFindRandomRestaurant();
    }
    if(cancelSearch) {
        cancelSearch();
    }
}

function buildRestaurantObjectFromFoursquareJson(restaurantJson) {
    if(restaurantJson) {
        let venue = restaurantJson.venue;
        let tips = restaurantJson.tips;
        let photo_url_prefix = (venue.photos && venue.photos.groups.length > 0 && venue.photos.groups[0].items.length > 0) ? venue.photos.groups[0].items[0].prefix : null;
        let photo_url_suffix = (venue.photos && venue.photos.groups.length > 0 && venue.photos.groups[0].items.length > 0) ? venue.photos.groups[0].items[0].suffix : null;
        let thumbnail = null;
        let photoUrl = null;

        if(photo_url_prefix && photo_url_suffix) {
            thumbnail = photo_url_prefix + PHOTO_SETTING_THUMBNAIL + photo_url_suffix;
            photoUrl = photo_url_prefix + PHOTO_SETTING_MAIN + photo_url_suffix;
        }

        return {
                id: venue.id,
                thumbnail: thumbnail,
                photo_url: photoUrl,
                name: venue.name ? venue.name : null,
                address: venue.location ? venue.location.formattedAddress.join(` `) : null,
                distance: venue.location ? venue.location.distance/1000 : null,
                type: (venue.categories && venue.categories.length > 0) ? venue.categories[0].name : null,
                price_range: venue.price ? venue.price.message : null,
                menu: venue.menu ? venue.menu.url : null,
                website_url: venue.url,
                contact: venue.contact ? venue.contact.formattedPhone : null,
                details: (tips && tips.count>0) ? tips[0].text : null,
                rating: venue.rating,
                ratingColor: `#${venue.ratingColor}`,
                coordinates: venue.location ? [venue.location.lat, venue.location.lng] : null,
                hours: venue.hours ? venue.hours.status : null
        }
    }

    return null;
}

// Actions
export function clearRestaurantDetails() {
    return {
        type: CLEAR_RESTAURANT_DETAILS,
    }
}

export function reset() {
    return {
        type: RESET_STATE
    }
}

export function findRandomRestaurant() {
    cancelCurrentTasks();

    // gets a list of at most 50 places from the FourSquare explore API using the "food" section
    return(dispatch) => {
        return axios.get(EXPLORE_URI, {
            cancelToken: new CancelToken(function executor(c) {
                cancelFindRandomRestaurant = c;
            }),
            params: {
                ll: SOURCE_COORDINATES,
                llAcc: COORDINATE_ACCURACY,
                radius: SEARCH_RADIUS,
                section: SECTION,
                limit: RESULT_LIMIT,
                venuePhotos: INCLUDE_PHOTOS,
                openNow: OPEN_NOW,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                v: API_VERSION
            }
        }).then((response)=>{
            cancelCurrentTasks();

            const restaurants = response.data.response.groups[0].items;
            let restaurant = null;

            // since the json from FourSquare API has too much data, create a restaurant object with only the needed data
            if(restaurants && restaurants.length > 0) {
                const randomIndex = Math.floor(Math.random() * restaurants.length);
                restaurant = buildRestaurantObjectFromFoursquareJson(restaurants[randomIndex]);
            }

            dispatch(showRestaurantDetails(restaurant));
            cancelFindRandomRestaurant = null;
        }).catch(function(thrown) {
            if (axios.isCancel(thrown)) {
                console.log(`Random restaurant request canceled`);
            } else {
                console.warn(`Error getting random restaurant. Error details: ${thrown.message}`);
                dispatch(showRestaurantDetails(null));
            }
            cancelFindRandomRestaurant = null;
        });
    }
}

export function showRestaurantDetails(restaurant) {
    return {
        type: SHOW_RESTAURANT_DETAILS,
        restaurant: restaurant
    }
}

export function search(searchQuery) {
    cancelCurrentTasks();

    // gets a list of at most 50 places from the FourSquare explore API using the search query
    return(dispatch) => {
        return axios.get(EXPLORE_URI, {
            cancelToken: new CancelToken(function executor(c) {
                cancelSearch = c;
            }),
            params: {
                ll: SOURCE_COORDINATES,
                llAcc: COORDINATE_ACCURACY,
                radius: SEARCH_RADIUS,
                query: searchQuery,
                limit: RESULT_LIMIT,
                venuePhotos: INCLUDE_PHOTOS,
                openNow: OPEN_NOW,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                v: API_VERSION
            }
        }).then((response)=>{

            cancelCurrentTasks();

            // since the json from FourSquare API has too much data, create restaurant objects with only the needed data
            let list = [];
            for(let item of response.data.response.groups[0].items) {
                list.push(buildRestaurantObjectFromFoursquareJson(item));
            }

            dispatch(showList(list));
            cancelSearch = null;
        }).catch(function(thrown) {
            if (axios.isCancel(thrown)) {
                console.log(`Search restaurant request canceled`);
            } else {
                console.warn(`Error getting random restaurant. Error details: ${thrown.message}`);
                dispatch(showRestaurantDetails(null));
            }
            cancelSearch = null;
        });
    }
}

export function showList(list) {
    return {
        type: SHOW_LIST,
        restaurantList: list ? list : []
    }
}