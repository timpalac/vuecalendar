require('babel-polyfill');
import Vue from 'vue';
import VueResource from "vue-resource";

import eventBrowse from './components/eventBrowse.vue';
import eventSearch from './components/eventSearch.vue';
import eventDetail from './components/eventDetail.vue';

var css = require('./css/main.styl');

$(document).ready(function(){
	Vue.use(VueResource);

	var app = new Vue({
		el: '#event-app',
		components: {
			eventBrowse,
			eventSearch,
			eventDetail
		}
	});
});