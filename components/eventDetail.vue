<template>
	<div class="event-detail" :class="setTypeClass(eventDetail.Type)">
		<event-detail-hero :event-detail="eventDetail"></event-detail-hero>
		<event-detail-description :event-detail="eventDetail"></event-detail-description>
		<event-detail-venue :event-detail="eventDetail"></event-detail-venue>
		<event-detail-resources :event-detail="eventDetail" v-if="eventDetail.Resources"></event-detail-resources>
		<event-detail-masterclass :event-detail="eventDetail" v-if="eventDetail.RelatedEvents"></event-detail-masterclass>

		<div class="event-detail-disclaimer">
			<div class="container">
				<p>The ASME.ORG Calendar of Events may not be exact. Event dates, times and locations are subject to change. Cancellation of events may occur without notice.</p>
			</div>
		</div>

		<site-footer></site-footer>
	</div>
</template>

<script>
import commonComponents from '../components/commonComponents.vue';
import eventDetailHero from "../components/eventDetailComponents/eventDetailHero.vue"
import eventDetailDescription from "../components/eventDetailComponents/eventDetailDescription.vue"
import eventDetailVenue from "../components/eventDetailComponents/eventDetailVenue.vue"
import eventDetailResources from "../components/eventDetailComponents/eventDetailResources.vue"
import eventDetailMasterclass from "../components/eventDetailComponents/eventDetailMasterclass.vue"
import siteFooter from '../components/siteFooter.vue';

export default {
	data: function() {
        return {
            eventDetail: []
        }
    },
    props: ['eventSource'],
	mounted: function() {
		let self = this;
		this.$http.get(self.eventSource).then(response => {
			self.eventDetail = response.body.Event;
		});
	},
	components: {
		eventDetailHero,
		eventDetailDescription,
		eventDetailVenue,
		eventDetailResources,
		eventDetailMasterclass,
		siteFooter
	},
	mixins: [commonComponents]
}
</script>