<template>
	<div class="event-detail-hero">
		<div class="container">
			<nav aria-label="breadcrumb">
			  <ol class="breadcrumb d-none d-lg-flex">
			    <li class="breadcrumb-item"><a href="#">Events</a></li>
			    <li class="breadcrumb-item active" aria-current="page">{{ eventDetail.Name }}</li>
			  </ol>
			  <p class="breadcrumb d-lg-none"><a href="#">&lt; Events</a></p>
			</nav>
			<p class="float-left event-type">{{eventDetail.Type}}</p>
			<div class="clearfix"></div>
			<div class="row">
				<div class="col-sm-12 col-lg-8">
					<h1>{{ eventDetail.Name }}</h1>
					<p class="d-lg-none text-center"><img :src="eventDetail.Image" :alt="eventDetail.Name" /></p>
					<p><span class="event-detail-hero-dates">{{formatStartDate(eventDetail.StartDate)}} - {{formatEndDate(eventDetail.EndDate)}} <span class="fas fa-cog event-detail-hero-dates-format" v-popover:foo>
						<popover name="foo">
						  <nav class="nav nav-pills">
							<a class="nav-link" :class="{'active':dateFormat==='US'}" v-on:click="dateFormatting('US')">American<br /> format</a>
							<a class="nav-link" :class="{'active':dateFormat==='EU'}" v-on:click="dateFormatting('EU')">European<br /> format</a>
						</nav>
						</popover></span>
					</span>
			        {{formatDayofWeek(eventDetail.StartDate)}} - {{formatDayofWeek(eventDetail.EndDate)}}</p>
					<p>{{ getCityState(eventDetail.City, eventDetail.State) }}, {{ eventDetail.Country }}</p>

			        <p><a id="btn-event-reg" class="btn btn-dark" :href="eventDetail.Registration">Registration and More Information</a></p>

			        <p>Share with your network</p>
				    <ul class="social-links list-inline">
						<li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
						<li><a href="#"><i class="fab fa-twitter"></i></a></li>
						<li><a href="#"><i class="fab fa-facebook"></i></a></li>
						<li><a href="#"><i class="fas fa-envelope"></i></a></li>
						<li id="add-to-calendar"></li>
				    </ul>
				</div>
				<div class="d-none d-lg-block col-lg-4">
					<p><img :src="eventDetail.Image" :alt="eventDetail.Name" class="img-fluid rounded-circle" /></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import Vue      from 'vue'
import Popover  from 'vue-js-popover'
 
Vue.use(Popover);

import commonComponents from '../../components/commonComponents.vue';

export default {
	data: function() {
        return {
            dateFormat: 'US'
        }
    },
    props: ['eventDetail'],
	methods: {
		formatStartDate: function(date) {
			if (this.dateFormat === 'EU') {
				return moment(String(date)).format('D MMMM h:mm a');
			} else {
				return moment(String(date)).format('MMMM D h:mm a');
			}
		},
		formatEndDate: function(date) {
			if (this.dateFormat === 'EU') {
				return moment(String(date)).format('D MMMM h:mm a, YYYY');
			} else {
				return moment(String(date)).format('MMMM D h:mm a, YYYY');
			}
		},
		formatDayofWeek: function(date) {
			return moment(String(date)).format('dddd');
		},
		dateFormatting: function(format) {
			this.dateFormat = format;
		}
	},
	watch: {
		eventDetail() {
			let self = this;
			let myCalendar = createCalendar({
			  data: {
			    title: self.eventDetail.Name,
			    description: self.eventDetail.Description,
			    location: self.getCityState(self.eventDetail.City, self.eventDetail.State),
			    start: new Date(moment(self.eventDetail.StartDate).format('MMMM D, YYYY hh:mm')),
			    end: new Date(moment(self.eventDetail.EndDate).format('MMMM D, YYYY hh:mm')), 
			  }
			});

			$('#add-to-calendar').append(myCalendar);
		}
	},
	mixins: [commonComponents]
}
</script>