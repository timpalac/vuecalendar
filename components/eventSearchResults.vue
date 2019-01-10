<template>
	<div class="event-search-results">
		<div class="event-browse-bg"></div>
		<div class="search-results">
			<div class="event-col-bg col-lg-3 d-none d-sm-none d-lg-block"></div>
			<div class="row">
				<div class="col-lg-3">
					<event-filters v-bind:events="allEvents" v-on:update-results="filterEvents($event)" v-on:close-mobile-filters="hideMobileFilters()" v-on:sort-results="updateSort($event)" :class="{'d-none d-lg-block':!mobileFilters}" :mobileFilters="mobileFilters"></event-filters>
				</div>
				<div class="col-sm-12 col-lg-9">
					<div class="event-search-wrapper">

						<nav aria-label="breadcrumb">
						  <p class="breadcrumb float-left d-lg-none"><a href="#">&lt; Events</a></p>
						</nav>
						<event-search-form-header></event-search-form-header>

						<div class="event-search-header">
							<h1>Event Search Results</h1>
							<p>Event Title: "{{ $route.query.eventName }}", Event Type: {{ eventTypeFilterText($route.query.eventType) }}, Location: {{ eventCountryFilterText($route.query.eventCountry) }}</p>

							<div class="event-list-filters row">
								<nav class="nav nav-pills col-sm-12 event-list-filters-button d-lg-none">
									<span class="nav-link" v-on:click="showMobileFilters()">Sort &amp; Filters {{countFilters()}}</span>
								</nav>
								<nav class="nav nav-pills col-sm-12 col-lg-6">
									<span class="nav-link" v-on:click="filterResults('upcoming')" :class="{'active':filterBy==='upcoming'}">Upcoming ({{upcomingEvents.length}})</span>
									<span class="nav-link" v-on:click="filterResults('archived')" :class="{'active':filterBy==='archived'}">Archived ({{archivedEvents.length}})</span>
								</nav>			
								<div class="d-none d-lg-block col-lg-6">
									<form class="form-inline float-right">
										<label for="sortBy">Sort by</label>
										<select id="sortBy" class="custom-select" v-model="sortBy">
											<option value="date">Date</option>
											<option value="A-Z">A-Z</option>
											<option value="Z-A">Z-A</option>
										</select>
									</form>
								</div>
							</div>
						</div>

						<div class="event-list-browse" v-if="events.length">  
							<eventItem
							  v-for="event in events"
							  :event="event"
							  :key="event.Id">
							</eventItem>
						</div>
					</div>

					<div class="no-results" v-if="!events.length">
						<div class="container">
							<h3>No Results Found</h3>
							<p><strong>Sorry, no events match your criteria</strong></p>
							<button class="btn btn-dark" v-on:click="resetSearch()">New Search</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

import eventItem from '../components/eventListItem.vue';
import eventFilters from '../components/eventFilters.vue';
import eventFilterMixin from '../components/eventFilterMixin.vue';
import eventSearchFormHeader from '../components/eventSearchFormHeader.vue';

export default {
	data: function() {
        return {
            events: ['load'],
            allEvents: [],
            upcomingEvents: [],
            archivedEvents: [],
            filterBy: 'upcoming',
            mobileFilters: false,
            sortBy: 'date'
        }
    },
    methods: {
    	resetSearch: function() {
			this.$router.push({ path: '/' });
		},
		filterEvents: function(query) {
			let self = this;
			this.$http.get('json/event-feed.json').then(response => {
				self.events = response.body.Results.Events.filter(event => {
					return self.queryEventFilters(event,query) && (self.filterBy === 'upcoming' && !moment().isAfter(event.EndDate) || self.filterBy === 'archived' && moment().isAfter(event.EndDate));
				});
				self.events = this.sortEvents(self.events);
				self.allEvents = response.body.Results.Events;

				self.upcomingEvents = response.body.Results.Events.filter(event => {
					return self.queryEventFilters(event,query) && !moment().isAfter(event.EndDate);
				});

				self.archivedEvents = response.body.Results.Events.filter(event => {
					return self.queryEventFilters(event,query) && moment().isAfter(event.EndDate);
				});

				if (this.$route.query.mobileFilters === true) {
					this.mobileFilters = true
				}
			});
		},
	    queryEventFilters: function(event,query) {
	        return this.filterEventStringIncludes(event.Name, query.eventName) && this.filterEventType(event.Type, query.eventType) && this.filterEventStringEquals(event.Country, query.eventCountry) && this.filterEventStringEquals(event.State, query.eventState) && this.filterEventStringIncludes(event.City, query.eventCity) && this.filterEventStringEquals(event.Format, query.eventFormat) && this.filterEventStringEquals(event.PriceType, query.eventPriceType) && this.filterEventByStartDate(event.StartDate, event.EndDate, query.eventStart) && this.filterEventByEndDate(event.StartDate, event.EndDate, query.eventEnd) && this.filterEventStringIncludes(event.Committee, query.eventCommittee);
	    },
	    filterResults: function(filterBy) {
	    	this.filterBy = filterBy;
	    	this.filterEvents(this.$route.query);
	    },
	    updateSort: function(value) {
	    	this.sortBy = value;
	    }
    },
    watch: {
		sortBy() {
    		this.filterEvents(this.$route.query);
		}
    },
    mounted: function() {
    	this.filterEvents(this.$route.query);
    },
    components: {
    	eventItem,
    	eventFilters,
    	eventSearchFormHeader
    },
    mixins: [eventFilterMixin]
}
</script>