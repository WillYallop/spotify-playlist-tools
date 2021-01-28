import Vue from 'vue'

Vue.filter('formatDate', function (value) {
    if (!value) return ''

    var d = new Date(value);
    return d.toLocaleDateString();
})

Vue.filter('msToMinAndSec', function (value) {
    if (!value) return ''
    var minutes = Math.floor(value / 60000);
    var seconds = ((value % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
})

Vue.filter('decodeHtml', function (value) {
    if (!value) return ''
    var txt = document.createElement("textarea");
    txt.innerHTML = value;
    return txt.value;
})

Vue.filter('convertMs', function (miliseconds) {
    if (!miliseconds) return ''

    var hours, minutes, seconds, total_hours, total_minutes, total_seconds;
  
    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
  
    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours);

    return `${hours}h ${minutes}m ${seconds}s`
})

