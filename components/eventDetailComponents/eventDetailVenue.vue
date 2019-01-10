<template>
	<div class="event-detail-venue">
		<div class="venue-bg"></div>
		<div class="container">
			<div class="row">
	      <div id="event-venue" class="col-md-6">
	        <div class="container pl-0">
				<h2>Venue &amp; Location</h2>
				<div class="property-name" v-if="eventDetail.Venue">
				  <p><a :href="eventDetail.Venue.Link">{{eventDetail.Venue.Name}}</a><br/>
				  {{ eventDetail.Venue.Address }}<br/>
				  {{ getCityState(eventDetail.City, eventDetail.State) }}, {{ eventDetail.Country }}</p>
				  <p>When making a room reservation, please mention the group name below so you may qualify for the discounted room rate for ASME meetings.</p>
				</div>
	        </div>

			<div v-if="eventDetail.Venue && eventDetail.Venue.AdditionalInformation && eventDetail.Venue.AdditionalInformation.length > 0">
				<div class="container pl-0">
					<div class="property d-none d-md-block" v-for="property in eventDetail.Venue.AdditionalInformation">
					    <p><strong>{{ property.Name }}:</strong> {{ property.Value }}</p>
					</div>
				</div>

				<div class="accordion d-md-none" id="moreInfoAccordion">
				  <div class="card">
				    <div class="card-header" id="moreInfoHeader">
				    	<div class="container">
					      <h5 class="mb-0">
					        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
					          More Venue &amp; Location Information <span class="arrow"></span>
					        </button>
					      </h5>
					     </div>
				    </div>

				    <div id="collapseOne" class="collapse" aria-labelledby="moreInfoHeader" data-parent="#moreInfoAccordion">
				      <div class="card-body">
				      	<div class="property container" v-for="property in eventDetail.Venue.AdditionalInformation">
				        	<p><strong>{{ property.Name }}:</strong> {{ property.Value }}</p>
				        </div>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
	      </div>
	      <div id="event-contact" class="col-md-6">
	        <div class="container">
	        	<div v-if="eventDetail.Contact">
					<h2>Contact Information</h2>
					<ul class="list-inline">
						<li>{{eventDetail.Contact.Name}}</li>
					  	<li><a href="mailto:hartje@asme.org">{{eventDetail.Contact.Email}}</a></li>
					 	<li><a :href="contactPhone">{{eventDetail.Contact.Phone}}</a></li>
					</ul>
				</div>

				<div v-if="eventDetail.Sponsor">
					<h2>Event Sponsor</h2>
					<div id="event-sponsor">
					  <img :src="eventDetail.Sponsor.Logo" />
					  <p>{{eventDetail.Sponsor.Name}}</p>
					</div>
				</div>

				<div v-if="eventDetail.Pricing && eventDetail.Pricing.length > 0">
					<h2>Price</h2>
					<p>{{eventDetail.Pricing[0].Cost}}-{{eventDetail.Pricing[1].Cost}}</p>
				</div>

				<div v-if="eventDetail.Host">
					<h2>Event Host</h2>
					<p>{{eventDetail.Host.Name}}</p>
				</div>

				<div v-if="eventDetail.AdditionalInformation">
					<h2>Additional Information</h2>
					<p>{{eventDetail.AdditionalInformation}}</p>
				</div>
	        </div>

	      </div>
	    	</div>
	    </div>
	</div>
</template>

<script>
import 'bootstrap';
import commonComponents from '../../components/commonComponents.vue';

export default {
    props: ['eventDetail'],
	mixins: [commonComponents],
	computed: {
		contactPhone: function() {
			return 'tel:' + this.eventDetail.Contact.Phone;
		}
	}
}
</script>