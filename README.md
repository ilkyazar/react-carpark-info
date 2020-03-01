ispark-carpark-info

Visit my deployed solution on Heroku:
https://ispark-carpark-info.herokuapp.com


/frontend folder contains the React.js related source code.

    /build directory is the production build of the app

    /src/App.js contains all the components that is rendered in the page
                The class has data, district and ParkID in it's state
                I set the data in the state with a GET method done to api/data
                Then, I use this data that comes from the backend
                Accordingly, I create district and car park options in form components
                I show the location of the selected car park using Google Maps API

    /src/index.js sets where to render App.js component by calling render from ReactDOM

    /public has manifest.json that gives information about the app to the web browser
            and index.html that has the title of the app and a link to manifest

    /package.json contains the dependencies of frontend

backend.js is the server side code
           I used Node.js and Express in the backend
           From the IBB Acik Veri Portali API, I get the data using request function
           I set the environment variable PORT here and I listen it with app.listen()
           I use Express middleware functions for production
           I load the files in frontend/build using express.static

package.json file contains the dependencies of the app
             I also set start and heroku-postbuild here 
             When working on local run "yarn" in frontend folder and in main project folder
             Then, "yarn dev" is enough