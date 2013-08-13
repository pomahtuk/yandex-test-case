$(function() {
	$.ajax({
		dataType: 'json',
		method:'GET',
		url:'./presentations.json'
	}).done(function() {
	  console.log(2);
	});
})