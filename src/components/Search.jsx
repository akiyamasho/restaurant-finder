import React from "react";
import {connect} from "react-redux";
import {getTranslate, getActiveLanguage} from 'react-localize-redux';
import * as actionCreators from "../actions";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchQuery: ``, buttonClicked: false };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.searchWithQuery = this.searchWithQuery.bind(this);
        this.randomRestaurantClicked = this.randomRestaurantClicked.bind(this);
    }

    handleChange(event) {
        this.setState({searchQuery: event.target.value, buttonClicked : this.state.buttonClicked});
    }

    handleKeyPress(event) {
        if(event.key === 'Enter'){
            this.searchWithQuery();
        }
    }

    searchWithQuery() {
        if (this.state.searchQuery && !this.state.buttonClicked) {
            this.setState({searchQuery: this.state.searchQuery, buttonClicked : true});
            this.props.search(this.state.searchQuery);
        }
    }

    randomRestaurantClicked() {
        if (!this.state.buttonClicked) {
            this.setState({searchQuery: this.state.searchQuery, buttonClicked : true});
            this.props.findRandomRestaurant();
        }
    }

    render() {
        return (
            <div className="search main-container col">
                <h1 className="text title">Restaurant Finder</h1>

                <div className="search-textbox-container">
                    <input type="text"
                           className="search-textbox"
                            value={this.state.searchQuery}
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                            placeholder={this.props.translate(`query_placeholder`)}
                            autofocus="true"/>
                </div>

                <div className="search-btn-container">
                    <button onClick={this.searchWithQuery} disabled={this.state.buttonClicked || !this.state.searchQuery}>
                        {this.props.translate(`search`)}
                     </button>
                    <button onClick={this.randomRestaurantClicked} disabled={this.state.buttonClicked}>
                        {this.props.translate(`random_restaurant`)}
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
});

export const SearchContainer = connect(mapStateToProps, actionCreators)(Search);