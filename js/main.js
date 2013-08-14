$(function() {
  $.ajax({
    dataType: 'json',
    method:'GET',
    url:'./presentations.json'
  }).done(function(data) {
    console.log(data);
    var source   = $("#presentation-index-template").html();
    var template = Handlebars.compile(source);
    var html     = template(data);
    console.log(html);
    $('.step1 .presentations').html(html);
  });
})