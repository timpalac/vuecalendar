<template>
	<div class="event-detail-resources">
	  <div class="container">
	    <h2>Resources</h2>
	    <div class="row">
	      <div class="col-sm-12 col-centered">
	        <div id="resources-container" class="row">
	        	<!-- Large screen grid -->
	            <div class="resource-item col-sm-6 col-md-4 col-xl-2" v-for="resource in eventDetail.Resources"  :key="'full' + resource.Id">
	              <div class="resource-item-background">
	                <a :href="resource.Link"><img class="resource-item-image" :src="resource.Image"></a>
	              </div>
	              <a :href="resource.Link">{{resource.Name}} <span v-if="resource.Type">({{resource.Type}})</span></a>
	            </div>
	        </div>
	      </div>
	    </div>
        </carousel>

	    <div class="text-center resources-cta mt-3 d-none d-md-block">
	      <a class="btn btn-dark" href="http://www.google.com">See More</a>
	    </div>
	    <div>
	    </div>
	  </div>
	</div>
</template>

<script>
export default {
    props: ['eventDetail']
}
</script>