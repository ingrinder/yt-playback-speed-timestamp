function secondsToDhms(secs) {
    var d = Math.floor(secs / (3600*24));
    var h = Math.floor(secs % (3600*24) / 3600);
    var m = Math.floor(secs % 3600 / 60);
    var s = Math.floor(secs % 60);
    var dDisplay = d > 0 ? d + (':') : "";
    var hDisplay = (h > 0 || d > 0) ? (dDisplay === "" ? h : ("00" + h).slice(-2)) + (':') : "";
    var mDisplay = ("00" + m).slice(-2) + (':');
    var sDisplay = ("00" + s).slice(-2);
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
function newTimeElapsedCalc() {
    var seconds = ytplayer = document.getElementById("movie_player").getCurrentTime();
    var speed = document.getElementsByClassName('html5-main-video')[0].playbackRate;
    var newSeconds = Math.round(seconds / speed);
    var newTimeText = secondsToDhms(newSeconds);
    return newTimeText;
}
function newTimeDurationCalc() {
    var seconds = ytplayer = document.getElementById("movie_player").getDuration();
    var speed = document.getElementsByClassName('html5-main-video')[0].playbackRate;
    var newSeconds = Math.round(seconds / speed);
    var newTimeText = secondsToDhms(newSeconds);
    return newTimeText;
}
function writeNewTime() {
    var currSpeed = document.getElementsByClassName('html5-main-video')[0].playbackRate;
    if (currSpeed === 1) {
        return;
    }
    var newTimeElapsed = newTimeElapsedCalc();
    var newTimeDuration = newTimeDurationCalc();
    var newTime = " (" + newTimeElapsed + " / " + newTimeDuration + ")";
    var newTimeElement = document.getElementById("new-speed-time");
    if (newTimeElement === null) {
        var node = document.createElement("span");
        node.setAttribute("id", "new-speed-time");
        node.innerHTML = newTime;
        document.getElementsByClassName("ytp-time-display")[0].appendChild(node);
    }
    else {
        newTimeElement.innerHTML = newTime;
    }
}
interval = setInterval(function() {
   writeNewTime();
 }, 500
);
