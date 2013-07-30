$(function() {

  // Draggable
  $('.drag-item').draggable();

  // Droppable
  $('.single-drop').droppable({
    drop: function (event, ui) {
      alert('Dropped!');
    }
  });
});