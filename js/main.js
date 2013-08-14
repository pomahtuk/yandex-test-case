$(function() {
  $.ajax({
    dataType: 'json',
    method:'GET',
    url:'./presentations.json'
  }).done(function(data) {
    console.log(data);
  });
})