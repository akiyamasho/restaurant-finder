import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import allReducers from "../src/reducers"
import * as stringConstants from "../src/constants/strings";
import {initialize} from "react-localize-redux/lib/index";

export const SAMPLE_RESTAURANT = {
    id: `4d18973189hd1891241423cf`,
    thumbnail: `https://media-cdn.tripadvisor.com/media/photo-f/08/0a/30/ab/caption.jpg`,
    photo_url: `https://media-cdn.tripadvisor.com/media/photo-o/11/09/98/42/ise-sueyoshi.jpg`,
    name: `伊勢すえよし`,
    address: `〒106-0031 東京都港区西麻布4-2-15水野ビル3F`,
    distance: 512,
    type: `港区のレストラン`,
    price_range: `高い`,
    menu: `https://tabelog.com/tokyo/A1307/A130703/13181530/`,
    website_url: `http://isesueyoshi.blog.fc2.com/`,
    contact: `03-6427-2314`,
    details: `外国からのお客様もお連れしたい店です`,
    rating: 9.9,
    ratingColor: `#00B551`,
    coordinates: [35.658937, 139.723579],
    hours: `月 - 土, 17:30 - 23:00`
};

export const SAMPLE_RESTAURANTS = [
    SAMPLE_RESTAURANT
];

export function createTestStore() {
    const store = createStore(allReducers, applyMiddleware(thunk));
    store.dispatch(initialize(stringConstants.languages));

    return store;
}