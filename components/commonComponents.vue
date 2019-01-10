<script>
import moment from 'moment';

export default {
    methods: {
        setTypeClass: function(index,endDate) {
            if (index) {
                let typeClass;
                typeClass = 'type-' + index.toLowerCase().replace(/\s/g, '-').replace(/&/g, '');
                if (endDate && moment().isAfter(endDate)) {
                    typeClass = typeClass + ' past';
                }
                return typeClass;
            }
        },
        getCityState: function(city, state) {
            if (state) {
                return city + ', ' + state;
            } else {
                return city;
            }
        },
        getCalendarRoute: function() {
            this.setValues();
            return 'event-browse.html#/' + this.getQueryStrings();
        },
        getListRoute: function() {
            this.setValues();
            return 'event-browse.html#/list-view' + this.getQueryStrings();
        },
        setValues: function() {
            if (!this.$route.query.eventType) {
                this.$route.query.eventType = '';
            }
            if (!this.$route.query.eventCountry) {
                this.$route.query.eventCountry = '';
            }
        },
        getQueryStrings: function() {
            return '?eventType=' + this.$route.query.eventType + '&eventCountry=' + this.$route.query.eventCountry;
        }
    }
}
</script>