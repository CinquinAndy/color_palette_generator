window.onload = function () {
    setTimeout(function () {
        document.getElementById("loader").style.opacity = '0%';
    }, 1000);
    setTimeout(function () {
        document.getElementById("loader").style.display = 'none';
    }, 1400);
};