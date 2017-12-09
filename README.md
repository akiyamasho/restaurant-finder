# Restaurant Finder [![Build Status](https://travis-ci.org/akiyamasho/restaurant-finder.svg?branch=master)](https://travis-ci.org/akiyamasho/restaurant-finder)

This was a simple app for finding restaurants near a specific coordinate (currently preset as Nakameguro Station in code). Due to an issue with the difficulty trying to find a place to eat at lunchtime, this app was brought to existence in order to easily decide places to eat. It currently has the following functions:

- Search for a near restaurant by keyword
- Find a random restaurant
- View list of searched restaurants
- View restaurant details (from list or from random restaurant)
- External links to Google maps for navigation, actual restaurant website, and restaurant menu
- Localization (currently only supports EN and JA), defaults to EN for unsupported languages

For more info on the high level specifications, see ```/draft/specifications.md```

** Manual tests were run on:
- OS X 10.11 El Capitan
    - Safari 11.0.2 (EN)
- Windows 10 Home 64-bit
    - Chrome 63.0.3239.84 (JA)
    - Microsoft Edge 41.16299.15.0 (JA)
    - Mozilla Firefox 57.0.2 (EN)
- iPhone 6s iOS 11.1.2
    - Version/11.0 Mobile/15B202 Safari/604.1 (JA)
- Nexus 7 Android 5.1.1
    - Chrome 51.0.2704.81 (EN)

### Building/Running

1. Run ```npm install```.
2. Run ```webpack-dev-server```.
3. Access ```localhost:8080``` on your browser.

It is also possible to check a <a href="http://www.carlo-virtucio.com/restaurantfinder" target="_blank">hosted version</a> (This page blocks web crawlers from crawling the page just in case; I access this often for personal use hence the hosting)

### Running unit tests

1. Run ```npm install```
2. Run ```npm run test```

### Reason for some UI/UX design points
- Google Noto
	- Sleek font for Japanese and English text
- App language is based on browser language
	- Instead of location-based or IP-based, this seems to cater more to the user's preferences
	- English is set as default since it is assumed that the user knows English instead of Japanese if the browser language is neither EN or JA
- Simple UI
	- Google Search-like UI for simplicity; "Random Restaurant" could have been "I'm Feeling Adventurous" but this seems very casual and may be prone to misunderstanding (subject to change)
	- Much easier to make mobile-ready especially considering time constraints
