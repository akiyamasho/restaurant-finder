import React from "react";
import {Provider} from "react-redux";
import {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} from "react-dom/test-utils";
import {expect} from "chai";
import {RestaurantDetailsContainer} from "../../src/components/RestaurantDetails";
import {createTestStore, SAMPLE_RESTAURANT, SAMPLE_RESTAURANTS, store} from "../test_data";
import {Map} from "immutable";
import {SET_STATE} from "../../src/actions";

describe(`Restaurant Details`, () => {
    it(`renders error message and a button if the selected restaurant is null`, () => {
        const store = createTestStore();
        const state = Map({ selectedRestaurant: null });
        store.dispatch({
            type: SET_STATE,
            state: state
        });

        const component = renderIntoDocument(
            <Provider store={store}>
                <RestaurantDetailsContainer />
            </Provider>
        );

        const inputs = scryRenderedDOMComponentsWithClass(component, `details-error-message`);
        expect(inputs[0]).to.be.ok;
    });

    it(`renders only the details if there is only a selected restaurant`, () => {
        const store = createTestStore();
        const state = Map({ selectedRestaurant: SAMPLE_RESTAURANT });
        store.dispatch({
            type: SET_STATE,
            state: state
        });

        const component = renderIntoDocument(
            <Provider store={store}>
                <RestaurantDetailsContainer />
            </Provider>
        );

        const inputs = scryRenderedDOMComponentsWithClass(component, `details-container`);
        expect(inputs[0]).to.be.ok;

        const backButtons = scryRenderedDOMComponentsWithClass(component, `btn-back`);
        expect(backButtons.length).to.equal(0);
    });

    it(`renders only the details and a back button if there is a selected restaurant and restaurant list`, () => {
        const store = createTestStore();
        const state = Map({ restaurantList: SAMPLE_RESTAURANTS, selectedRestaurant: SAMPLE_RESTAURANT });
        store.dispatch({
            type: SET_STATE,
            state: state
        });

        const component = renderIntoDocument(
            <Provider store={store}>
                <RestaurantDetailsContainer />
            </Provider>
        );

        const inputs = scryRenderedDOMComponentsWithClass(component, `details-container`);
        expect(inputs[0]).to.be.ok;

        const backButtons = scryRenderedDOMComponentsWithClass(component, `btn-back`);
        expect(backButtons[0]).to.be.ok;
    });

    it(`clears the restaurant list and restaurant details from store on click of button for searching again`, () => {
        const store = createTestStore();
        const state = Map({ restaurantList: SAMPLE_RESTAURANTS, selectedRestaurant: SAMPLE_RESTAURANT });
        store.dispatch({
            type: SET_STATE,
            state: state
        });

        const component = renderIntoDocument(
            <Provider store={store}>
                <RestaurantDetailsContainer />
            </Provider>
        );

        const resetBtns = scryRenderedDOMComponentsWithClass(component, `btn-reset`);
        expect(resetBtns[0]).to.be.ok;
        Simulate.click(resetBtns[0]);

        expect(store.getState().main.get(`restaurantDetails`)).to.be.undefined;
        expect(store.getState().main.get(`restaurantList`)).to.be.undefined;
    });

    it(`clears the restaurant details from store on click of button for showing list again`, () => {
        const store = createTestStore();
        const state = Map({ restaurantList: SAMPLE_RESTAURANTS, selectedRestaurant: SAMPLE_RESTAURANT });
        store.dispatch({
            type: SET_STATE,
            state: state
        });

        const component = renderIntoDocument(
            <Provider store={store}>
                <RestaurantDetailsContainer />
            </Provider>
        );

        const backBtns = scryRenderedDOMComponentsWithClass(component, `btn-back`);
        expect(backBtns[0]).to.be.ok;
        Simulate.click(backBtns[0]);

        expect(store.getState().main.get(`restaurantDetails`)).to.be.undefined;
        expect(store.getState().main.get(`restaurantList`)).to.be.ok;
    });
});
