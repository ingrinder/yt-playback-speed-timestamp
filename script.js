function getSecsAsDHMS(secs) {
    let d = Math.floor(secs / (3600*24));
    let h = Math.floor(secs % (3600*24) / 3600);
    let m = Math.floor(secs % 3600 / 60);
    let s = Math.floor(secs % 60);
    let dDisplay = d > 0 ? d + (':') : "";
    let hDisplay = (h > 0 || d > 0) ? (dDisplay === "" ? h : ("00" + h).slice(-2)) + (':') : "";
    let mDisplay = ("00" + m).slice(-2) + (':');
    let sDisplay = ("00" + s).slice(-2);
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

function getAdjustedSecs(secs) {
    let speed = document.getElementsByClassName('html5-main-video')[0].playbackRate;
    return Math.round(secs / speed);
}

function getNewTimeString(currSpeed) {
    let currSecs = document.getElementById("movie_player").getCurrentTime();
	let currDuration = 0;
	let sponsorBlockSpan = document.getElementById("sponsorBlockDurationAfterSkips");
	if (sponsorBlockSpan && sponsorBlockSpan.innerHTML != "") {
		// sponsorblock installed with skips
		sponsorBlockSpan.style.display = 'none';
		let durationString = sponsorBlockSpan.innerHTML.replace(/[^0-9]+/g, "");
		for (var i = durationString.length - 1, part = 0; i >= 0; i = i - 2, part++) {
			let partStr = "";
			if (part >= 2) {
				for (var j = 0; j < i + 1; j++) {
					partStr = partStr + durationString.charAt(j);
				}
			} else {
				partStr = durationString.charAt(i-1) + durationString.charAt(i);
			}
			switch (part) {
				case 0:
					currDuration = +currDuration + partStr;
					break;
				case 1:
					currDuration = +currDuration + (partStr * 60);
					break;
				default:
					currDuration = +currDuration + (partStr * 60 * 60);
			}
		}
	} else {
		// no sponsorblock, or no skips
		currDuration = document.getElementById("movie_player").getDuration();
	}
    let newTimeElapsed = getSecsAsDHMS(Math.round(currSecs / currSpeed));
    let newTimeDuration = getSecsAsDHMS(Math.round(currDuration / currSpeed));
    return " (" + newTimeElapsed + " / " + newTimeDuration + ")";
}

function updateNewTime() {
    let currSpeed = document.getElementsByClassName('html5-main-video')[0].playbackRate;
    let newTimeElement = document.getElementById("ytp-time-speed-adjusted");
    if (currSpeed === 1) {
        if (newTimeElement !== null) {
            newTimeElement.remove();
        }
		let sponsorBlockSpan = document.getElementById("sponsorBlockDurationAfterSkips");
		if (sponsorBlockSpan) {
			sponsorBlockSpan.style.display = '';
		}
        return;
    }
    if (newTimeElement === null) {
        let node = document.createElement("span");
        node.setAttribute("id", "ytp-time-speed-adjusted");
        node.innerHTML = getNewTimeString(currSpeed);
        document.getElementsByClassName("ytp-time-display")[0].appendChild(node);
    }
    else {
        newTimeElement.innerHTML = getNewTimeString(currSpeed);
    }
}

interval = setInterval(function() {
   updateNewTime();
 }, 500
);
