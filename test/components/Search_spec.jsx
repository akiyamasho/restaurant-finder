import React from "react";
import {Provider} from "react-redux";
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from "react-dom/test-utils";
import {expect} from "chai";
import {SearchContainer} from "../../src/components/Search";
import {createTestStore} from "../test_data";

describe(`Search`, () => {
    it(`renders an input and a pair of buttons`, () => {
        const component = renderIntoDocument(
            <Provider store={createTestStore()}>
                <SearchContainer />
            </Provider>
        );

        const inputs = scryRenderedDOMComponentsWithTag(component, `input`);
        expect(inputs[0]).to.be.ok;

        const buttons = scryRenderedDOMComponentsWithTag(component, `button`);
        expect(buttons[0]).to.be.ok;
        expect(buttons[1]).to.be.ok;
    });

    it(`disables search button when input is empty and enables it otherwise`, () => {
        const component = renderIntoDocument(
            <Provider store={createTestStore()}>
                <SearchContainer />
            </Provider>
        );

        const inputs = scryRenderedDOMComponentsWithTag(component, `input`);
        expect(inputs[0]).to.be.ok;
        expect(inputs[0].value).to.be.empty;

        const buttons = scryRenderedDOMComponentsWithTag(component, `button`);
        expect(buttons[0]).to.be.ok;
        expect(buttons[0].disabled).to.equal(true);

        const inputValue = `test`;
        Simulate.change(inputs[0], {target: {value: inputValue}});
        expect(inputs[0].value).to.equal(inputValue);
        expect(buttons[0].disabled).to.equal(false);
    });

    it(`disables both buttons when search button is clicked (prereq -> search input field is populated with value)`, () => {
        const component = renderIntoDocument(
            <Provider store={createTestStore()}>
                <SearchContainer />
            </Provider>
        );

        const inputs = scryRenderedDOMComponentsWithTag(component, `input`);
        expect(inputs[0]).to.be.ok;
        expect(inputs[0].value).to.be.empty;

        const buttons = scryRenderedDOMComponentsWithTag(component, `button`);
        expect(buttons[0]).to.be.ok;
        expect(buttons[1]).to.be.ok;
        expect(buttons[0].disabled).to.equal(true);
        expect(buttons[1].disabled).to.equal(false);

        const inputValue = `test`;
        Simulate.change(inputs[0], {target: {value: inputValue}});

        Simulate.click(buttons[0]);
        expect(buttons[0].disabled).to.equal(true);
        expect(buttons[1].disabled).to.equal(true);
    });

    it(`disables both buttons when find random restaurant button is clicked`, () => {
        const component = renderIntoDocument(
            <Provider store={createTestStore()}>
                <SearchContainer />
            </Provider>
        );

        const inputs = scryRenderedDOMComponentsWithTag(component, `input`);
        expect(inputs[0]).to.be.ok;
        expect(inputs[0].value).to.be.empty;

        const buttons = scryRenderedDOMComponentsWithTag(component, `button`);
        expect(buttons[0]).to.be.ok;
        expect(buttons[1]).to.be.ok;
        expect(buttons[0].disabled).to.equal(true);
        expect(buttons[1].disabled).to.equal(false);

        Simulate.click(buttons[1]);
        expect(buttons[0].disabled).to.equal(true);
        expect(buttons[1].disabled).to.equal(true);
    });
});