import React from "react";
import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';
import * as actionCreators from "../actions";

export class RestaurantList extends React.Component {
    render() {
        return (
            <div className="restaurant_list main-container col">
                <div className="upper-btn-container">
                    <button className="btn-reset" onClick={this.props.reset}>{this.props.translate(`search_again`)}</button>
                </div>

                {(this.props.restaurantList && this.props.restaurantList.length > 0) ?

                    <div className="list-container row">
                        {this.props.restaurantList.map(restaurant =>
                            <div key={restaurant.id} className="restaurant-entry row col-md-4">
                                <div className="details-container-element details-img-container col-md-6">
                                    <img className="list-img"
                                          src={restaurant.thumbnail ? restaurant.thumbnail : `http://www.sozaibokujo.com/wp-content/uploads/2017/09/icon_restaurant_256.png`}/>
                                </div>

                                <div className="details-container-element details-text-container text  col-md-6">
                                    <h4>{restaurant.name}</h4>
                                    <label>{restaurant.distance} {this.props.translate(`km_away`)}</label><br/>
                                    <label>
                                        {this.props.translate(`price_range`)}:&nbsp;
                                        {restaurant.price_range ? restaurant.price_range : this.props.translate(`no_price_range`)}</label><br/>
                                    <label style={{color: restaurant.ratingColor}}>
                                        {this.props.translate(`rating`)}:
                                        {restaurant.rating ? `${restaurant.rating}/10` : this.props.translate(`no_rating`)}
                                    </label><br/>
                                    <label>{restaurant.hours}</label><br/>
                                    <button onClick={() => this.props.showRestaurantDetails(restaurant)}>{this.props.translate(`more_details`)}</button>
                                </div>
                            </div>
                        )}
                    </div>

                    :

                    <div className="text empty-list-message error-message">
                        {this.props.translate(`empty_list`)}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    translate: getTranslate(state.locale),
    restaurantList: state.main.get(`restaurantList`)
});

export const RestaurantListContainer = connect(mapStateToProps, actionCreators)(RestaurantList);