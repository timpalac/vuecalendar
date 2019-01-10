<template>
	<div class="event-search-container">
		<div class="event-search">
	    	<router-view :key="$route.fullPath" v-on:submit-search="submitSearch($event)"></router-view>
		</div>
    	<site-footer></site-footer>
	</div>
</template>

<script>
import moment from 'moment';
import VueRouter from "vue-router";

import eventSearchForm from '../components/eventSearchForm.vue'
import eventSearchResults from '../components/eventSearchResults.vue'
import siteFooter from '../components/siteFooter.vue';

const routes = [,
  { path: '/', component: eventSearchForm, props: true },
  { path: '/results', component: eventSearchResults, props: true }
];

const router = new VueRouter({
  routes
});

export default {
	router,
	data: function() {
        return {
            searchParams: {}
        }
    },
    methods: {
	    submitSearch: function(searchParams) {
	    	this.searchParams = searchParams;
	    	if (this.searchParams.eventStart) {
	    		this.searchParams.eventStart = moment(new Date(this.searchParams.eventStart)).format('MMDDYYYY');
	    	}
	    	if (this.searchParams.eventEnd) {
	    		this.searchParams.eventEnd = moment(new Date(this.searchParams.eventEnd)).format('MMDDYYYY');
	    	}
			this.$router.push({ path: 'results', query: searchParams });
	    }
    },
	components: {
		eventSearchForm,
		siteFooter
	}
}
</script>