;
(function(jy) {
    "use strict";
    jy.magnifier = function(setting) {
        var magnifierDiv;
        var magnifierDivId = setting.magnifierDivId;
        var magnifierCtx;
        var magnifierDivStyle = setting.magnifierDivStyle || 'border:1px solid #ccc;background:#fff;box-shadow:5px 5px 25px #000;';
        var magnifierCanvas;

        var width = setting.width || 150;
        var height = setting.height || 150;
        var ratio = setting.ratio || 3;
        var radius = (typeof setting.radius === 'undefined') ? (width / 2) : setting.radius;
        var sightType = setting.sightType || 'rect';
        var sightSize = (typeof setting.sightSize === 'undefined') ? 5 : setting.sightSize;
        var sightColor = setting.sightColor || '#FF0000';
        var targetCanvasId = setting.targetCanvasId;

        var targetCanvas = document.getElementById(targetCanvasId);
        var widthOffset = width * ratio / 2 - width / 2;
        var heightOffset = height * ratio / 2 - height / 2;
        var magnifierShow = false;

        var offsetX = 0;
        var offsetY = 0;

        function _setRatio(mRatio) {
            ratio = mRatio;
            widthOffset = width * ratio / 2 - width / 2;
            heightOffset = height * ratio / 2 - height / 2;
            _draw();
        }

        function _init() {
            if (!magnifierDivId) {
                magnifierDiv = document.createElement('div');
                magnifierDiv.setAttribute('style', 'z-index:1989;position:absolute;display:none;' + magnifierDivStyle);
                magnifierDiv.style.width = width + 'px';
                magnifierDiv.style.height = height + 'px';
                magnifierDiv.style.top = targetCanvas.offsetTop + 10 + 'px';
                magnifierDiv.style.left = targetCanvas.offsetLeft + 10 + 'px';
                if (radius) {
                    magnifierDiv.style.borderRadius = radius + 'px';
                }
                document.body.appendChild(magnifierDiv);
            } else {
                magnifierDiv = document.getElementById(magnifierDivId);
            }

            magnifierCanvas = document.createElement('canvas');
            magnifierCanvas.width = width;
            magnifierCanvas.height = height;
            magnifierCanvas.style.width = width + 'px';
            magnifierCanvas.style.height = height + 'px';

            if (magnifierDiv.style.borderRadius) {
                magnifierCanvas.style.borderRadius = magnifierDiv.style.borderRadius;
            }
            magnifierDiv.appendChild(magnifierCanvas);
            magnifierCtx = magnifierCanvas.getContext("2d");
            _draw();
        }

        function _draw() {
            magnifierCtx.clearRect(0, 0, width, height);
            magnifierCtx.drawImage(targetCanvas, offsetX, offsetY, width, height, -widthOffset, -heightOffset, width * ratio, height * ratio);
            if (sightType) {
                if (sightType == 'rect') {
                    if (sightSize > 0) {
                        magnifierCtx.fillStyle = sightColor;
                        magnifierCtx.fillRect(width / 2 - sightSize / 2, height / 2 - sightSize / 2, sightSize, sightSize);
                    }
                } else if (sightType == 'cross') {
                    magnifierCtx.beginPath();
                    magnifierCtx.strokeStyle = sightColor;
                    magnifierCtx.moveTo(0, height / 2);
                    magnifierCtx.lineTo(width, height / 2);
                    magnifierCtx.stroke();

                    magnifierCtx.beginPath();
                    magnifierCtx.strokeStyle = sightColor;
                    magnifierCtx.moveTo(width / 2, 0);
                    magnifierCtx.lineTo(width / 2, height);
                    magnifierCtx.stroke();
                }
            }
        }

        function _bind(event, binding) {
            if (!magnifierShow) {
                return;
            }
            if (event.touches) {
                event = event.touches[0];
            }


            var pageX = event.pageX;
            var pageY = event.pageY;
            if (!magnifierDivId) {
                if (binding && typeof(binding) === "function") {
                    binding(magnifierDiv);
                } else {
                    magnifierDiv.style.top = (pageY - height) + 'px';
                    magnifierDiv.style.left = (pageX + width / 4) + 'px';
                }
            }
            offsetX = event.offsetX || pageX - targetCanvas.offsetLeft;
            offsetY = event.offsetY || pageY - targetCanvas.offsetTop;

            offsetX -= width / 2;
            offsetY -= height / 2;
            _draw();


        }

        function _show(mshow) {
            magnifierShow = mshow;
            magnifierDiv.style.display = magnifierShow ? "" : "none";
        }
        _init();
        return {
            bind: _bind,
            show: _show,
            setRatio: _setRatio
        };
    }
}(window.jy = window.jy || {}));