<template>
	<div class="event-filter-panel">
		<nav aria-label="breadcrumb" class="d-none d-lg-block">
		  <ol class="breadcrumb">
		    <li class="breadcrumb-item"><a href="#">Events</a></li>
		    <li class="breadcrumb-item active" aria-current="page">Calendar of Events</li>
		  </ol>
		</nav>
		<div class="d-lg-none sort-mobile-form" :class="{'d-none':$route.path==='/'}">
			<form class="form-inline">
				<label for="sortByMobile">Sort by</label>
				<select id="sortByMobile" class="custom-select" v-model="sortBy" v-on:change="$emit('sort-results',sortBy)">
					<option value="date">Date</option>
					<option value="A-Z">A-Z</option>
					<option value="Z-A">Z-A</option>
				</select>
			</form>
		</div>
		<h4>Filters</h4>
		<p>Event Type</p>
		<div class="event-filter-panel-checkboxes">
			<div class="custom-control custom-checkbox" v-for="(value, key) in eventTypeOptions">
				<input class="custom-control-input" type="checkbox" :value="value" :id="getEventId(key)" v-model="selectedTypes" v-on:change="updateFilters()">
				<label class="custom-control-label" :for="getEventId(key)" :class="setCheckboxClass(value)">
					{{ value }}
				</label>
			</div>
		</div>

		<div class="form-group">
			<label for="event-countries">Location</label>
			<select id="event-countries" class="custom-select" v-model="selectedCountry" v-on:change="updateFilters()">
				<option value="">All Countries</option>
				<option v-for="country in eventCountryOptions" :value="country">{{ country }}</option>
			</select>
		</div>

		<div class="form-group">
			<label for="event-format">Event Format</label>
			<select id="event-format" class="custom-select" v-model="selectedFormat" v-on:change="updateFilters()">
				<option value="">All Formats</option>
				<option value="Virtual">Virtual</option>
				<option value="Live">Live</option>
			</select>
		</div>

		<div class="form-group">
			<label for="event-prices">Prices</label>
			<select id="event-prices" class="custom-select" v-model="selectedPriceType" v-on:change="updateFilters()">
				<option value="">All Prices</option>
				<option value="Complementary">Complementary</option>
				<option value="Pay">Pay to Attend</option>
			</select>
		</div>

		<button class="btn btn-dark d-lg-none fixed-bottom" v-on:click="updateFilters(true)">Done</button>
	</div>
</template>

<script>
import eventFilterMixin from '../components/eventFilterMixin.vue';
import commonComponents from '../components/commonComponents.vue';

export default {
	data: function() {
        return {
            eventTypeOptions: null,
            eventCountryOptions: null,
            selectedTypes: [],
            selectedCountry: '',
            selectedFormat: '',
            selectedPriceType: '',
            sortBy: 'date'
        }
    },
    props: ['events', 'mobileFilters'],
    watch: {
    	events() {
			if (!this.eventTypeOptions || !this.eventCountryOptions) {
				this.eventTypeOptions = [...new Set(this.events.map(event => event.Type))].sort();
				this.eventCountryOptions = [...new Set(this.events.map(event => event.Country))].sort();

				this.$emit('update-results', {eventName: this.$route.query.eventName, eventType: this.$route.query.eventType, eventCountry: this.$route.query.eventCountry, eventState: this.$route.query.eventState, eventCity: this.$route.query.eventCity, eventFormat: this.$route.query.eventFormat, eventPriceType: this.$route.query.eventPriceType, eventStart: this.$route.query.eventStart, eventEnd: this.$route.query.eventEnd, eventCommittee: this.$route.query.eventCommittee});
			}

			this.setFilterData();
    	}
    },
    mounted: function() {
    	this.setFilterData()
    },
    methods: {
    	setFilterData: function() {
    		let self = this;

			this.selectedCountry = (this.$route.query.eventCountry) ? this.$route.query.eventCountry : '';
			this.selectedFormat = (this.$route.query.eventFormat) ? this.$route.query.eventFormat : '';
			this.selectedPriceType = (this.$route.query.eventPriceType) ? this.$route.query.eventPriceType : '';

			this.selectedTypes = [];

			if (this.eventTypeOptions) {
				this.eventTypeOptions.forEach(function(value) {
					if (self.$route.query.eventType && self.$route.query.eventType.indexOf(value) !== -1) {
						self.selectedTypes.push(value);
					}
				});
			}
    	},
    	getEventId: function(index) {
    		return 'event-type-' + index;
    	},
    	setCheckboxClass: function(index) {
    		if (index) {
    			let checkboxClass = this.setTypeClass(index);
	    		if (this.selectedTypes.indexOf(index) !== -1) {
					return checkboxClass + ' selected';
	    		} 
	    		return checkboxClass;
    		}
    	},
    	updateFilters: function(closeMobile) {
    		let updatedQuery = {
    			'eventName': this.$route.query.eventName,
    			'eventType': this.selectedTypes,
    			'eventStart': this.$route.query.eventStart,
    			'eventEnd': this.$route.query.eventEnd,
    			'eventCountry': this.selectedCountry,
    			'eventFormat': this.selectedFormat,
    			'eventPriceType': this.selectedPriceType,
    			'mobileFilters': this.mobileFilters
    		}
    		let updatedPath = this.$route.path;

    		if (closeMobile) {
    			this.$emit('close-mobile-filters');
    			updatedQuery.mobileFilters = false;
    		}

			this.$emit('update-results', updatedQuery);
			this.$router.push({ path: updatedPath, query: updatedQuery });

			if (this.$route.path==='/' && this.mobileFilters !== true) {
				window.location.reload();
			}
    	}
    },
    mixins: [eventFilterMixin, commonComponents]
}
</script>