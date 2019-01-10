<template>
	<div class="event-search-form-header">
		<div class="float-right search-form col-lg-4" :class="{'d-none d-lg-block': !mobileSelected}">
			<p class="close-icon" :class="{'d-none': !mobileSelected}" @click="hideMobileFullSearch()"></p>
			<form v-on:submit.prevent class="form-inline">
				<input class="form-control" placeholder="Search for an event..." v-model="searchEvent">
				<button type="submit" class="fas fa-search" v-on:click="submitSearch()"></button>
			</form>
			<p class="small text-right"><a href="event-search.html">Advanced Search</a></p>
		</div>
		<div class="search-form d-lg-none">
			<form class="form-inline float-right" @click="showMobileFullSearch()" :class="{'d-none': mobileSelected}">
				<button type="submit" class="fas fa-search"></button>
				<input class="form-control" placeholder="Search Events...">
			</form>
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
    	return {
		  searchEvent: '',
		  mobileSelected: false
        }
    },
	methods: {
		submitSearch: function() {
			window.location = 'event-search.html#/results?eventName=' + this.searchEvent;
		},
	  	showMobileFullSearch: function() {
		  this.mobileSelected = true;
		  $('.event-browse-bg').addClass('active');
		},
		hideMobileFullSearch: function() {
			this.mobileSelected = false;
			$('.event-browse-bg').removeClass('active');
		}
	}
}
</script>