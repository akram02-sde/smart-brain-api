const Clarifai = require('clarifai');

const MODEL_ID = 'face-detection';
const returnClarifaiRequestOptions = (imageUrl) => {   
      const PAT = 'f8a47e9130fd40d989ce2a7bbc2c2718';
      const USER_ID = 'akram02april';       
      const APP_ID = 'test';
      // const MODEL_ID = 'face-detection';
      // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
      const IMAGE_URL = imageUrl;


      const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });

        const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };

      return requestOptions;

      }


const handleApiCall = (req, res) => {
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(req.body.input))
        .then(response => response.text())    
        .then(result => {res.json(result)})
        .catch(error => {console.log('error', error)});
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
 	.increment('entries', 1)
 	.returning('entries')
 	.then(entries => {
 		res.json(entries[0].entries);
 	})
 	.catch(err => res.status(400).json('unable to get the entries'))
}


module.exports = {
	handleImage,
	handleApiCall
}