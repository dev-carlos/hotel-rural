
var dance = {
  
    init: function() {
      this.dance();
    },
    
    config: {
      newSize: 40,
    },
    
  dance: function(config) {
      var newText = '',
          h1 = $('h1'),
          text = $('h1').text(),
          oldSize = h1.css('font-size'),
          length = text.length,
          i;
    
      for( i = 0; i < length; i++ ) {
        
        newText += '<span>' + text.charAt(i) + '</span>';    
      }
      
      h1.html(newText);
      
      h1.on('mouseenter mouseleave', 'span', function(e) {
        var span = $(this);
        
        if( e.type == 'mouseenter') {
           
          span.stop(true,false).animate({fontSize: dance.config.newSize + 'px'});
          
        } else if( e.type == "mouseleave" ) {
          
          span.animate({fontSize: oldSize});
        }  
      });
    }
  };
  
  $(function() {
    dance.init();
  });
  
  (function ($) {
    $(document).ready(function() {
  
      $(document).on('click.card', '.card', function (e) {
        if ($(this).find('> .card-reveal').length) {
          if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
            // Make Reveal animate down and display none
            $(this).find('.card-reveal').velocity(
              {translateY: 0}, {
                duration: 225,
                queue: false,
                easing: 'easeInOutQuad',
                complete: function() { $(this).css({ display: 'none'}); }
              }
            );
            $(this).find('.card-content>span').attr('style', '');
          }
          else if ($(e.target).is($('.card .activator')) ||
                   $(e.target).is($('.card .activator i')) ) {
            $(e.target).closest('.card').css('overflow', 'hidden');
            $(this).find('.card-reveal').css({ display: 'block'}).velocity("stop", false).velocity({translateY: '-100%'}, {duration: 300, queue: false, easing: 'easeInOutQuad'});
            $(this).find('.card-content>span').attr('style', 'color: rgba(0,0,0,0) !important');
          }
        }
  
        $('.card-reveal').closest('.card').css('overflow', 'hidden');
  
      });
  
       // Make Reveal animate up and display when mouseenter
      $(document).on('mouseenter.hover-reveal','.hover-reveal', function (e){
        $(e.target).closest('.card').css('overflow', 'hidden');
        $(this).find('.card-content>span').attr('style', 'color: rgba(0,0,0,0) !important');
        $(this).find('.card-reveal').css({ display: 'block'})
          .velocity("stop", false)
          .velocity({translateY: '-100%'},
          {duration: 300,
           queue: false,
           easing: 'easeInOutQuad'});
      });
  
      // Make Reveal animate down and display none when mouseleave
      $(document).on('mouseleave.hover-reveal','.hover-reveal', function (e){
        $(this).find('.card-reveal').velocity(
          {translateY: 0}, {
            duration: 225,
            queue: false,
            easing: 'easeInOutQuad',
            complete: function() { $(this).css({ display: 'none'}); }
          }
        );
        $(this).find('.card-content>span').attr('style', '');
      });
  
    });
  }( jQuery ));