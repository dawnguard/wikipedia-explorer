var searchInput;

$(document).ready(function(){
  
  $('input').keypress(function(e) {
    if(e.which == 13) {
      performSearch();
    }
  });
  
  $('.circular.search.link.icon').click(function() {
      performSearch();
  });
  
  
});

var results;


function search() {
    $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&namespace=0&origin=*&search=' + searchInput, function (resultsObject) {
        results = resultsObject;
        console.log(results);
        displayResults();
    });
};

function displayResults() {
  var html = '<br>';
  for(i = 0; i<results[1].length; i++)
    {    
      html+= "<div class='item'>";
      html+= "<div class='content'>";
        var link = "<a href='" + results[3][i] + "'>";
        var title = '<h1 class="header">' + link + results[1][i] + '</a></h1>';
        html+= title;
        var description = '<p class="description">' + results[2][i] + '</p>';
        html+= description;              
      html+= "</div></div>"
    }
  console.log(html);
  $("#results").html(html);
}

function shiftSearchUp() {
  $('.ui.text.container').css('display', 'inherit');
  $('.ui.text.container').css('height', 'auto');
  $('.ui.text.container').css('max-height', 'none');
  $('h1').css('margin-top', '1rem');
  $('h1').css('margin-bottom', '1.5rem');
  $('h1').css('font-size', '2.5rem');
}

function performSearch() {
  shiftSearchUp();
  searchInput = $('input').val();
  search();
  $("input").blur();
}