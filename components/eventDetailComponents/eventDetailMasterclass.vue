<template>
	<div class="event-detail-events">
		<div class="container">
			<h2>Sub-Events</h2>
			<div class="row event-item" v-for="event in eventDetail.RelatedEvents">
				<div class="col-lg-8 col-xl-9 event-info">
					<p><a :href="event.Link">{{event.Name}}</a></p>
					<p>{{formatStartDate(event.StartDate)}} - {{formatEndDate(event.EndDate)}}</p>
				</div>
				<div class="col-lg-4 col-xl-3">
					<div class="btn btn-dark save-cal" :id="getCalendarId(event.Id)" v-on:click="addToCalendar(event)">Save to Calendar</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

export default {
    props: ['eventDetail'],
	methods: {
		formatStartDate: function(date) {
			return moment(String(date)).format('MMM D, h:mm a');
		},
		formatEndDate: function(date) {
			return moment(String(date)).format('MMM D, h:mm a, YYYY');
		},
		getCalendarId: function(id) {
			return 'add-to-calendar-' + id;
		},
		addToCalendar: function(event){
			let myCalendar = createCalendar({
			  data: {
			    title: event.Name,
			    start: new Date(moment(event.StartDate).format('MMMM D, YYYY hh:mm')),
			    end: new Date(moment(event.EndDate).format('MMMM D, YYYY hh:mm')), 
			  }
			});

			$('#add-to-calendar-' + event.Id).text('').append(myCalendar).find('.add-to-calendar-icons').show();

			$('#add-to-calendar-' + event.Id).click(function(){
				$(this).find('.add-to-calendar-icons').toggle();
			});
		}
	}
}
</script>