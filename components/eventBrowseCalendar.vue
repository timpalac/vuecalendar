<template>
	<div class="event-browse-calendar">
		<div class="event-browse-header">
			<h1>Calendar of Events</h1>
			<div class="clearfix"></div>
			<div class="view-filters" :class="{'active':mobileViewChangeActive}">
				<h4 class="d-lg-none">Change View</h4>
				<div class="change-view">
					<nav class="nav nav-pills">
						<a :href="getCalendarRoute()" class="nav-link" :class="{'active':$route.path==='/'}" v-on:click="hideMobileViewChange()">Calendar</a>
				    	<a :href="getListRoute()" class="nav-link" :class="{'active':$route.path==='/list-view'}" v-on:click="hideMobileViewChange()">List</a>
					</nav>
			    </div>
				<div id="navigate-month-day" v-on:click="hideMobileViewChange()"></div>
			</div>
			<nav class="nav nav-pills col-sm-12 event-list-filters-button d-lg-none">
				<span class="nav-link" v-on:click="showMobileViewChange()">Change View</span>
				<span class="nav-link" v-on:click="$emit('show-mobile-filters')">Filters {{countFilters()}}</span>
			</nav>
			<div id="navigate-months"></div>
		</div>
		<div id="calendarView"></div>
	</div>
</template>

<script>
import moment from 'moment';

import eventFilterMixin from '../components/eventFilterMixin.vue';
import commonComponents from '../components/commonComponents.vue';

export default {
	props: ['events'],
	data: function() {
        return {
            mobileViewChangeActive: false
        }
    },
	watch: {
		events() {
			this.initEvents();
		}
	},
	mounted: function() {
		this.initEvents();
	},
	methods: {
		formatStartDate: function(date) {
			return moment(String(date)).format('MMM D');
		},
		formatEndDate: function(date) {
			return moment(String(date)).format('D, YYYY')
		},
		initEvents: function() {
			let self = this;
			let eventList = [{groupId:100, name:"Browse Events", events: [] }];

			// Adds events to event list array with date formatting
			this.events.forEach(function(event) {
				let eventStartTime = moment(event.StartDate).format("YYYY-MM-DD hh:mm:ss");
				let eventEndTime = moment(event.EndDate).format("YYYY-MM-DD hh:mm:ss");
				let eventDateRange = self.formatStartDate(eventStartTime) + ' - ' + self.formatEndDate(eventEndTime);
				let eventLocation = self.getCityState(event.City, event.State) + ', ' + event.Country;
				let eventClass = self.setTypeClass(event.Type, eventEndTime);

				eventList[0].events.push({eventName: event.Name, eventId: event.Id, startTime: eventStartTime, endTime: eventEndTime, eventLink: event.Link, eventType: event.Type ,eventDateRange: eventDateRange, eventClass: eventClass, eventImage: event.Image, eventLocation: eventLocation });
			});

			// Initiate Web2Cal Plugin and add dates
		    let ical = new Web2Cal('calendarView', {
		        loadEvents: function(){ical.render(eventList);},             
		        readOnly: true,
		        showLeftNav: false,
		        defaultView: "month",
		        views: "day,month,week",
		        detectMobileMode: false
		    });
		    ical.build();

			$('#calendarView .web2cal-dt:not(:eq(0)), #calendarView .mobile-wc:not(:eq(0)), #calendarView .cal-templates:not(:eq(0))').remove();
			$('.moreEvents a').text('Show more');

			$('#navigate-months').append($('.next-prev-month'));
			$('#navigate-months .next-prev-month:not(:first)').remove();

			setTimeout(function(){
				$('#navigate-month-day').append($('#calNavData'));
				$('#calendarContent').addClass('loaded');
				$('.calnav li').click(function(){
					$('.calnav li').removeClass('active');
					$(this).addClass('active');
				});
			},300);
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
	mixins: [eventFilterMixin, commonComponents]
}
</script>