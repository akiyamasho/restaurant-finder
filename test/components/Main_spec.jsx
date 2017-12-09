import {expect} from "chai";
import React from "react";
import {Provider} from "react-redux";
import {renderIntoDocument, scryRenderedDOMComponentsWithClass} from "react-dom/test-utils";
import {Main} from "../../src/components/Main"
import {createTestStore, SAMPLE_RESTAURANT} from "../test_data";

describe(`Main`, () => {
    it(`renders the search page when there is no restaurant list or selected restaurant`, () => {
        const component = renderIntoDocument(
            <Provider store={createTestStore()}>
                <Main />
            </Provider>
        );

        const search = scryRenderedDOMComponentsWithClass(component, `search`);
        expect(search.length).to.equal(1);
    });

    it(`renders the restaurant list page when there is a restaurant list`, () => {
        const component = renderIntoDocument(
            <Provider store={createTestStore()}>
                <Main restaurantList={[SAMPLE_RESTAURANT]}/>
            </Provider>
        );

        const restaurantList = scryRenderedDOMComponentsWithClass(component, `restaurant_list`);
        expect(restaurantList.length).to.equal(1);
    });

    it(`renders the restaurant details page when there is a selected restaurant`, () => {
        const component = renderIntoDocument(
            <Provider store={createTestStore()}>
                <Main selectedRestaurant={SAMPLE_RESTAURANT}/>
            </Provider>
        );

        const restaurantDetails = scryRenderedDOMComponentsWithClass(component, `restaurant_details`);
        expect(restaurantDetails.length).to.equal(1);
    });
});