const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// set up a rule that says requests to "/getRate" should be handled by the
// handleParcel function below
app.get('/getRate', handleParcel);

// start the server listening
app.listen(port, function() {
  console.log('App is awake at port', port);
});

function handleParcel(request, response) {
	const parcelWeight = Number(request.query.weightLbs);
	const parcelType = request.query.parcelType;

	calculateRate(response, parcelWeight, parcelType);
}

function calculateRate(response, weight, type) {
    let price = 0;

    if (type == "Letters (Stamped)")
    {
        if (weight < 1)
            price = 0.55;
        else if (weight >= 1 && weight < 2)
            price = 0.70;
        else if (weight >= 2 && weight < 3)
            price = 0.85;
        else
            price = 1.00;

    }
    else if (type == "Letters (Metered)")
    {
        if (weight < 1)
            price = 0.50;
        else if (weight >= 1 && weight < 2)
            price = 0.65;
        else if (weight >= 2 && weight < 3)
            price = 0.80;
        else
            price = 0.95;

    }
    else if (type =="Large Envelopes (Flats)")
    {
        if (weight < 1)
            price = 1.00;
        else if (weight >= 1 && weight < 2)
            price = 1.20;
        else if (weight >= 2 && weight < 3)
            price = 1.40;
        else if (weight >= 3 && weight < 4)
            price = 1.60;
        else if (weight >= 4 && weight < 5)
            price = 1.80;
        else if (weight >= 5 && weight < 6)
            price = 2.00;
        else if (weight >= 6 && weight < 7)
            price = 2.20;
        else if (weight >= 7 && weight < 8)
            price = 2.40;
        else if (weight >= 8 && weight < 9)
            price = 2.60;
        else if (weight >= 9 && weight < 10)
            price = 2.80;
        else if (weight >= 10 && weight < 11)
            price = 3.00;
        else if (weight >= 11 && weight < 12)
            price = 3.20;
        else
            price = 3.40;
    }
    else if (type == "First-Class Package Service (Retail)")
    {
        if (weight < 4)
            price = 3.80;
        else if (weight >= 4 && weight < 8)
            price = 4.60;
        else if (weight >= 8 && weight < 12)
            price = 5.30;
        else
            price = 5.90;
    }
    else
    {}

	// Set up a JSON object of the values we want to pass along to the EJS result page
	const params = {parcelWeight: weight, parcelType: type, price: price};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/parcelResult', params);

}