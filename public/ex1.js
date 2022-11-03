const sample = document.querySelector( '#sample' );
const output = document.querySelector( "#output" );

const formSubmit = ( e ) => {
  e.preventDefault();
  e.stopPropagation();
  var msg = '';
  const formData = new FormData( sample );
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if( request.readyState == XMLHttpRequest.DONE )
    {
      let fields = JSON.parse( request.responseText ).fields;
      msg = `${fields.iName}, Thank you for your order. We will keep you posted on delivery status to at ${fields.email}`;

    }    
    output.innerHTML = msg;
  }

  request.open( "POST", "/submit1", true );
  request.send( formData );
};
sample.addEventListener( 'submit', formSubmit );