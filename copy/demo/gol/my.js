var mlife = function (i, j, alive) {
	var face = '<div class="life" id="l_' + i + '_' + j + '"/>';
	var f = $(face);
	var ps = new Array();
	//var interval;
	this.draw = function () {
		if (alive) {
			f.addClass('l');
		} else {
			f.removeClass('l');
		}
	};
	this.aliveCheck = function () {
		var alivecount = 0;
		for (var i = 0; i < ps.length; i++) {
			var el = $('#l_' + ps[i]);
			if (el.length > 0) {
				if (el.hasClass('l')) {
					alivecount++;
				}
			}
		}
		if (alive) {
			if (alivecount < 2) {
				alive = false;
			} else if (alivecount == 2 || alivecount == 3) {
				alive = alive;
			} else if (alivecount > 3) {
				alive = false;
			}
		} else {
			if (alivecount == 3) {
				alive = true;
			}
		}
		//_draw();
	};
	this.getface = function () {
		return f;
	};
	function _init() {
		ps.push((i - 1) + '_' + (j - 1));
		ps.push((i - 1) + '_' + (j + 1));
		ps.push((i + 1) + '_' + (j - 1));
		ps.push((i + 1) + '_' + (j + 1));
		ps.push(i + '_' + (j - 1));
		ps.push(i + '_' + (j + 1));
		ps.push((i + 1) + '_' + j);
		ps.push((i - 1) + '_' + j);
		if (alive) {
			f.addClass('l');
		}

	};
	_init();
}

var interval;
var time = 500;
//var addMode = true;
$(function () {
	var cells = new Array();
	var per_width = 20; 
	per_width = per_width < 5 ? 10 : per_width;

	var w = $(window).width();
	var h = $(window).height();

	$('#show').css('width', w + 'px');
	$('#show').css('height', h + 'px');

	var html = "";
	var alive = false;
	for (var i = 0; i < parseInt(h / per_width); i++) {
		for (var j = 0; j < parseInt(w / per_width); j++) {
			if (Math.random() > 0.95) {
				alive = true;
			} else {
				alive = false;
			}
			var l = new mlife(i, j, alive);
			cells.push(l);
			$('#show').append(l.getface());
		}
	}
	$('.life').css('width', per_width + 'px');
	$('.life').css('height', per_width + 'px');

	interval = setInterval(allAliveCheck, time);

	$('body').click(function () {

		if (interval != null) {
			clearInterval(interval);
			interval = null;

		} else {
			interval = setInterval(allAliveCheck, time);

		}

	});
	//$('body').dblclick(function () {

	//	addMode = !addMode;
		
	//});

	$('.life').hover(function () {
		

	}, function () {
	var _this = $(this);
		if (_this.hasClass('l') ) {
			_this.removeClass('l');
		} else {
			_this.addClass('l');

		}
	
	});

	function allAliveCheck() {

		for (var i = 0; i < cells.length; i++) {
			cells[i].aliveCheck();
		}
		for (var i = 0; i < cells.length; i++) {
			cells[i].draw();
		}

	}

});
