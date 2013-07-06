$(document).ready( function () {
  $('*').on("click", function( e ) {    
    e.stopPropagation();
    
    var _this   = $(this);
    var overlay = $('#overlay');
    
    if ( !_this.hasClass('active') ) {
      if ( _this.is(':not(#overlay)') ) {
        _this.addClass('active');
      }

      overlay.fadeTo(200, 0.7);
    }

    if ( _this.hasClass('active') ) {
      overlay.on("click", function() {
        overlay.fadeOut(200, function() {
          _this.removeClass('active');
        });
      });
    }
  });
});