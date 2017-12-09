
### High-level Specifications

##### General Design
- Main font will be [Noto Sans](https://www.google.com/get/noto/)

##### Main Screen
- In the middle, there is a title label "Restaurant Finder"
- Below the title, there is a textbox for the keyword search
- Below the textbox, there are two buttons, "Keyword Search" and "Random Restaurant"
- The main screen will look similar to Google:
	- Keyword Search (will not work if query is empty), transitions to ***Restaurant List Screen*** after click and load, with the list of at most 50 restaurants (passes the keyword for the ```query``` parameter in Foursquare API)
	- Random Restaurant, transitions to ***Restaurant Details Screen*** after click and load (passes "food" for the ```section``` parameter in Foursquare API)

##### Restaurant List Screen
- This is a simple list of restaurants with the following data for each entry (hidden if null):
	- Thumbnail
	- Restaurant name
	- Distance
	- Price Tier
	- Rating
	- Store hours
- A `Search Again` button is always shown to go back to search screen
- If an error occurs (no data), a messge is shown instead of the list

##### Restaurant Details Screen
- This is a screen with restaurant details containing the following data (info is hidden if null):
	- Larger photo
	- Restaurant name
	- Restaurant Details
	- Distance in kilometers
	- Price Range
	- Rating
	- Address
	- Link to menu
	- Link to website
	- Contact
	- "Navigate" button to open google maps route
- A `Search Again` button is always shown to go back to search screen
- A Back to List button is shown when the previous screen is the restaurant list screen (details came frome an entry clicked on the list)
- If an error occurs (no data), a messge is shown instead of the details