<template>
	<div class="event-detail-description">
		<div class="container">
			<h2>Description</h2>
			<p>{{ eventDetail.Description }}</p>

			<div class="event-pricing" v-if="eventDetail.Pricing">
				<h2>Price</h2>
				<p>
					<span v-for="pricing in eventDetail.Pricing">
						{{pricing.Type}}: <strong>{{pricing.Cost}}</strong>
					</span>
				</p>
			</div>

			<div class="event-speakers" v-if="eventDetail.Speakers">
		      <h2>Speakers</h2>
		      <div class="row">
		        <div class="col-md-4" v-for="speaker in eventDetail.Speakers">
		          <div class="row speaker-item">
		            <div class="col-xs-5">
		              <img :src="speaker.Thumbnail" class="img-fluid" />
		            </div>
		            <div class="col-xs-7">
		            	<div class="speaker-item-detail">
			              <p><strong>{{speaker.Name}}</strong><br>
			              {{speaker.Title}}<br>
			              {{speaker.Company}}</p>

			              <p class="read-bio" data-toggle="modal" :data-target="speakerTarget(speaker.Id)">Read Bio</p>
			             </div>
		            </div>
		          </div>

		          <div class="modal fade" :id="speakerTargetId(speaker.Id)" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				    	<div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </button>
				    	</div>
					      <div class="modal-body">
						      <div class="row speaker-item">
					            <div class="col-sm-12 col-md-4">
					              <img :src="speaker.Image" class="img-fluid" />
					            </div>
					            <div class="col-sm-12 col-md-8">
					            	<div class="speaker-item-detail">
										<h2>{{speaker.Name}}</h2>
										<p><strong>{{speaker.Title}}<br>
										{{speaker.Company}}</strong></p>
										<p>{{speaker.Description}}</p>
						             </div>
					            </div>
					          </div>
					      </div>
				    </div>
				  </div>
				</div>
		        </div>
		      </div>
		    </div>
		</div>
	</div>
</template>

<script>
export default {
    props: ['eventDetail'],
    methods: {
    	speakerTarget: function(id) {
    		return '#speaker-modal-' + id;
    	},
    	speakerTargetId: function(id) {
    		return 'speaker-modal-' + id;
    	}
    }
}
</script>