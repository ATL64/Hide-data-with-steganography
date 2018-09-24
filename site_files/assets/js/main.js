/*
	Industrious by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/
(function($) {

	var	$window = $(window),
		$banner = $('#banner'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				target: $body,
				visibleClass: 'is-menu-visible',
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right'
			});

}


)(jQuery);

    function showname () {
      var name = document.getElementById('file1');
      alert('Selected file: ' + name.files.item(0).name);
      alert('Selected file: ' + name.files.item(0).size);
      alert('Selected file: ' + name.files.item(0).type);
    };




$(document).ready(function(e) {
        $(".showonhover").click(function(){
			$("#selectfile").trigger('click');
		});
    });




//var input = document.querySelector('input[type=file]'); // see Example 4
var input1 = document.getElementById('file1'); // see Example 4
var input2 = document.getElementById('file2'); // see Example 4
var input3 = document.getElementById('file3'); // see Example 4

var start = null;
var hide  = null;
var unhide = null;

input1.onchange = function () {
  var file = input1.files[0];
  start = new SimpleImage(input1);
  drawOnCanvas(file);
};

input2.onchange = function () {
  var file = input2.files[0];
  hide = new SimpleImage(input2);
  drawOnCanvas(file);
};

input3.onchange = function () {
  var file = input3.files[0];
  unhide = new SimpleImage(input3);
  drawOnCanvas(file);
};


function drawOnCanvas(file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    var dataURL = e.target.result,
        c = document.querySelector('canvas'), // see Example 4
        ctx = c.getContext('2d'),
        img = new Image();

    img.onload = function() {
      c.width = img.width;
      c.height = img.height;
      ctx.drawImage(img, 0, 0);
    };

    img.src = dataURL;
  };

  reader.readAsDataURL(file);
}

function displayAsImage(file) {
  var imgURL = URL.createObjectURL(file),
      img = document.createElement('img');

  img.onload = function() {
    URL.revokeObjectURL(imgURL);
  };

  img.src = imgURL;
  document.body.appendChild(img);
}

$("#upfile1").click(function () {
    $("#file1").trigger('click');
});
$("#upfile2").click(function () {
    $("#file2").trigger('click');
});
$("#upfile3").click(function () {
    $("#file3").trigger('click');
});

function crop(image, width, height){
     var n = new SimpleImage(width,height);
     for(var p of image.values()){
   	   var x = p.getX();
   	   var y = p.getY();
  	   if (x < width && y < height){
       var np = n.getPixel(x,y);
       np.setRed(p.getRed());
       np.setBlue(p.getBlue());
       np.setGreen(p.getGreen());
        }
     }
     return n;
}

function clearbits(colorval){
    var x = Math.floor(colorval/16)*16;
    return x;
}

function chop2hide(image){
    for (var px of image.values()){
        px.setRed(clearbits(px.getRed()));
        px.setGreen(clearbits(px.getGreen()));
        px.setBlue(clearbits(px.getBlue()));
    }
    return image;
}

function shift(image){
    for(var px of image.values()){
        px.setRed(px.getRed()/16);
        px.setGreen(px.getGreen()/16);
        px.setBlue(px.getBlue()/16);
    }
    return image;
}

function unshift(image){
    for(var px of image.values()){
        px.setRed((px.getRed()  << (4)) & 0xff);
        px.setGreen((px.getGreen() << (4)) & 0xff);
        px.setBlue((px.getBlue() << (4)) & 0xff);
    }
    return image;
}

function combine(show,hide){
    var answer = new SimpleImage(show.getWidth(),show.getHeight());
    for (var px of answer.values()){
        var x = px.getX();
        var y = px.getY();
        var showPixel = show.getPixel(x,y);
        var hidePixel = hide.getPixel(x,y);
        px.setRed(showPixel.getRed() + hidePixel.getRed());
        px.setGreen(showPixel.getGreen() + hidePixel.getGreen());
        px.setBlue(showPixel.getBlue() + hidePixel.getBlue());
    }
    return answer;
}


function hidebutton() {

var can = document.getElementById("canvas1")

var cropWidth = start.getWidth();

if (hide.getWidth() < cropWidth) {
	cropWidth = hide.getWidth();
};

var cropHeight = start.getHeight();
if (hide.getHeight() < cropHeight) {
	cropHeight = hide.getHeight();
};

start = crop(start,cropWidth, cropHeight);
hide = crop(hide,cropWidth, cropHeight);

start = chop2hide(start);
hide = shift(hide);

var ans = combine(start,hide);

ans.drawTo(can);
}


function unhidebutton() {

var can = document.getElementById("canvas1");

unhided = unshift(unhide);

unhided.drawTo(can);

}

