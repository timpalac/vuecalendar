<template>
	<div class="event-browse-container">
		<div class="event-browse-bg"></div>
		<div class="event-browse">
			<div class="event-col-bg col-lg-3 d-none d-lg-block"></div>
			<div class="row">
				<div class="col-lg-3">
					<event-filters v-bind:events="allEvents" v-on:update-results="filterEvents($event)" v-on:close-mobile-filters="hideMobileFilters()" :class="{'d-none d-lg-block':!mobileFilters}" :mobileFilters="mobileFilters"></event-filters>
				</div>
				<div class="col-sm-12 col-lg-9">
					<div class="event-browse-wrapper">
						<nav aria-label="breadcrumb">
						  <p class="breadcrumb float-left d-lg-none"><a href="#">&lt; Events</a></p>
						</nav>
						<event-search-form-header></event-search-form-header>
				    	<router-view v-bind:events="events" v-on:page-updated="filterEvents($event)" v-on:filter-results="filterListEvents($event)" v-on:show-mobile-filters="showMobileFilters()" :class="{'d-none d-lg-block':mobileFilters}"></router-view>
				    	</div>
				    </div>
			    </div>
		    </div>
	    <site-footer></site-footer>
	</div>
</template>

<script>
import Vue from 'vue';
import VueRouter from "vue-router";

import calendarView from '../components/eventBrowseCalendar.vue';
import listView from '../components/eventBrowseList.vue';
import eventFilters from '../components/eventFilters.vue';
import eventSearchFormHeader from '../components/eventSearchFormHeader.vue';
import eventFilterMixin from '../components/eventFilterMixin.vue';
import siteFooter from '../components/siteFooter.vue';

const routes = [
  { path: '/', component: calendarView, props: true },
  { path: '/list-view', component: listView, props: true }
];

const router = new VueRouter({
  routes
})

Vue.use(VueRouter);

export default {
	router,
	components: {
		eventFilters,
    	eventSearchFormHeader,
    	siteFooter
	},
	data: function() {
        return {
            events: [],
            allEvents: [],
            mobileFilters: false
        }
    },
	methods: {
		filterEvents: function(query) {
			let self = this;
			this.$http.get('json/event-feed.json').then(response => {
				self.events = response.body.Results.Events.filter(event => {
					return self.filterEventStringIncludes(event.Name, query.eventName) && self.filterEventType(event.Type, query.eventType) && self.filterEventStringEquals(event.Country, query.eventCountry) && self.filterEventStringEquals(event.Format, query.eventFormat) && self.filterEventStringEquals(event.PriceType, query.eventPriceType);
				});
				self.allEvents = response.body.Results.Events;

				if (this.$route.query.mobileFilters === true) {
					this.mobileFilters = true
				}
			});
		}
	},
    watch: {
	    $route() {
			this.filterEvents(this.$route.query);
	    }
	},
	mounted: function() {
    	this.filterEvents(this.$route.query);
	},
	mixins: [eventFilterMixin]
}
</script>