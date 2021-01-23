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



