import {JSDOM} from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;


Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

chai.use(chaiImmutable);