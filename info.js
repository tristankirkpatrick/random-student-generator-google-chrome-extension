document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('infolink');
    // onClick's logic below:
    link.addEventListener('click', function() {
        var newURL = "http://gsuitelikea.pro/";
        chrome.tabs.create({ url: newURL });
    });
});
