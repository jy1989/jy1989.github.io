;
(function () {

	function gE(el) {
		return document.getElementById(el);
	}

	function rd(n, m) {
		//console.log(n,m);
		var c = m - n + 1;
		return Math.floor(Math.random() * c + n);
	}

	var App = {
		　　　　

		createNew : function (setting) {
			console.log('create:', setting);

			var el = {
				info : gE('info'),
				scrollview : gE('scrollview'),
				box : gE('box'),
				timecount : gE('timecount'),
				level : gE('level')
			};
			var win;
			var intervalId;
			var timecount = 0;
			var _this;
			var app = {
				initEl : function () {
					_this = this;
					el.scrollview.style.width = setting.scWidth + 'px';
					el.scrollview.style.height = setting.scHeight + 'px';
					// document.body.scrollTop = rd(0, setting.scHeight - setting.bxHeight);
					//document.body.scrollLeft = rd(0, setting.scWidth - setting.bxWidth);

					//console.log(document.body.scrollTop);
					win = _this.getViewport();

					el.box.style.width = setting.bxWidth + 'px';
					el.box.style.height = setting.bxHeight + 'px';
					el.box.style.left = rd(win.width + setting.bxWidth, setting.scWidth - setting.bxWidth) + 'px';
					el.box.style.top = rd(win.height + setting.bxHeight, setting.scHeight - setting.bxHeight) + 'px';
					el.box.style.display = 'block';

					el.level.innerHTML = '第' + setting.level + '关';
					//console.log(rd(win.width + setting.bxWidth, setting.vpWidth - setting.bxWidth));

					//console.log(this);

				},
				initEvent : function () {
					document.body.addEventListener('scroll', _this.getCurPos, false);
					document.body.addEventListener('touchstart', _this.touchStartEvent, false);
					document.body.addEventListener('touchend', _this.touchEndEvent, false);

					box.addEventListener('click', _this.youFindMeSuccess, false);

					window.addEventListener('resize', _this.resizeEvent, false);
					intervalId = _this.intervalTrigger();

				},
				clear : function () {
					//el.box.style.display='none';
					document.body.removeEventListener('scroll', _this.getCurPos, false);
					document.body.removeEventListener('touchstart', _this.touchStartEvent, false);
					document.body.removeEventListener('touchend', _this.touchEndEvent, false);
					box.removeEventListener('click', _this.youFindMeSuccess, false);
					window.removeEventListener('resize', _this.resizeEvent, false);
					window.clearInterval(intervalId);
				},
				getViewport : function () {

					var e = window,
					a = 'inner';
					if (!('innerWidth' in window)) {
						a = 'client';
						e = document.documentElement || body;
					}
					return {
						width : e[a + 'Width'],
						height : e[a + 'Height']
					};
				},

				getCurPos : function () {
					var pos = el.box.getBoundingClientRect();
					//console.log(pos);
					if (pos.top > win.height) {
						el.info.innerText = '我在下面';
					} else if (pos.bottom < 0) {
						el.info.innerText = '我在上面';
					} else if (pos.left > win.width) {
						el.info.innerText = '我在右边';
					} else if (pos.right < 0) {
						el.info.innerText = '我在左边';
					} else {
						el.info.innerText = '快点我！';

					}

				},
				resizeEvent : function () {
					win = _this.getViewport();
					　
					_this.getCurPos();
				},
				intervalTrigger : function () {
					return window.setInterval(function () {
						setting.totalTime--;
						el.timecount.innerText = '剩余时间' + setting.totalTime + 's';
						if (setting.totalTime <= 0) {
							_this.youFindMeFail();
						}
					}, 1000);
				},
				youFindMeSuccess : function () {
					el.info.innerText = '你找到我了！';

					_this.clear();
					playdiv.style.display = 'block';

					if (setting.level >= setting.maxLevel) {
						playButton.innerText = '好咯，你赢了咯';
						playButton.removeEventListener('click', playButtonGameStart, false);
					} else {
						levelIndex++;
						playButton.innerText = '来!下一关！！';
					}
				},
				youFindMeFail : function () {
					el.info.innerText = '你居然找不到我！T_T';
					_this.clear();
					playdiv.style.display = 'block';
					playButton.innerText = '重新开始！！';
				},

				touchStartEvent : function () {
					el.info.innerText = '翻滚！！';
				},
				touchEndEvent : function () {
					el.info.innerText = '滚啊滚！！';
				}

			};
			return app;

		}
	};
	var levelIndex = 0;
	var settingMap = {
		scWidth : [5000, 7000, 9000],
		scHeight : [5000, 7000, 9000],
		bxWidth : [100, 50, 20],
		bxHeight : [100, 50, 20],
		totalTime : [70, 65, 50],
		level : [1, 2, 3]
	};
	var playButton = gE('playbutton');
	var playdiv = gE('playdiv');

	function startgame(level) {
		console.log(123);
		playdiv.style.display = 'none';

		var setting = {
			scWidth : settingMap.scWidth[levelIndex],
			scHeight : settingMap.scHeight[levelIndex],
			bxWidth : settingMap.bxWidth[levelIndex],
			bxHeight : settingMap.bxHeight[levelIndex],
			totalTime : settingMap.totalTime[levelIndex],
			level : settingMap.level[levelIndex],
			maxLevel : settingMap.level.length
		};

		var app = App.createNew(setting);

		app.initEl();
		app.initEvent();

	}
	function playButtonGameStart() {
		startgame(levelIndex);
	}

	playButton.addEventListener('click', playButtonGameStart, false);

})();
