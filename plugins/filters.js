import Vue from 'vue'

Vue.filter('formatDate', function (value) {
    if (!value) return ''
    value = value.toString()
    var d = new Date(value);
    return d.toLocaleDateString();
})