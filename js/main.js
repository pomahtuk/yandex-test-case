(function () {

  Handlebars.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  var presentations      = [];
  var current_slide      = 1;
  var anumation_progress = false;
  var forbid_hash        = false;
  var forbid_hash_change = false;
  var index_source       = $("#presentation-index-template").html();
  var index_template     = Handlebars.compile(index_source);
  var detail_source      = $("#presentation-detail-template").html();
  var detail_template    = Handlebars.compile(detail_source);

  var dec = function(a) {
    return parseInt(a, 10);
  }


  function sort_order(a, b){
    if (a.order > b.order)
       return 1
    if(a.order < b.order)
       return -1
    return 0
  }

  var init_slider = function (presentation) {
    if (presentation.options == null) {
        presentation.options = {"speed": 300};
    };

    var post_anim = function(current_slide) {
      current_slide = dec(current_slide);
      $('.slides__slide').parents('li').removeClass('active');
      $('.slides__slide[data-slide-order='+current_slide+']').parents('li').addClass('active');
      $('.presentation_nav__text ').text('Слайд ' + current_slide + ' / ' + presentation.slides.length);
      anumation_progress = false;
      forbid_hash_change = true;
      var slide_id  = $('.slides__slide[data-slide-order='+current_slide+']').data('slide-id');
      var curr_hash = window.location.hash.split('#!');
      window.location.hash = '#!' + curr_hash[1] + '#!' + slide_id;
    }
    /*
    * Left and Right arrows click
    */
    $('.presentation_nav__text ').text('Слайд ' + current_slide + ' / ' + presentation.slides.length)

    $('.presentation_container__next').click(function(e){
      e.preventDefault();
      if ( (current_slide < presentation.slides.length) && (anumation_progress == false) )  {
        anumation_progress = true
        var slide_width = $('.presentation_container__content').width();
        $('.presentation_container__contentwrapper').animate({'left': '-='+slide_width}, presentation.options.speed, function(){
          current_slide +=1;
          $('.presentation_container__prev, .presentation_nav__first').removeClass('hidden');
          post_anim(current_slide);
        });
        if (current_slide == presentation.slides.length - 1) {$('.presentation_container__next, .presentation_nav__last').addClass('hidden')};
      };
    });
    $('.presentation_container__prev').click(function(e){
      e.preventDefault();
      if ( (current_slide > 1) && (anumation_progress == false) ) {
        anumation_progress = true
        var slide_width = $('.presentation_container__content').width();
        $('.presentation_container__contentwrapper').animate({'left': '+='+slide_width}, presentation.options.speed, function(){
          current_slide -=1;
          $('.presentation_container__next, .presentation_nav__last').removeClass('hidden');
          post_anim(current_slide);
        });
        if (current_slide == 2) {$('.presentation_container__prev, .presentation_nav__first').addClass('hidden')};
      };
    });
    /*
    * First and Last arrows click
    */
    $('.presentation_nav__first').click(function(e){
      e.preventDefault();
      if (anumation_progress == false) {
        var slide_width = $('.presentation_container__content').width();
        var hidden_slides = $('.presentation_container__content:not([data-slide-order='+current_slide+'], [data-slide-order=1])')
        hidden_slides.hide()
        $('.presentation_container__contentwrapper').css({'left': -slide_width + 'px'});
        $('.presentation_container__contentwrapper').animate({'left': 0}, presentation.options.speed, function(){
          current_slide = 1;
          $('.presentation_container__next, .presentation_nav__last').removeClass('hidden');
          post_anim(current_slide);
          hidden_slides.show()
        });
        $('.presentation_container__prev, .presentation_nav__first').addClass('hidden');
      };
    });
    $('.presentation_nav__last').click(function(e){
      e.preventDefault();
      if (anumation_progress == false) {
        var slide_width = $('.presentation_container__content').width();
        var last_slide  = presentation.slides.length
        console.log(last_slide);
        var hidden_slides = $('.presentation_container__content:not([data-slide-order='+current_slide+'], [data-slide-order='+last_slide+'])')
        hidden_slides.hide()
        $('.presentation_container__contentwrapper').css({'left':'0px'});
        $('.presentation_container__contentwrapper').animate({'left': -slide_width}, presentation.options.speed, function(){
          current_slide = presentation.slides.length;
          $('.presentation_container__prev, .presentation_nav__first').removeClass('hidden');
          post_anim(current_slide);
          hidden_slides.show()
          $('.presentation_container__contentwrapper').css({'left': - (last_slide - 1) * slide_width + 'px'});
        });
        $('.presentation_container__next, .presentation_nav__last').addClass('hidden');
      };
    });
    /*
    * Each slide click
    */
    $('.slides__slide').click(function(e){
      e.preventDefault();
      if (anumation_progress == false) {
        var slide    = $(this);
        var slide_or = dec(slide.data('slide-order'));
        var slide_id = dec(slide.data('slide-id'));
        if (current_slide != slide_or) {
          var slide_width = $('.presentation_container__content').width();
          var hidden_slides = $('.presentation_container__content:not([data-slide-order='+current_slide+'], [data-slide-order='+slide_or+'])')
          hidden_slides.hide()
          if (slide_or > current_slide) {
            $('.presentation_container__contentwrapper').css({'left':'0px'});
            $('.presentation_container__contentwrapper').animate({'left': -slide_width}, presentation.options.speed, function(){
              current_slide = slide_or;
              $('.presentation_container__prev, .presentation_nav__first').removeClass('hidden');
              post_anim(current_slide);
              hidden_slides.show()
              $('.presentation_container__contentwrapper').css({'left': - (current_slide-1) * slide_width + 'px'});
            });
          } else if (slide_or < current_slide) {
            $('.presentation_container__contentwrapper').css({'left': -slide_width + 'px'});
            $('.presentation_container__contentwrapper').animate({'left': 0}, presentation.options.speed, function(){
              current_slide = slide_or;
              $('.presentation_container__next, .presentation_nav__last').removeClass('hidden');
              post_anim(current_slide);
              hidden_slides.show()
              $('.presentation_container__contentwrapper').css({'left': - (slide_or-1) * slide_width + 'px'});
            });
          };
          if (forbid_hash == true) {
            forbid_hash == false;
          } else {
            forbid_hash_change = true;
            var curr_hash = window.location.hash.split('#!');
            window.location.hash = '#!' + curr_hash[1] + '#!' + slide_id;
          };
        };
      };
    });
    /*
    * Keyboard navigation
    */
    $(document).keydown(function(e){
      if (e.keyCode == 37) { 
        var link = $('.presentation_container__prev')
        if (link.is(':visible')) {
          link.click();
        };
        return false;
      }
      if (e.keyCode == 39) {
        var link = $('.presentation_container__next')
        if (link.is(':visible')) {
          link.click();
        };
        return false;
      }
    });
  }

  var init_search = function () {
    $('.search__input').keyup(function() {
      var element   = $(this);
      var query     = element.val();
      var invisible = 0;
      for (_i = 0, _len = presentations.presentations.length; _i < _len; _i++) {
        var presentation = presentations.presentations[_i];
        if (query.length > 0) {
          var contains = ( (presentation.title.indexOf(query) > -1) || (presentation.description.indexOf(query) > -1) );
          if (!(contains)) {
            presentation.visible = false;
            $('#presentation_'+presentation.id).hide(200);
            invisible++;
          } else {
            presentation.visible = true;
            $('#presentation_'+presentation.id).show(200);
          };
        } else {
          presentation.visible = true;
          $('#presentation_'+presentation.id).show(200);
        }
      };
    })
  }

  var build_presentations_index = function () {
    var html      = index_template(presentations);
    var container = $('.step1 .presentations');
    container.html(html);

    $('.presentations_sortable').sortable({placeholder: "sortable-placeholder", forceHelperSize: true}).bind('sortupdate', function(e, ui) {
        var order = {};

        $('li.presentation').each(function (e) {
          var order_el = {};
          var id       = $(this).attr('id').split('_')[1];
          order[id] = $(this).index() + 1;
        })

        var _i, _len;
        for (_i = 0, _len = presentations.presentations.length; _i < _len; _i++) {
          var presentation = presentations.presentations[_i];
          presentation.order = order[presentation.id];
        };

        localStorage.setItem("presentations", JSON.stringify(presentations));

    });

    init_search();

    container.find('.presentation__view').on('click', function (e) {
      //e.preventDefault();
      var element   = $(this);
      var id        = element.data('presentation-id');
      var resulting = {};
      var _i, _len;

      for (_i = 0, _len = presentations.presentations.length; _i < _len; _i++) {
        var presentation = presentations.presentations[_i];
        if (presentation.id.toString() === id.toString()) {
          resulting = presentation;
          break;
        }
      };

      var html      = detail_template(resulting);
      var container = $('.step2');
      container.empty().append(html);

      current_slide = 1;
      $('.slides__slide').parents('li').removeClass('active');
      $('.slides__slide[data-slide-order='+current_slide+']').parents('li').addClass('active');
      $('.presentation_nav__text ').text('Слайд ' + current_slide + ' / ' + presentation.slides.length);

      change_step('step2');

      $("#splitter").splitter({sizeLeft: 250});

      $('.view_presentation').resize(function() {
        var slide_width = document.body.clientWidth - container.find('aside').width();
        container.find('.presentation_container__content').width(slide_width);
        $('.presentation_container__contentwrapper').css({'left': -slide_width*(current_slide - 1) + 'px'});
      }).resize();

      init_slider(resulting);

      $('.slides').sortable({axis: "y"}).bind('sortupdate', function(e, ui) {
        var slide_id = dec(ui.item.find('.slides__slide').data('slide-id'));
        var order = {};
        $('li.slides__slidewrapper').each(function (e) {
          var elem     = $(this);
          var order_el = {};
          var id       = elem.attr('id').split('_')[1];
          var order_i  = elem.index() + 1;
          order[id]    = order_i;
          elem.find('.slides__slide').attr('data-slide-order', order_i).find('.slides__slidenumber').text(order_i);
        })

        var _i, _len;
        for (_i = 0, _len = resulting.slides.length; _i < _len; _i++) {
          var slide = resulting.slides[_i];
          slide.order = order[slide.id];
        };

        resulting.slides.sort(sort_order);
        localStorage.setItem("presentations", JSON.stringify(presentations));

        var new_array, _j, _lenj;

        new_array = [];

        for (_j = 0, _lenj = resulting.slides.length; _j < _lenj; _j++) {
          var slide = resulting.slides[_j];
          new_array[slide.order] = "<div class='presentation_container__content' data-slide-id="+slide.id+" data-slide-order="+slide.order+">" + $(".presentation_container__content[data-slide-id=" + slide.id + "]").html() + "</div>";
        }

        $('.presentation_container__contentwrapper').html(new_array.join(''));
        //slide_id;
        $('.view_presentation').resize();
        // $('#slide_'+slide_id).find('.slides__slide').click();
        // $('.presentation_container__next, .presentation_nav__last, .presentation_container__prev, .presentation_nav__first').removeClass('hidden');
        // if (current_slide == presentation.slides.length) {$('.presentation_container__next, .presentation_nav__last').addClass('hidden')};
        // if (current_slide == 1) {$('.presentation_container__prev, .presentation_nav__first').addClass('hidden')};

      });
    });
  
    hash_processor(location.hash);
  
  };

  var change_step = function (step) {
    if (step == null) {
      step = 'step1';
    }
    if (step === 'step1') {
      $('.step2').hide();
      $('.step1').show();
    } else {
      $('.step1').hide();
      $('.step2').show();
    }
  }

  var fallback = function () {
    $.ajax({
      dataType: 'json',
      method:'GET',
      url:'./presentations.json'
    }).done(function(data) {
      presentations = data;
      localStorage.setItem("presentations", JSON.stringify(presentations));
      presentations.presentations.sort(sort_order);
      build_presentations_index();
    }).error(function(){
      presentations = {
        "presentations": [
          {
            "id": 1,
            "order": 1,
            "visible": true,
            "title":"Presentation 1",
            "description": "test description to presentation 1",
            "preview": "http://lorempixel.com/200/110",
            "slides": [
                {
                  "id": 1,
                  "order": 1,
                  "preview": "http://lorempixel.com/170/93",
                  "title":"Slide 1, Presentation 1",
                  "body": "<iframe width='560' height='315' src='http://www.youtube.com/embed/dDjeAc6Mi3M' frameborder='0' allowfullscreen></iframe>"
                },
                {
                  "id": 2,
                  "order": 2,
                  "preview": "http://lorempixel.com/172/94",
                  "title":"Slide 2, Presentation 1",
                  "body": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>"
                },
                {
                  "id": 3,
                  "order": 3,
                  "preview": "http://lorempixel.com/174/95",
                  "title":"Slide 3, Presentation 1",
                  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                },
                {
                  "id": 4,
                  "order": 4,
                  "preview": "http://lorempixel.com/168/92",
                  "title":"Slide 4, Presentation 1",
                  "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
                }
            ],
            "options":{
              "speed": 300
            }
          },
          {
            "id": 2,
            "order": 2,
            "visible": true,
            "title":"Presentation 2",
            "description": "test description to presentation 2",
            "preview": "http://lorempixel.com/200/110",
            "slides": [
              {
                "id": 1,
                "order": 1,
                "preview": "http://lorempixel.com/170/93",
                "title":"Slide 1, Presentation 2",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              },
              {
                "id": 2,
                "order": 2,
                "preview": "http://lorempixel.com/172/94",
                "title":"Slide 2, Presentation 2",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              },
              {
                "id": 3,
                "order": 3,
                "preview": "http://lorempixel.com/174/95",
                "title":"Slide 3, Presentation 2",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              },
              {
                "id": 4,
                "order": 4,
                "preview": "http://lorempixel.com/168/92",
                "title":"Slide 4, Presentation 2",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              },
              {
                "id": 5,
                "order": 5,
                "preview": "http://lorempixel.com/170/93",
                "title":"Slide 1, Presentation 2",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              },
              {
                "id": 6,
                "order": 6,
                "preview": "http://lorempixel.com/172/94",
                "title":"Slide 2, Presentation 2",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              },
              {
                "id": 7,
                "order": 7,
                "preview": "http://lorempixel.com/174/95",
                "title":"Slide 3, Presentation 2",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              },
              {
                "id": 8,
                "order": 8,
                "preview": "http://lorempixel.com/168/92",
                "title":"Slide 4, Presentation 2",
                "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis tortor et nisi gravida auctor. Proin aliquam quis neque eu ornare. Integer hendrerit blandit nulla sit amet vestibulum. Nulla sit amet felis at lacus feugiat lacinia. Vestibulum posuere nisl eget egestas euismod. Fusce elementum viverra nibh, sit amet imperdiet turpis sollicitudin quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras gravida sapien quis nisi interdum, vel posuere sem gravida. Quisque aliquet id ligula quis laoreet. Donec accumsan augue nec sem condimentum lacinia. Integer ut odio sed tortor sagittis bibendum imperdiet quis est. Maecenas augue justo, scelerisque nec nulla eget, bibendum bibendum sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
              }
            ],
            "options":{
              "speed": 1000
            }
          }
        ]
      };
      localStorage.setItem("presentations", JSON.stringify(presentations));
      presentations.presentations.sort(sort_order);
      build_presentations_index();
    });
  };

  var hash_processor = function (hash) {
    if (forbid_hash_change == false) {
      if (hash.length < 3) {
        change_step('step1');
      } else {
        var hash_arr = hash.split('#!');
        hash_arr.splice(0,1);
        $('#presentation_'+hash_arr[0]).find('.presentation__view').click();

        if (hash_arr.length > 1) {
          forbid_hash = true;
          $('#slide_'+hash_arr[1]).find('.slides__slide').click();
        }
      }
    } else {
      forbid_hash_change == true;
    }
  };

  $(function() {
    $('.js-show_index').click(function (e) {
      e.preventDefault();
      forbid_hash_change = true;
      location.hash = '';
      change_step('step1');
    });

    $(window).hashchange( function(){
      hash_processor(location.hash);
    });

    if (Modernizr.localstorage) {
      if (localStorage.getItem("presentations") === null) {
        fallback()
      } else {
        presentations = JSON.parse(localStorage.getItem("presentations"));
        presentations.presentations.sort(sort_order);
        build_presentations_index();
      }
    } else {
      fallback()
    }
  });
})();