$(function() {

  // Draggable
  $('.drag-item').draggable({
    revert: true
  });

  // Droppable
  $('.single-drop').droppable({
    activeClass: 'ui-state-hover',
    hoverClass: 'ui-state-active',
    drop: function (event, ui) {
      console.log(event);
      console.log(ui);
      console.log('Dropped on ' + $(this).data('val'));
      $(this).addClass('ui-state-finished');
    }
  });
});