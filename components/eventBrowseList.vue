<template>
	<div class="event-list">
		<div class="event-browse-header">
			<h1>Calendar of Events</h1>
			<nav class="nav nav-pills col-sm-12 event-list-filters-button d-lg-none">
				<span class="nav-link" v-on:click="showMobileViewChange()">Change View</span>
				<span class="nav-link" v-on:click="$emit('show-mobile-filters')">Sort &amp; Filters {{countFilters()}}</span>
			</nav>
			<h4 class="d-lg-none event-list-filter-heading d-flex" v-if="filterBy==='month'"><i class="fas fa-angle-left" v-on:click="changeMonth('prev')"></i> <span class="month flex-fill">{{filteredMonth}}</span> <span class="year flex-fill">{{filteredYear}}</span> <i class="fas fa-angle-right" v-on:click="changeMonth('next')"></i></h4>
			<div class="clearfix"></div>

			<div class="view-filters" :class="{'active':mobileViewChangeActive}">
				<h4 class="d-lg-none">Change View</h4>
				<div class="change-view">
					<nav class="nav nav-pills">
						<a :href="getCalendarRoute()" class="nav-link" :class="{'active':$route.path==='/'}" v-on:click="hideMobileViewChange()">Calendar</a>
				    	<a :href="getListRoute()" class="nav-link" :class="{'active':$route.path==='/list-view'}" v-on:click="hideMobileViewChange()">List</a>
					</nav>
			    </div>

			    <nav class="nav nav-pills col-lg-6 filter-event-by" v-on:click="hideMobileViewChange()">
					<span class="nav-link" v-on:click="filterResults('upcoming')" :class="{'active':filterBy==='upcoming'}">Upcoming ({{upcomingEvents.length}})</span>
					<span class="nav-link" v-on:click="filterResults('archived')" :class="{'active':filterBy==='archived'}">Archived ({{archivedEvents.length}})</span>
					<span class="nav-link" v-on:click="filterResults('month')" :class="{'active':filterBy==='month'}">By Month</span>
				</nav>

				<div class="event-list-filters d-none d-lg-flex">
					<div class="col-lg-12">
						<form class="form-inline">
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
		</div>

		<h4 class="event-list-filter-heading d-none d-lg-block" v-if="filterBy==='month'"><i class="fas fa-angle-left" v-on:click="changeMonth('prev')"></i> <span class="month">{{filteredMonth}}</span> <span class="year">{{filteredYear}}</span> <i class="fas fa-angle-right" v-on:click="changeMonth('next')"></i></h4>

		<div class="event-list-browse">  
			<eventItem v-if="filteredEvents.length"
			  v-for="event in filteredEvents"
			  :event="event"
			  :key="event.Id">
			</eventItem>
			<eventPaging v-on:change-page="changePage($event)" v-bind:page-number="currentPage" v-bind:total-pages="totalPages"></eventPaging>
		</div>

		<div class="no-results" v-if="!filteredEvents.length">
			<h3>No Results Found</h3>
			<p><strong>Sorry, no events match your criteria</strong></p>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

import eventItem from '../components/eventListItem.vue'
import eventPaging from '../components/eventListPaging.vue'
import eventFilterMixin from '../components/eventFilterMixin.vue';
import commonComponents from '../components/commonComponents.vue';

export default {
    props: ['events'],
    data: function() {
        return {
            currentPage: 1,
            totalPages: 1,
            eventsPerPage: 5,
            filteredEvents: [],
            upcomingEvents: [],
            archivedEvents: [],
            pagingEvents: [],
            filterBy: 'upcoming',
            sortBy: 'date',
            filteredDate: null,
            filteredMonth: null,
            filteredYear: null,
            mobileViewChangeActive: false
        }
    },
	watch: {
		events() {
            filteredDate: null;
            filteredMonth: null;
            filteredYear: null;
			this.initEvents();
		},
		sortBy() {
			this.initEvents();
		}
	},
	mounted: function() {
		this.initEvents();
	},
    methods: {
	    changePage: function(pageNum) {
			this.currentPage = pageNum;
			this.filteredEvents = this.filterEvents();
	    },
	    initEvents: function(hasFilter) {
	    	if (!hasFilter) {
	    		this.filterBy = 'upcoming';
	    	}
	    	if (!this.filteredMonth) {
	    		this.filteredDate = moment().format('MMM YYYY');
	    		this.filteredMonth = moment(this.filteredDate).format('MMM');
	    		this.filteredYear = moment(this.filteredDate).format('YYYY');
	    	}
	    	this.currentPage = 1;
			this.filteredEvents = this.filterEvents();
			this.totalPages = Math.ceil(this.pagingEvents.length / this.eventsPerPage);
	    },
	    filterEvents: function() {
	    	let finalEvents = [];
	    	this.upcomingEvents = [];
	    	this.archivedEvents = [];
	    	let self = this;
	    	this.events.forEach(function(value) {
	    		if (self.filterBy === 'upcoming' && !moment().isAfter(value.EndDate) || self.filterBy === 'archived' && moment().isAfter(value.EndDate) || self.filterBy === 'month' && moment(value.EndDate).format('MMM YYYY') === self.filteredDate) {
					finalEvents.push(value);
	    		}

	    		if (!moment().isAfter(value.EndDate)) {
					self.upcomingEvents.push(value);
	    		}

	    		if (moment().isAfter(value.EndDate)) {
					self.archivedEvents.push(value);
	    		}
	    	});

	    	finalEvents = this.sortEvents(finalEvents);
	    	
	    	this.pagingEvents = finalEvents;
	    	return finalEvents.slice(this.eventsPerPage * this.currentPage - this.eventsPerPage, this.eventsPerPage * this.currentPage);
	    },
	    filterResults: function(filterBy) {
	    	this.filterBy = filterBy;
	    	this.initEvents(true);
	    },
	    changeMonth: function(type) {
	    	if (type==='prev') {
	    		this.filteredDate = moment(this.filteredDate).subtract(1,'months').format('MMM YYYY')
    		} else if (type === 'next') {
	    		this.filteredDate = moment(this.filteredDate).add(1,'months').format('MMM YYYY')
    		}

    		this.filteredMonth = moment(this.filteredDate).format('MMM');
    		this.filteredYear = moment(this.filteredDate).format('YYYY');
	    	this.initEvents(true);
	    },
	    showMobileViewChange: function() {
	        this.mobileViewChangeActive = true;
	        $('.event-browse-bg').addClass('active');
	    },
	    hideMobileViewChange: function() {
	        this.mobileViewChangeActive = false;
	        $('.event-browse-bg').removeClass('active');
	    }
	},
	components: {
		eventItem,
		eventPaging
	},
    mixins: [eventFilterMixin, commonComponents]
}
</script>