import React from "react";
import {connect} from "react-redux";
import {SearchContainer} from "./Search";
import {RestaurantDetailsContainer} from "./RestaurantDetails";
import {RestaurantListContainer} from "./RestaurantList";

export class Main extends React.Component {
    render() {
        let screen = (<SearchContainer />);

        if(this.props.selectedRestaurant) {
            screen = (<RestaurantDetailsContainer />);
        } else if(this.props.restaurantList) {
            screen = (<RestaurantListContainer />);
        }

        return screen;
    }
}

const mapStateToProps = state => ({
    restaurantList: state.main.get(`restaurantList`),
    selectedRestaurant: state.main.get(`selectedRestaurant`)
});

export const MainContainer = connect(mapStateToProps)(Main);