- Background is purple to [suppress appetite](https://www.fitday.com/fitness-articles/nutrition/how-color-can-change-your-appetite-and-eating-habits.html). [other source](https://ux.stackexchange.com/questions/14239/which-colors-make-you-hungry/14242)
	- Since the goal of the app is to ***decide where to eat***, the users would not be eating anytime soon yet due to travel time/ordering time so I thought it would be best to suppress their appetite through color psychology (requires further research, though) while using the app
	- This is also why there are no food-related icons/UI except for the restaurant photos taken from the Foursquare API
- Google Maps link for navigating to restaurant
	- since Google Maps links can be opened directly on the app for mobile, this would be very useful for mobile users and will also save time for development
- 50-restaurant limit
	- Based on the [Foursquare Venue Recommendation API](https://developer.foursquare.com/docs/api/venues/explore), the maximum number of returned results is 50
- Currently this is a one-page application and may not scale well when additional functions are added
    - This can be solved by separating the components into pages using a router
    - Page transition can use [React Easy Transition](https://www.npmjs.com/package/react-easy-transition)

### Libraries/Tools (and reasons behind use)
- [React](https://reactjs.org/)
	- This is the latest trend in front end development and [here's why](https://medium.freecodecamp.org/yes-react-is-taking-over-front-end-development-the-question-is-why-40837af8ab76)
- [Redux](https://www.smashingmagazine.com/2016/06/an-introduction-to-redux/)
	- For an app this simple, Redux is not really needed but I included it for learning how to use it and also for the localization library
- [Superagent vs Axios](https://stackoverflow.com/questions/40029787/axios-vs-superagent)
	- Based on the Stackoverflow answer, it really depends on API familiary and library size
	- Due to lack of experience for both, I based my preference on which library has more documentation and [tutorials](https://x-team.com/blog/react-redux-api-introduction/)
- [react-localize-redux](https://github.com/ryandrewjohnson/react-localize-redux)
	- Simple localization process; however, there have been some tradeoffs with development time when using this. See ***limitations*** about testing for more details.
- [Mocha](https://mochajs.org/)/[Chai](http://chaijs.com/)
	- Also due to lack of experience; I simply followed a [full stack redux app tutorial](https://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html#introducing-actions-and-reducers) to get a good hold on react/redux with testing
	- Chai is more of a BDD testing library, which makes testing much more detailed and easy to read
- [Webpack](https://webpack.js.org/)
	- This is a very useful tool since I only needed to put the ```index.html``` and ```bundle.js``` on a hosting site
	- ```webpack-dev-server``` is also very helpful in the development stage
- [Jetbrains WebStorm](https://www.jetbrains.com/webstorm/)
	- I'm a big fan of the Jetbrains IDEs and have been using their various software since my internship in 2013
	- This makes things much faster, especially for me who has been using it for a while, due to autocomplete/import, some boilerplate functions, and plugins
- [Postman](https://www.getpostman.com/)
    - For easily testing FourSquare API
- [Redux Thunk](https://github.com/gaearon/redux-thunk)
    - Middleware for Axios GET requests
- [Bootstrap](https://getbootstrap.com/)
    - much easier to make the design mobile-ready
- New ES6 string definition using [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
    - much easier to substitute variables into strings using $`{ syntax
    - this is not supported for everything; for includes/imports I use "" since it is much easier to type than '' on a Japanese keyboard (nearer to edge like QWER in gaming shortcuts)

### Possible functions to add in the future or if I had more experience/time
- Can set a location/get location of user	
	- will need a new screen for selecting on a map
	- can also probably use keyword instead for simplicity but this will be less 
	- can also probably save locations for future use
- Can increase/decrease search radius
- Can switch between map view/list view or show both for desktop
- Search filters
- Sorting restaurants/filters
	- by name
	- by type
	- by price
	- by location (nearest)	
	- do not include closed restaurants
- Actual navigation route in ***Restaurant Details Screen*** using [React Native Maps](https://github.com/react-community/react-native-maps)
- User handling (login)
	- Creating polls on which restaurant or type of food
	- Saved restaurants
	- Saved searches
	- Data analytics (most frequented restaurant, etc.)
- More info on price range
- Language change button
- Pagination of results
- Caching of results to avoid searching again
- Google-like, showing search bar even when search results are shown
- Find Another Random Restaurant button in restaurant details screen

### Tools/libraries/UI I would have added if I had more experience with the frameworks and more time to work on the project
- [Sauce Labs for automated browser testing](https://saucelabs.com/)
- [Coveralls for Code Coverage](https://coveralls.io/)
- [Stubbing Axios requests for tests](https://medium.com/@srph/axios-easily-test-requests-f04caf49e057)
    - This was tested manually but automated tests could have been implemented if there is more time
- The integration tests were done manually due to lack of time to study and apply a separate testing framework
- Additional animations
- Better mobile design (and overall design)
    - More pleasing-looking layout for photos and text for small screens
    - Animations
- Some sort of tool to debug much more easily (e.g. - some error messages need to be googled or traced extensively)

### Limitations/things learned
- 1000 requests per 24-hour period due to Foursquare limit
    - This can be solved by adding a credit card to Foursquare account
- Client ID and Client Secret are saved in a JS file (not really secure since someone may take this and make API calls using my account)
    - It may be possible to encrypt this somewhere
- Retrieved list is only up to 50
    - This can be solved by multiple API calls and using the ```query``` parameter for result offset
- Using the library ```react-localize-redux``` added a level of difficulty especially to testing
    - This is most likely to inexperience; the original design was to make only Main.jsx use a reducer and the inner components would be normal react components
    - Because of this, the unit tests required having the components for testing wrapped inside a provider; this caused some issues and had to be debugged for quite some time
- Since this is a 1-page app, clicking on the back button goes back to the previous webpage
    - This can be solved by reorganizing the components and routing (removing Main.jsx and putting each component on a different route) and a routing handler
    - Tried using window.onhashchange/window.onpopstate to handle back button but this is not cross-browser compatible and seems quite hack-y and unstable

### References
- [React/Redux Video Tutorial by Bucky Roberts](https://www.youtube.com/watch?v=DiLVAXlVYR0&index=1&list=PL_xwYIO1BOyVCafTiEa0ZTgHlp4gxIRna)
- [Full Stack Redux App](https://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html#introducing-actions-and-reducers)
	- [Own Implementation](https://github.com/carlovirtucio/full-stack-redux-app)
- [Organizing Actions](https://stackoverflow.com/questions/34965856/what-is-the-point-of-the-constants-in-redux)
- [Which is the best boilerplate](https://www.reddit.com/r/reactjs/comments/6ug34d/reactjs_which_is_the_best_boilerplate_you_have/)
- [Feedback Loop](https://blog.iterate.no/2012/10/01/know-your-feedback-loop-why-and-how-to-optimize-it/)
- [Setting up CI on GitHub](https://github.com/mbonaci/mbo-storm/wiki/Integrate-Travis-CI-with-your-GitHub-repo)
- [React/Redux/Axios Tutorial](https://x-team.com/blog/react-redux-api-introduction/)
