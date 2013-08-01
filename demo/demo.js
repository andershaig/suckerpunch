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
      alert('Dropped!');
    }
  });
});