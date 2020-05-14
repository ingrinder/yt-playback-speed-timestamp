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
    let currDuration = document.getElementById("movie_player").getDuration();
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
