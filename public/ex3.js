const article = document.querySelector( '#article' );
const output = document.querySelector( "#output" );

const formSubmit = ( e ) => {
  e.preventDefault();
  e.stopPropagation();
  var msg = '';
  const formData = new FormData( article );
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if( request.readyState == XMLHttpRequest.DONE )
    {
      let newArticle = JSON.parse( request.responseText );
      msg = `Your article titled <em>${newArticle.title}</em> has been saved with id ${newArticle.id}`;
    }    
    output.innerHTML = msg;
  }

  request.open( "POST", "/articles", true );
  request.send( formData );
};
article.addEventListener( 'submit', formSubmit );