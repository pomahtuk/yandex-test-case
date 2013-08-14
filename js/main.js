Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

var presentations = [];
var index_source   = $("#presentation-index-template").html();
var index_template = Handlebars.compile(index_source);
var detail_source   = $("#presentation-detail-template").html();
var detail_template = Handlebars.compile(detail_source);


var build_presentations_index = function () {
    var html      = index_template(presentations);
    var container = $('.step1 .presentations');
    container.html(html);

    container.find('.presentation__view').on('click', function() {
      var element   = $(this);
      var id        = element.data('presentation-id');
      var resulting = {}

      for (_i = 0, _len = presentations.presentations.length; _i < _len; _i++) {
        presentation = presentations.presentations[_i];
        if (presentation.id.toString() === id.toString()) {
          resulting = presentation;
          console.log(presentation);
          break;
        }
      };

      var html      = detail_template(resulting);
      var container = $('.step2');
      container.empty().append(html);

      container.find('.presentation_container__content').width(document.body.clientWidth - container.find('aside').width());

      change_step('step2');
    })
}

var rebuild_presentations_index = function () {
  var html      = index_template(presentations);
  var container = $('.step1 .presentations');
  container.empty().append(html);
}

var change_step = function (step) {
  if (step == null) {
    step = 'step1';
  }
  if (step == 'step1') {
    $('.step2').hide()
    $('.step1').show()
  } else {
    $('.step1').hide()
    $('.step2').show()
  }
}

$(function() {
  $('.js-show_index').click(function(){
    change_step('step1');
  });
  $.ajax({
    dataType: 'json',
    method:'GET',
    url:'./presentations.json'
  }).done(function(data) {
  	presentations = data;
    build_presentations_index();
  }).error(function(){
    presentations = {
      "presentations": [
        {
          "id": 1,
          "visible": true,
          "title":"Presentation 1",
          "description": "test description to presentation 1",
          "preview": "http://lorempixel.com/200/110",
          "slides": [
              {
                "id": 1,
                "preview": "http://lorempixel.com/170/93",
                "title":"Slide 1, Presentation 1",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              },
              {
                "id": 2,
                "preview": "http://lorempixel.com/172/94",
                "title":"Slide 2, Presentation 1",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              },
              {
                "id": 3,
                "preview": "http://lorempixel.com/174/95",
                "title":"Slide 3, Presentation 1",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              },
              {
                "id": 4,
                "preview": "http://lorempixel.com/168/92",
                "title":"Slide 4, Presentation 1",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              }
          ],
          "options":{
            "speed": 3000,
            "transition": "fade"
          }
        },
        {
          "id": 2,
          "visible": true,
          "title":"Presentation 2",
          "description": "test description to presentation 2",
          "preview": "http://lorempixel.com/200/110",
          "slides": [
            {
              "id": 1,
              "preview": "http://lorempixel.com/170/93",
              "title":"Slide 1, Presentation 2",
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            },
            {
              "id": 2,
              "preview": "http://lorempixel.com/172/94",
              "title":"Slide 2, Presentation 2",
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            },
            {
              "id": 3,
              "preview": "http://lorempixel.com/174/95",
              "title":"Slide 3, Presentation 2",
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            },
            {
              "id": 4,
              "preview": "http://lorempixel.com/168/92",
              "title":"Slide 4, Presentation 2",
              "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
            }
          ],
          "options":{
            "speed": 3000,
            "transition": "fade"
          }
        }
      ]
    };
    build_presentations_index();
  });
})