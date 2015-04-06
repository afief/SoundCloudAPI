function SeekBarObject() {
	var inputRange = document.querySelector("#inputRange");
	var buletan = document.querySelector("#inputRangeButton");
	var buletf = document.querySelector("#inputRangeBFollow");
	var timerInfo = document.querySelector("#timerInfo");

	var duration = 0;

	var offsetX = cumulativeOffset(buletan).left + buletan.offsetWidth / 2;
	var min = 0;
	var max = inputRange.offsetWidth - 25;
	var current = 0;
	var isDown = false;
	var seekCallback = undefined;
	var seekCallbackFinish = undefined;

	window.addEventListener("resize", function() {
		min = 0;
		offsetX = cumulativeOffset(buletf).left + buletan.offsetWidth / 2;
		max = inputRange.offsetWidth - 25;
	});

	buletf.style.width = "0%";

	buletan.addEventListener("mousedown", function(e) {
		isDown = true;
		buletan.setAttribute("class", "");
		buletf.setAttribute("class", "");
	});
	window.addEventListener("mousemove", function(e) {
		if (isDown && ((e.pageX - offsetX) > 0) && ((e.pageX - offsetX) < max)) {
			seekTo(e.pageX - offsetX);
		}
	});
	window.addEventListener("mouseup", function(e) {
		if ((seekCallbackFinish != undefined) && isDown) {
			var rpos = new Object();
			rpos.pos = current * (max - min) / 100;
			rpos.percent = current;
			seekCallbackFinish(rpos);
		}
		isDown = false;
	});
	inputRange.addEventListener("mousedown", function(e) {
		if (!isDown) {
			isDown = true;
			buletan.setAttribute("class", "trans");
			buletf.setAttribute("class", "trans");
			seekTo(e.pageX - offsetX);
		}
	});

	function seekTo(pos, withCallback) {
		current = pos * 100 / (max - min);
		buletan.style.left = pos + "px";
		buletf.style.width = current+ "%";

		if ((seekCallback != undefined) && withCallback) {
			var rpos = new Object();
			rpos.pos = pos;
			rpos.percent = current;
			seekCallback(rpos);
		}

	}

	function seekToPercent(pos, withCallback) {
		seekTo(pos * (max - min) / 100, withCallback);            
	}

	function setDuration() {

	}

	return {
		seekTo: function(pos) { seekTo(pos, true); },
		seekToPercent: function(pos) { seekToPercent(pos, true); },
		getPos: function() { return current; },
		getPercent: function() { return current * 100 / (max - min); },
		onSeek: function(callback) { seekCallback = callback; },
		onSeekFinish: function(callback) { seekCallbackFinish = callback; },
		getIsDown: function() { return isDown; }
	}
}

function cumulativeOffset(element) {
	var top = 0, left = 0;
	do {
		top += element.offsetTop  || 0;
		left += element.offsetLeft || 0;
		element = element.offsetParent;
	} while(element);
	return {
		top: top,
		left: left
	};
};