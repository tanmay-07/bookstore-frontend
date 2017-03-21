$(document).ready(function(){


  loadBooks();
  loadSideNav();



});

function loadBooks() {
  axios.get('http://localhost:3000/api/books')
        .then(function (response) {
          data = response.data;
          loadData(data);
          console.log(data);
        });
}
function loadSideNav() {
  axios.get('http://localhost:3000/api/genres/')
              .then(function (response) {
                data = response.data;
                data.forEach(function (genre) {
                  $("#sideNav").append("<a href=\"#\" class=\"collection-item\">"+genre+"</a>");
                });
                $("#sideNav a").on("click", function () {
                  // console.log($(this)[0].innerText);
                  var genre =$(this)[0].innerText;
                  if(genre =="All")
                    loadBooks();
                  else {
                      axios.get('http://localhost:3000/api/books/genre/'+genre)
                            .then(function (response) {
                              data = response.data;
                              $("#output").html('');
                              loadData(data);
                            });
                    }
                  });
 });
}
function loadData (data){
  var output ="";
  data.forEach(function (book) {
     output +=`
    <div class="col s3">
      <div class="card small">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${book.imageurl}">
          <div class ="card-title activator">${book.title}</div>
        </div>
        <div class="card-content center-align">
         <span class="card-title activator grey-text text-darken-4">${book.title}<i class="material-icons right">more_vert</i></span>

        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${book.title}<i class="material-icons right">close</i></span>
          <ul>
           <li><strong>By </stong>${book.author}</li>
           <li><strong>Genre: </stong>${book.genre}</li>
           <li><strong>Price: </stong>${book.price}</li>
          </ul>
        </div>
      </div>
    </div>
    `;
    $("#output").html(output);
  })
}
