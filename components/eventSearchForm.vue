<template>
	<div class="event-search-form">
		<div class="container">
			<nav aria-label="breadcrumb">
			  <ol class="breadcrumb d-none d-lg-flex">
			    <li class="breadcrumb-item"><a href="#">Events</a></li>
			    <li class="breadcrumb-item active" aria-current="page">Event Search</li>
			  </ol>
			  <p class="breadcrumb d-lg-none"><a href="#">&lt; Events</a></p>
			</nav>
			<h1>Event Search</h1>
			<form v-on:submit.prevent>
				<div class="form-group">
					<label for="eventName">Event Name</label>
					<input id="eventName" class="form-control" v-model="eventName" />
				</div>

				<div class="form-group">
					<label for="eventType">Event Type</label>
					<select id="eventType" class="custom-select" v-model="eventType">
						<option value="">All Event Types</option>
						<option v-for="eventType in eventTypeOptions" v-bind:value="eventType">{{ eventType }}</option>
					</select>
				</div>

				<div class="form-group">
					<label for="eventStart">Occuring Between</label>
					<div class="form-inline">
						<datepicker id="eventStart" :input-class="'form-control'" :format="'MM/dd/yyyy'" v-model="eventStart"></datepicker><span class="and"></span>
						<datepicker id="eventEnd" :input-class="'form-control'" :format="'MM/dd/yyyy'" v-model="eventEnd"></datepicker>
					</div>
				</div>

				<div class="row">
					<div class="col-sm-12 col-md-4 col-lg-3">
						<div class="form-group">
							<label for="eventCountry">Country</label>
							<select id="eventCountry" class="custom-select" v-model="eventCountry">
								<option value="">All Countries</option>
								<option v-for="country in eventCountryOptions" :value="country">{{ country }}</option>
							</select>
						</div>
					</div>
					<div class="col-sm-12 col-md-4 col-lg-3">
						<div class="form-group">
							<label for="eventState">State</label>
							<select id="eventState" class="custom-select" v-model="eventState" :disabled="!eventCountry">
								<option value="" v-if="!eventCountry" disabled>Please select a country</option>
								<option v-for="(key,value) in eventStateOptions" :value="value" :disabled="eventCountry !== 'United States'">{{ key }}</option>
							</select>
						</div>
					</div>
					<div class="col-sm-12 col-md-4 col-lg-3">
						<div class="form-group">
							<label for="eventCity">City</label>
							<input id="eventCity" class="form-control" v-model="eventCity">
						</div>
					</div>
				</div>

				<div class="form-group">
					<label for="eventCommittee">Committee</label>
					<input id="eventCommittee" class="form-control" v-model="eventCommittee" />
				</div>

				<button type="submit" class="btn btn-dark" v-on:click="$emit('submit-search', {eventName, eventType, eventStart, eventEnd, eventCountry, eventState, eventCity, eventCommittee})">Search</button>
			</form>
		</div>
	</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
	data: function() {
        return {
            eventName: '',
            eventType: '',
            eventStart: '',
            eventEnd: '',
            eventCountry: '',
            eventState: '',
            eventCity: '',
            eventCommittee: '',
            eventTypeOptions: [],
            eventCountryOptions: [],
            eventStateOptions: []
        }
    },
    mounted: function() {
    	let self = this;
		this.$http.get('json/event-feed.json').then(response => {
			let responseEvents = response.body.Results.Events;
			self.eventTypeOptions = [...new Set(responseEvents.map(event => event.Type))];
			self.eventCountryOptions = [...new Set(responseEvents.map(event => event.Country))].sort();
		});

		this.$http.get('json/state-list.json').then(response => {
			self.eventStateOptions = response.body;
		});
    },
    methods: {
    	customFormatter(date) {
	      return moment.utc(date);
	    }
    },
    components: {
    	Datepicker
    }
}
</script>