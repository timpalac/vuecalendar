<template>
	<div class="event-item row" :class="setTypeClass(event.Type)">
		<div class="d-none d-lg-block col-lg-2 event-item-bg"></div>
		<div class="col-sm-12 col-lg-2">
			<p class="event-date">{{ formatStartDate(event.StartDate) }} - {{ formatEndDate(event.EndDate) }} </p>
			<div class="col-sm-12 event-item-bg"></div>
		</div>
		<div class="col-sm-12 col-lg-7">
	  	<h3><a v-bind:href="event.Link">{{ event.Name }}</a></h3>
	  	<p>{{ getCityState(event.City, event.State) }}, {{ event.Country }}</p>
	</div>
		<div class="d-none d-lg-block col-sm-12 col-lg-3">
			<p class="event-type">{{ event.Type }}</p>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';

import commonComponents from '../components/commonComponents.vue';

export default {
	props: ['event'],
	mixins: [commonComponents],
	methods: {
		formatStartDate: function(date) {
			return moment(String(date)).format('MMM D');
		},
		formatEndDate: function(date) {
			return moment(String(date)).format('D, YYYY')
		}
	}
}
</script>