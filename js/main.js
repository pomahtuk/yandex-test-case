var presentations = [];

$(function() {
  $.ajax({
    dataType: 'json',
    method:'GET',
    url:'./presentations.json'
  }).done(function(data) {
    presentations = data;
    var source   = $("#presentation-index-template").html();
    var template = Handlebars.compile(source);
    var html     = template(presentations);
    console.log(html);
    $('.step1 .presentations').html(html);
  }).error(function(){
    presentations = {
        "presentations": [
            {
                "title":"Presentation 1",
                "description": "test description to presentation 1",
                "preview": "http://lorempixel.com/200/110",
                "slides": [
                    {
                        "title":"Slide 1, Presentation 1",
                        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                    },
                    {
                        "title":"Slide 2, Presentation 1",
                        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                    },
                    {
                        "title":"Slide 3, Presentation 1",
                        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                    },
                    {
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
                "title":"Presentation 2",
                "description": "test description to presentation 2",
                "preview": "http://lorempixel.com/200/110",
                "slides": [
                    {
                        "title":"Slide 1, Presentation 2",
                        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                    },
                    {
                        "title":"Slide 2, Presentation 2",
                        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                    },
                    {
                        "title":"Slide 3, Presentation 2",
                        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                    },
                    {
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
    var source   = $("#presentation-index-template").html();
    var template = Handlebars.compile(source);
    var html     = template(presentations);
    $('.step1 .presentations').html(html); 
  });
})