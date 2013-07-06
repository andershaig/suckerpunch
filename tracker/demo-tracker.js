window.md = window.md || {};

// Start
md.sT = null;

// Count
md.count = 0;

// Coords
md.events = [];

// End Time
md.eT = null;

// Finalize
md.fin = function () {
    var output = '<div><h3>Test Data</h3></div>';
    output += '<div><b>Start</b> ' + md.sT + '</div>';
    output += '<div><b>Stop</b> ' + md.eT + '</div>';
    output += '<div><b>Duration</b> ' + (md.eT - md.sT) + '</div>';
    
    if (md.count == 0) {
        output += '<div><b>Event Count</b> ' + md.events.length + '</div>';
    } else {
        output += '<div><b>Event Count</b> ' + md.count + '</div>';
    }
    
    if (md.events.length) {
        output += '<div><b>Event Data</b></div>';
        
        $.each(md.events, function (i, v) {
            output += '<div><span>{x: ' + v.x + ',</span><span>y: ' + v.y + ',</span><span>t: ' + v.t + '}</span></div>';
        });
    }
    
    $('#res').html(output).show();
}

// Track Count
md.tC = function () {
    md.count++;
}

// Track Points
md.tP = function (e) {
    md.events.push({
        x: e.pageX,
        y: e.pageY,
        t: e.timeStamp
    });
}

$('#el').on({
    mousedown: function (e) {
        md.sT = e.timeStamp;
        
        $(this).on('mousemove', md.tP); 
    },
    mouseup: function(e) {
        md.eT = e.timeStamp;
        
        $(this).off('mousemove').off('mousedown').off('mouseup');
        
        md.fin();
    }
});