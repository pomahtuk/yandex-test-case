$(function() {
	$.ajax({
		dataType: 'json',
		method:'GET',
		url:'./presentations.json'
	}).done(function(data) {
	  data = JSON.parse(data);
    console.log(data);
	});
})