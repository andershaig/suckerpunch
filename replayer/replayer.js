(function ($, Replayer, undefined) {
  // Creates a new canvas element and appends it as a child
  // to the parent element, and returns the reference to
  // the newly created canvas element

  Replayer.createCanvas = function (parent, width, height) {
    var canvas = {};
    canvas.node = document.createElement('canvas');
    canvas.context = canvas.node.getContext('2d');
    canvas.node.width = width || 100;
    canvas.node.height = height || 100;
    parent.appendChild(canvas.node);
    return canvas;
  }
  
  Replayer.drawLines = function (ctx, pdata) {
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 1;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.strokeStyle = "#FFF";
    
    // Draw lines from data
    for (var i = 0; i < pdata.length; i++) {
        ctx.moveTo(pdata[i].x, pdata[i].y);

        console.log(i);
        console.log(pdata.length);
        
        if (i < pdata.length - 1) {
            ctx.lineTo(pdata[i+1].x, pdata[i+1].y);
            ctx.stroke();
        }
    }
    
    //ctx.moveTo(mouse.x, mouse.y);
    //ctx.lineTo(k.pageX - parentOffset.left, k.pageY - parentOffset.top);
    //ctx.stroke();
    
    ctx.closePath();
  }

  Replayer.drawPoints = function (ctx, pdata) {
    ctx.fillCircle = function(x, y, radius) {
      this.shadowOffsetX = 0;
      this.shadowOffsetY = 1;
      this.shadowBlur = 1;
      this.shadowColor = 'rgba(0, 0, 0, 0.5)';
      this.beginPath();
      this.moveTo(x, y);
      this.arc(x, y, radius, 0, Math.PI * 2, false);
      this.fillStyle = 'transparent';
      this.fill();
      this.lineWidth = 5;
      this.strokeStyle = '#FFF';
      this.stroke();
    };

    // Draw points from data
    for (var i = 0; i < pdata.length; i++) {
        var point = pdata[i];

        ctx.fillCircle(point.x, point.y, 5);
    }
  }

  Replayer.init = function (container, width, height, fillColor) {
    var canvas = Replayer.createCanvas(container, width, height);
    var ctx = canvas.context;
    
    // custom fillCircle method
    // ctx.fillCircle = function(x, y, radius) {
    //     this.shadowOffsetX = 0;
    //     this.shadowOffsetY = 1;
    //     this.shadowBlur = 1;
    //     this.shadowColor = 'rgba(0, 0, 0, 0.5)';
    //     this.beginPath();
    //     this.moveTo(x, y);
    //     this.arc(x, y, radius, 0, Math.PI * 2, false);
    //     this.fillStyle = 'transparent';
    //     this.fill();
    //     this.lineWidth = 5;
    //     this.strokeStyle = '#FFF';
    //     this.stroke();
    // };
    
    ctx.clearTo = function(fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(0, 0, width, height);
    };
    
    ctx.clearTo(fillColor || "transparent");

    // bind mouse events
    var pdata = [
        {
            x: 1123,
            y: 95,
            t: 1371961141308
        },
        {
            x: 941,
            y: 76,
            t: 1371961141393
        },
        {
            x: 473,
            y: 231,
            t: 1371961141476
        },
        {
            x: 266,
            y: 326,
            t: 1371961141561
        },
        {
            x: 137,
            y: 402,
            t: 1371961141644
        },
        {
            x: 102,
            y: 433,
            t: 1371961141727
        }
    ];

    Replayer.drawLines(ctx, pdata);
    Replayer.drawPoints(ctx, pdata);
  
    ctx.stroke();
  }

  $(document).ready( function () {
    var container = document.getElementById('canvas');
    var width     = window.innerWidth;
    var height    = window.innerHeight;

    Replayer.init(container, width, height, 'transparent');
  });

}(jQuery, window.Replayer = window.Replayer || {}));