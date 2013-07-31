$(function() {

  // Draggable
  $('.drag-item').draggable({
    revert: true
  });

  // Droppable
  $('.single-drop').droppable({
    drop: function (event, ui) {
      alert('Dropped!');
    }
  });
});