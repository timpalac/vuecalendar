<template>
	<div class="event-list-paging text-center" v-if="totalPages > 1">
		<span class="paging-nav paging-prev" v-on:click="prevPage()" v-bind:class="{ 'text-black-50' : currentPageNumber === 1 }"></span>
		<span class="text-black-50">Showing</span> <span class="pages">{{ currentPageNumber }} of {{ totalPages }}</span>
		<span class="paging-nav paging-next" v-on:click="nextPage()" v-bind:class="{ 'text-black-50' : currentPageNumber == totalPages }"></span>
	</div>
</template>

<script>
export default {
	props: ['pageNumber', 'totalPages'],
    data: function () {
        return {
            currentPageNumber: this.pageNumber
        }
    },
    methods: {
    	prevPage: function() {
    		if (this.currentPageNumber !== 1) {
    			this.currentPageNumber--;
    			this.$emit('change-page', this.currentPageNumber);
    		}
    	},
    	nextPage: function() {
    		if (this.currentPageNumber != this.totalPages) {
    			this.currentPageNumber++;
    			this.$emit('change-page', this.currentPageNumber);
    		}
    	}
    },
    watch: {
        pageNumber() {
            this.currentPageNumber = this.pageNumber;
        }
    }
}
</script>