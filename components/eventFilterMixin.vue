<script>
import moment from 'moment';

export default {
  methods: {
    filterEventType: function (eventType, typeQuery) {
    	return !typeQuery || eventType === typeQuery || typeQuery.length === 0 || typeQuery.indexOf(eventType) !== -1 || ((typeQuery[0] === undefined || typeQuery.indexOf('')) !== -1 && typeQuery.length === 1);
    },
    filterEventStringEquals: function (eventString, stringQuery) {
        return !stringQuery || eventString === stringQuery;
    },
    filterEventStringIncludes: function (eventString, stringQuery) {
        return !stringQuery || eventString.toLowerCase().includes(stringQuery.toLowerCase());
    },
    filterEventByStartDate: function(eventStart, eventEnd, dateQuery) {
        eventStart = moment(eventStart).format('MMDDYYYY');
        eventEnd = moment(eventEnd).format('MMDDYYYY');
        return !dateQuery || eventStart >= dateQuery || eventEnd >= dateQuery;
    },
    filterEventByEndDate: function(eventStart, eventEnd, dateQuery) {
        eventStart = moment(eventStart).format('MMDDYYYY');
        eventEnd = moment(eventEnd).format('MMDDYYYY');
        return !dateQuery || eventStart <= dateQuery || eventEnd <= dateQuery;
    },
    sortEvents: function(events) {
        let self = this;
        let orderedEvents = events;
        if (this.sortBy === 'date') {
            orderedEvents = events.sort(function(a, b) {
              return new Date(a.StartDate) - new Date(b.StartDate);
            });
        } else if (this.sortBy === 'A-Z') {
            orderedEvents = events.sort(function(a, b) {
                let textA = a.Name.toLowerCase();
                let textB = b.Name.toLowerCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        } else if (this.sortBy === 'Z-A') {
            orderedEvents = events.sort(function(a, b) {
                let textA = a.Name.toLowerCase();
                let textB = b.Name.toLowerCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            });
        }
        return orderedEvents;
    },
    eventTypeFilterText: function (typeQuery) {
		let filterText;
		if (Array.isArray(typeQuery)) {
			filterText = [];
			let self = this;
    		typeQuery.forEach(function(event) {
    			if (event !== '') {
    				filterText.push(event);
    			} else if (typeQuery.length === 1 && event === '') {
                    filterText.push('All Event Types');
                }
    		});

            if (typeQuery.length === 0) {
                filterText = 'All Event Types';
            }
		} else {
            if (!typeQuery) {
                filterText = 'All Event Types';
            } else {
                filterText = typeQuery;
            }
		}
		return filterText.toString();
    },
    eventCountryFilterText: function (countryQuery) {
        if (countryQuery === '') {
            return 'All Countries';
        } else {
            return countryQuery;
        }
    },
    showMobileFilters: function() {
        this.mobileFilters = true;
        this.$route.query.mobileFilters = true;
        window.scrollTo(0,0);
        this.filterEvents(this.$route.query);
    },
    hideMobileFilters: function() {
        this.mobileFilters = false;
        this.$route.query.mobileFilters = false;
        this.filterEvents(this.$route.query);

        if (this.$route.path==='/') {
            window.location.reload();
        }
    },
    countFilters: function() {
    	let typeQuery = this.$route.query.eventType;
        if (typeQuery) {
            if (typeQuery.length > 0) {
              if (!Array.isArray(typeQuery)) {
              	typeQuery = typeQuery.split(",");
              }
              return '(' + typeQuery.length + ')';
            }
        }
    }
  }   
}
</script>