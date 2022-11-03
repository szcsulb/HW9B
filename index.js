// Load the Express package as a module
const express = require( "express" );
const formidable = require( 'formidable' );
// Access the exported service
const app = express();
app.use( express.static( __dirname + '/public' ) );

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
// app.use( (req, res, next) => {
//   res.header( "Access-Control-Allow-Origin", "*" );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get( "/", ( request, response ) => {
  response.sendFile( `./views/index.html`, { root: __dirname } );
});


app.post( '/submit1', function( request, response ) {
  let form = new formidable.IncomingForm();
  form.parse( request, function( err, fields ) {
    if( err ) return response.status( 400 ).json( { error: err.message } );
    response.json( { fields } );
  });
});

app.get( "/ex/:ex", ( request, response ) => {
  response.sendFile( `./views/ex${request.params.ex}.html`, { root: __dirname } );
});

const travelInfo = {
  name: "Scott",
  countries: [
    {
      name: "Jamaica",
      year: 2018
    },
    {
      name: "Canada",
      year: 2019
    },
    {
      name: "Australia",
      year: 2019
    },
    {
      name: "Mexico",
      year: 2017
    }
  ]
};

const articles = new Array();
app.post( "/api/countries", (request, response) => {
  let form = new formidable.IncomingForm();
  form.parse( request, function( err, fields ) {

    if( err ) return response.status( 400 ).json( { error: err.message } );
    if( travelInfo.name == fields.user )
    {
      response.json( { travelInfo } );
    }
  });
});
app.post( "/articles", (request, response) => {
  let form = new formidable.IncomingForm();
  form.parse( request, function( err, fields ) {
    if( err ) return response.status( 400 ).json( { error: err.message } );
    articles.push( fields );
    let articleID =  Math.max( ...articles.keys() );
    response.json( { title: fields.title, id: articleID } );
  });
});
const listener = app.listen( process.env.PORT || 3000, () => {
  console.log( `Your app is listening on port ${listener.address().port}` );
});