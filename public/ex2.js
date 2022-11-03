const call = document.querySelector( '#call' );
const output = document.querySelector( "#output" );

const formSubmit = ( e ) => {
  e.preventDefault();
  e.stopPropagation();
  var msg = '';
  const formData = new FormData( call );
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if( request.readyState == XMLHttpRequest.DONE )
    {
      let fields = JSON.parse( request.responseText ).travelInfo;
      msg = `User ${fields.name} has visited ${fields.countries.length} countries!`;
    }    
    output.innerHTML = msg;
  }

  request.open( "POST", "/api/countries", true );
  request.send( formData );
};
call.addEventListener( 'submit', formSubmit );