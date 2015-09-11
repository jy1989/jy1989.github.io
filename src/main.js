;(function () {

	function gE(el) {
		return document.getElementById(el);
	}

	function rd(n, m) {
		//console.log(n,m);
		var c = m - n + 1;
		return Math.floor(Math.random() * c + n);
	}

	function removeElementsByClass(className) {
		var elements = document.getElementsByClassName(className);
		while (elements.length > 0) {
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
	var App = {
		　　　　

		createNew : function (setting) {
			console.log('create:', setting);

			var el = {
				info : gE('info'),
				scrollview : gE('scrollview'),
				box : gE('box'),
				timecount : gE('timecount'),
				level : gE('level'),
				lb : gE('lb')
			};
			var win;
			var intervalId;
			var timecount = 0;
			var _this;
			var appScore=0;
			var app = {
				initEl : function () {
					_this = this;
					appScore=score;
					el.scrollview.style.width = setting.scWidth + 'px';
					el.scrollview.style.height = setting.scHeight + 'px';
					// document.body.scrollTop = rd(0, setting.scHeight - setting.bxHeight);
					// var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
					 //scrollTop= rd(0, setting.scHeight - setting.bxHeight);
					// scrollTop= '500px';
					//document.body.scrollTop = rd(0, setting.scWidth - setting.bxWidth);

					//console.log(document.body.scrollTop);
					win = _this.getViewport();

					el.box.style.width = setting.bxWidth + 'px';
					el.box.style.height = setting.bxHeight + 'px';
					el.box.style.left = rd(win.width + setting.bxWidth, setting.scWidth - setting.bxWidth) + 'px';
					el.box.style.top = rd(win.height + setting.bxHeight, setting.scHeight - setting.bxHeight) + 'px';
					el.box.style.display = 'block';
					el.box.style.backgroundColor = setting.boxColor;

					el.level.innerHTML = '第' + setting.level + '关';

					_this.babyBoxJoin();
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
					removeElementsByClass('babybox');
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
					//el.lb.innerHTML = '(' + Math.ceil(pos.width) + ',' + Math.ceil(pos.height) + ')';
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
						appScore++;
						el.timecount.innerText = '剩余时间' + setting.totalTime + 's';
						el.lb.innerHTML = '总用时'+appScore+'s';
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
						playButton.innerText = '好咯，你赢了咯!!';//+'用了'+appScore+'秒玩到了第'+setting.level+'关';
						playButton.removeEventListener('click', playButtonGameStart, false);
					} else {
						levelIndex++;
						playButton.innerText = '来!下一关！！';
						score=appScore;
					}
				},
				youFindMeFail : function () {
					el.info.innerText = '你居然找不到我！T_T';
					_this.clear();
					playdiv.style.display = 'block';
					playButton.innerText = '重新开始！！';
				},

				touchStartEvent : function () {
					//el.info.innerText = '滚啊滚！！';
				},
				touchEndEvent : function () {
					//el.info.innerText = '滚啊滚！！';
				},
				babyBoxJoin : function () {
					for (var i = 0; i < setting.babyBoxCount; i++) {
						var babybox = document.createElement("div");
						babybox.style.width = setting.babyBoxWidth + 'px';
						babybox.style.height = setting.babyBoxHeight + 'px';
						babybox.style.backgroundColor = setting.babyBoxColor;
						babybox.style.left = rd(0, setting.scWidth - setting.babyBoxWidth) + 'px';
						babybox.style.top = rd(0, setting.scHeight - setting.babyBoxHeight) + 'px';
						babybox.classList.add('babybox');
						el.scrollview.appendChild(babybox);
					}

				}

			};
			return app;

		}
	};
	var levelIndex = 0;
	var score=0;
	var settingMap = {
		scWidth : [4000, 6000, 8000],
		scHeight : [5000, 7000, 9000],
		bxWidth : [100, 90, 80],
		bxHeight : [100, 90, 80],
		totalTime : [50, 40, 30],
		level : [1, 2, 3],
		boxColor : ['yellow', 'green', 'blue'],
		babyBoxColor : ['green', 'red', 'orange'],
		babyBoxHeight : [50, 60, 70],
		babyBoxWidth : [50, 60, 70],
		babyBoxCount : [30, 40, 50]
	};
	var playButton = gE('playbutton');
	var playdiv = gE('playdiv');

	function startgame(level) {

		playdiv.style.display = 'none';

		var setting = {
			scWidth : settingMap.scWidth[levelIndex],
			scHeight : settingMap.scHeight[levelIndex],
			bxWidth : settingMap.bxWidth[levelIndex],
			bxHeight : settingMap.bxHeight[levelIndex],
			totalTime : settingMap.totalTime[levelIndex],
			level : settingMap.level[levelIndex],
			maxLevel : settingMap.level.length,
			boxColor : settingMap.boxColor[levelIndex],
			babyBoxColor : settingMap.babyBoxColor[levelIndex],
			babyBoxHeight : settingMap.babyBoxHeight[levelIndex],
			babyBoxWidth : settingMap.babyBoxWidth[levelIndex],
			babyBoxCount : settingMap.babyBoxCount[levelIndex],
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
