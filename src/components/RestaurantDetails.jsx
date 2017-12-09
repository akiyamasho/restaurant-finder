import React from "react";
import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';
import * as actionCreators from "../actions";

export class RestaurantDetails extends React.Component {
    render() {
        return (
            <div className="restaurant_details main-container col">
                <div className="upper-btn-container">
                    {this.props.selectedRestaurant && this.props.restaurantList ?
                        <button className="btn-back" onClick={this.props.clearRestaurantDetails}>{this.props.translate(`back_to_list`)}</button>
                        : ``}
                    <button className="btn-reset" onClick={this.props.reset}>{this.props.translate(`search_again`)}</button>
                </div>

                {this.props.selectedRestaurant ?

                    <div className="details-container row">
                        <div className="details-container-element details-img-container col-md-6">
                            <img className="details-img"
                                  src={this.props.selectedRestaurant.photo_url ? this.props.selectedRestaurant.photo_url : "http://www.sozaibokujo.com/wp-content/uploads/2017/09/icon_restaurant_256.png"}/>
                        </div>

                        <div className="details-container-element details-text-container text col-md-6">
                            <h2>{this.props.selectedRestaurant.name}</h2>
                            <label className="review">" {this.props.selectedRestaurant.details ? this.props.selectedRestaurant.details : this.props.translate(`no_restaurant_reviews`)} "</label><br/>
                            <label>{this.props.selectedRestaurant.address}</label><br/>
                            <label>{this.props.selectedRestaurant.distance} {this.props.translate(`km_away`)}</label><br/>
                            <label>
                                {this.props.translate(`price_range`)}:&nbsp;
                                {this.props.selectedRestaurant.price_range ? this.props.selectedRestaurant.price_range : this.props.translate(`no_price_range`)}</label><br/>
                            <label style={{color: this.props.selectedRestaurant.ratingColor}}>
                                {this.props.translate(`rating`)}:&nbsp;
                                {this.props.selectedRestaurant.rating ? `${this.props.selectedRestaurant.rating}/10` : this.props.translate(`no_rating`)}
                            </label><br/>
                            <label>{this.props.selectedRestaurant.price_range ? this.props.selectedRestaurant.price_range : this.props.translate(`no_price_range`)}</label><br/>
                            <label>
                                {this.props.selectedRestaurant.website_url ?
                                <a href={this.props.selectedRestaurant.website_url} target="_blank">{this.props.translate(`website`)}</a> :
                                this.props.translate(`no_website_info`)}
                            </label><br/>
                            <label>
                                {this.props.selectedRestaurant.menu ?
                                    <a href={this.props.selectedRestaurant.menu} target="_blank">{this.props.translate(`menu`)}</a> :
                                    this.props.translate(`no_menu_info`)}
                            </label><br/>
                            <a href={`https://www.google.co.jp/maps/dir/${actionCreators.SOURCE_COORDINATES}/${this.props.selectedRestaurant.coordinates[0]},${this.props.selectedRestaurant.coordinates[1]}`} target="_blank">{this.props.translate(`navigate`)}</a>
                        </div>
                    </div>

                    :

                    <div className="details-error-message error-message">
                        {this.props.translate(`details_error`)}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    translate: getTranslate(state.locale),
    restaurantList: state.main.get(`restaurantList`),
    selectedRestaurant: state.main.get(`selectedRestaurant`)
});

export const RestaurantDetailsContainer = connect(mapStateToProps, actionCreators)(RestaurantDetails);