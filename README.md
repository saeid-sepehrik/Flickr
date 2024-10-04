# Flickr Photo Gallery
This project is a photo gallery that lets users search for images using keywords. Users can also click on an image to see more details about it.

## Features
- Search for images with keywords.
- Load more images as you scroll down (infinite scrolling).
- Responsive design that works on different screen sizes.
- View details of each photo.

## Prerequisites
- **Language**: JavaScript
- **Backend**: Node.js
- **Libraries Used**:
  - [winston](https://www.npmjs.com/package/winston) for logging.
  - [node-cache](https://www.npmjs.com/package/node-cache) for caching data.
  - [express](https://expressjs.com/) for making the API.
  - [axios](https://axios-http.com/) for HTTP requests.
  - [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) to limit request rates.
  - [express-validator](https://express-validator.github.io/docs/) for checking data.

## Usage
1. **Set Flickr API key**
   - You need to have a Flickr API key which you can get [here](https://www.flickr.com/services/api/misc.api_keys.html)
   - After getting the Flickr API key, set it in the `.env` file in server folder

2. **Install dependency**
   - Go to the **server** folder with run the command `cd server`
   - Run the command `npm run setup`. At this stage, the dependencies and the http-server package are installed

3. **Run the Server:**
   - In the server folder, run the command `npm start` to start the server.

4. **Run the Frontend:** 
    - Open new terminal
    - Go to the **front** folder, by running the command `cd front`
    - run the command `http-server`
    - Open a web browser and go to `http://127.0.0.1:8080/`.

5. **Search for Photos:**
   - Enter a word or phrase in the search bar and press the search button.

6. **Load More Images:**
   - Scroll down to load more images.

7. **View Photo Details:**
   - Click on any photo to see more details.


## Limitations
- This gallery uses the public Flickr API and depends on its availability. 


## Notes
- This project is a starting point for further development and may need improvements in performance and scalability.
- You can see configuration file in  `./server/src/config/config.js`. Some of the settings of this file are mentioned below


## Limit Rate
There is a limit on the number of requests you can make to the Flickr service. This means you cannot send too many requests in a short time. To manage this, you can change the settings in the `config` file. Here, you can adjust the time(`rating.time`) in the number of requests(`rating.max`) allowed.

## Testing
- This project uses [Jest](https://jestjs.io/) for testing.
- To run the tests, navigate to the **server** folder and run the command: `npm test`

## Caching Details

In this project, we use caching to make the search for images faster and to reduce the load on the server. The caching settings are saved in the configuration file. The default values are:

- **Cache Duration:** 600 seconds (10 minutes) - This means that the search results stay in the cache for 10 minutes. You can change this time in the configuration file in the `caching.time` part.

- **Images per Page:** 80 - When a user searches for images, the application shows up to 80 images. You can also change this number in the configuration file in the `flickr.countPictureInPage` part

- **Batch Data Retrieval from Flickr:** If the `batchSizeMultiplier` is set to 3, the server gets three times more images than the user asks for (240 images). The extra images are saved in the cache for later use. You can change this value in the configuration file in the `flickr.batchSizeMultiplier` part

- **Caching Image Details:** Each image's details are stored in the cache based on its **ID**. This helps users get the information they need quickly without putting too much load on the server.

