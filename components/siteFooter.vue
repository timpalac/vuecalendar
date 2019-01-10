<template>
	<footer>
		<div class="container d-none d-md-block">
			<div class="row">
				<div class="col-md-3">
					<h4>Lorem ipsum</h4>
					<ul class="list-inline">
						<li>Footer item</li>
						<li>Footer item</li>
						<li>Footer item</li>
						<li>Footer item</li>
					</ul>
				</div>
				<div class="col-md-3">
					<h4>Lorem ipsum</h4>
					<ul class="list-inline">
						<li>Footer item</li>
						<li>Footer item</li>
						<li>Footer item</li>
						<li>Footer item</li>
					</ul>
				</div>
				<div class="col-md-3">
					<h4>Lorem ipsum</h4>
					<ul class="list-inline">
						<li>Footer item</li>
						<li>Footer item</li>
						<li>Footer item</li>
						<li>Footer item</li>
					</ul>
				</div>
				<div class="col-md-3">
					<h4>Lorem ipsum</h4>
					<ul class="list-inline">
						<li>Footer item</li>
						<li>Footer item</li>
						<li>Footer item</li>
						<li>Footer item</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="accordion d-md-none" id="footerAccordion">
			<div class="card">
				<div class="card-header" id="card1Header">
					<div class="container">
				      <h5 class="mb-0">
				        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOneFooter" aria-expanded="true" aria-controls="collapseOneFooter">
				       		Lorem ipsum <span class="arrow"></span>
				        </button>
				      </h5>
				     </div>
				</div>

				<div id="collapseOneFooter" class="collapse" aria-labelledby="card1Header" data-parent="#footerAccordion">
					<div class="card-body">
			    		<div class="container">
							<ul class="list-inline">
								<li>Footer item</li>
								<li>Footer item</li>
								<li>Footer item</li>
								<li>Footer item</li>
							</ul>
						</div>
				    </div>
				</div>
			</div>

		    <div class="card">
			    <div class="card-header" id="card2Header">
			    	<div class="container">
				      <h5 class="mb-0">
				        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseTwoFooter" aria-expanded="true" aria-controls="collapseTwoFooter">
				       		Lorem ipsum <span class="arrow"></span>
				        </button>
				      </h5>
				     </div>
			    </div>

			    <div id="collapseTwoFooter" class="collapse" aria-labelledby="card2Header" data-parent="#footerAccordion">
			    	<div class="card-body">
			    		<div class="container">
							<ul class="list-inline">
								<li>Footer item</li>
								<li>Footer item</li>
								<li>Footer item</li>
								<li>Footer item</li>
							</ul>
						</div>
			    	</div>
		    	</div>
		    </div>

		    <div class="card">
			    <div class="card-header" id="card3Header">
			    	<div class="container">
				      <h5 class="mb-0">
				        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseThreeFooter" aria-expanded="true" aria-controls="collapseThreeFooter">
				       		Lorem ipsum <span class="arrow"></span>
				        </button>
				      </h5>
				     </div>
			    </div>

			    <div id="collapseThreeFooter" class="collapse" aria-labelledby="card3Header" data-parent="#footerAccordion">
			    	<div class="card-body">
			    		<div class="container">
							<ul class="list-inline">
								<li>Footer item</li>
								<li>Footer item</li>
								<li>Footer item</li>
								<li>Footer item</li>
							</ul>
						</div>
			    	</div>
		    	</div>
		    </div>

		    <div class="card">
			    <div class="card-header" id="card4Header">
			    	<div class="container">
				      <h5 class="mb-0">
				        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseFourFooter" aria-expanded="true" aria-controls="collapseFourFooter">
				       		Lorem ipsum <span class="arrow"></span>
				        </button>
				      </h5>
				     </div>
			    </div>

			    <div id="collapseFourFooter" class="collapse" aria-labelledby="card4Header" data-parent="#footerAccordion">
			    	<div class="card-body">
			    		<div class="container">
							<ul class="list-inline">
								<li>Footer item</li>
								<li>Footer item</li>
								<li>Footer item</li>
								<li>Footer item</li>
							</ul>
						</div>
			    	</div>
		    	</div>
		    </div>
		</div>
	</footer>
</template>

<script>
import 'bootstrap';

export default {

}
</script>