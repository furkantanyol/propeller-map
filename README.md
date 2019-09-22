# Propeller Front End Coding Challenge

## Background

Commonly large datasets like maps (2D or 3D) are broken down into chunks with varying levels of detail. You will already be familiar with this concept in e.g. Google Maps, where you can zoom out to see the whole world in low detail. Zoom in and you can see your house. [This blog post](https://www.mapbox.com/help/how-web-maps-work/) provides a good overview.

## The Challenge

We've tiled a high res image into a set of tiles in the 'tiled' folder (un-tiled.jpg is just for reference). Create a simple frontend app in your framework of choice that displays them in the style of a 2D map view. The app should be self contained and simple for us to build and run (e.g. provide npm install/build/start).

## Tasks

All these are optional, just pick ones that you think will best demonstrate your current strengths.

- Basic functionality:
  - Allow zooming using +/- buttons **100% DONE**
  - Allow scrolling when the content doesn't fit in the browser viewport. **100% DONE**
- More advanced functionality:
  - Panning rather than scrolling **100% DONE**
  - Only load what's visible in the viewport.
  - Smooth zooming, styling etc. **50% DONE**
- Consider how your app is built.
- Consider coding style (e.g. robustness and maintainability).
- Block in some simple tests. **DONE**
- Any other extensions you think would demonstrate your ninja coding skills and how you will be an awesome addition to the Propeller team.

That is a long list of things, and we are aware of the fact that your time is limited. Therefore, please let us know some of the tradeoffs that you have made, what you have focussed on and what you have ignored for now.

## Implementation

- Used Create React App to quickly bootstrap a React App up and running. (_Without time limitations, I'd prefer configuring my own React App from scratch_)
- Created a small Express server to serve the static images of the tiles, and to get the zoom levels with respect to the number of folders in the assets/tiled directory.
- Created a service to communicate with the Express server and to fetch the zoom levels.
- **Zoom Feature:**
  - Created an algorithm for zooming using the variables zoom, zoomLevel and translateZ. Made the following **assumptions** for these values:

    **zoom:** Assumed zoom has 2<sup>maxZoomLevel</sup> levels. For example in our case:

        zoomLevels: 0, 1, 2, 3

        zoom: 0, 1, 2, 3, 4, 5, 6, 7 (8 levels in total)

    **zoomLevels:** Fetched the zoom levels with respect to the number of folders in the assets/tiled directory from the Express server.

    **translateZ:** Assumed when zooming in and out translateZ changes by 25px for this project.

    **Tile size:** Since I knew that the tile images were 256px, I assumed tile length being 256px and put in the app as a constant. However, this can be retrieved from `imgElement.onLoad` function when images are loaded.
- **Pan Feature:** - Added onMouseUp, onMouseDown, onMouseMove and onMouseLeave event handlers to the container to get the mouse events and execute panning.

- Added basic styling using css.
- Added some snapshot and functional tests using Jest.

## Tradeoffs

- Within the time limit I wanted to focus on the functionality the most and tried to finish all the important features, including zooming and panning, changing the tiles with respect to the zoom levels etc.
- Styling was my second priority compared to functionality. So I tried adding the least amount of styling. i.e. Putting map at the center, adding a zoom handler component with +/-, making sure tiles render correctly etc. However, I didn't fully implement the smooth changing of tiles and a nice and shiny UI.
- The app is not mobile friendly for now :(

## Installation

- Clone the project from: `https://github.com/furkantanyol/propeller-map.git`
  or
  download the project folder.
- Go to the project main directory. i.e. `cd propeller-map`
- Do a `yarn install` or `yarn`
- In another terminal window go the project **src** directory and run the server: `cd propeller-map/src && node server.js` - If the console shows `Listening on port 5000`, we're good to go.
- Go back to the first terminal window where we did yarn install and start the app by: `yarn start`
- To build the project use `yarn build` - Caution: The express server needs to run somewhere in the world first :)
- To run the tests use `yarn test`
- The server should be running at: `localhost:5000`
  and the client should be running at: `localhost:3000`

## Usage

- Use the +/- buttons to zoom in and out.
- Alternatively, use double click to zoom in.
- Click and drag with the primary mouse button to pan inside the map. Pan to move the map around.
- Alternatively scroll to see remaining regions of the map.
- Enjoy!

      											FURKAN TANYOL
