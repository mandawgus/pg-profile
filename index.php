<!doctype html>
<html>

<head>
	<title>PG Profile</title>
	<link rel="stylesheet" type="text/css" href="css/vendor/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/vendor/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
	<div id="app">

		<div class="navbar">
			<div class="container">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>

				<!-- Be sure to leave the brand out there if you want it shown -->
				<a class="navbar-brand" href="#">My PG Profile</a>

				<!-- Place everything within .navbar-collapse to hide it until above 768px -->
				<div class="nav-collapse collapse navbar-responsive-collapse">
					<ul class="nav navbar-nav visible-sm">
						<li class="active"><a href="#">My Profile</a></li>
						<li><a href="#">Change Password</a></li>
						<li><a href="#">Account History</a></li>
						<li><a href="#">Link Print Subscription</a></li>
						<li><a href="#">Manage Credit Card</a></li>
						<li><a href="#">Manage Subscription</a></li>
					</ul>
				</div>
			</div>
		</div>



		<div class="container">

			<div class="col-lg-3 hidden-sm">
				<div class="list-group">
					<a href="#" class="list-group-item active">My Profile</a>
					<a href="#" class="list-group-item">Change Password</a>
					<a href="#" class="list-group-item">Account History</a>
					<a href="#" class="list-group-item">Link Print Subscription</a>
					<a href="#" class="list-group-item">Manage Credit Card</a>
					<a href="#" class="list-group-item">Manage Subscription</a>
				</div>
			</div>
			<div class="col-lg-9">
				<h1>My Profile</h1>
				<div class="row">
					<div class="col-lg-6">
						<address>
							<strong>Twitter, Inc.</strong><br>
							795 Folsom Ave, Suite 600<br>
							San Francisco, CA 94107<br>
							<abbr title="Phone">P:</abbr> (123) 456-7890
						</address>

						<address>
							<strong>Full Name</strong><br>
							<a href="mailto:#">first.last@example.com</a>
						</address>
					</div>
					<div class="col-lg-6">
						<button class="btn btn-primary">Edit my profile</button>
					</div>
				</div>

				<hr />

				<h1>Change Password</h1>
				<div class="row">
					<div class="col-lg-6">
						<div class="form-group">
							<input id="original" type="password" class="form-control" placeholder="Original Password">
						</div>
						<div class="form-group">
							<input id="new" type="password" class="form-control" placeholder="New Password">
						</div>
						<div class="form-group">
							<input id="confirm" type="password" class="form-control" placeholder="Retype New Password">
						</div>
						<div class="form-group">
							<button class="btn btn-primary">Submit</button>
						</div>
					</div>
					<div class="col-lg-6"></div>
				</div>

				<hr />

				<h1>Account History</h1>
				<div class="row">
					<div class="col-lg-12">
						<table class="table table-condensed table-striped">
							<thead>
								<tr>
									<th>ID #</th>
									<th>Description</th>
									<th>Something Else</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>Monthly Subscription: Recurring Monthly</td>
									<td>$9.99</td>
									<td>xx/xx/xxxx</td>
								</tr>
								<tr>
									<td>2</td>
									<td>Monthly Subscription: Recurring Monthly</td>
									<td>$9.99</td>
									<td>xx/xx/xxxx</td>
								</tr>
								<tr>
									<td>3</td>
									<td>Monthly Subscription: Recurring Monthly</td>
									<td>$9.99</td>
									<td>xx/xx/xxxx</td>
								</tr>
								<tr>
									<td>4</td>
									<td>Monthly Subscription: Recurring Monthly</td>
									<td>$9.99</td>
									<td>xx/xx/xxxx</td>
								</tr>
								<tr>
									<td>5</td>
									<td>Monthly Subscription: Recurring Monthly</td>
									<td>$9.99</td>
									<td>xx/xx/xxxx</td>
								</tr>
								<tr>
									<td>6</td>
									<td>Monthly Subscription: Recurring Monthly</td>
									<td>$9.99</td>
									<td>xx/xx/xxxx</td>
								</tr>
								<tr>
									<td>7</td>
									<td>Monthly Subscription: Recurring Monthly</td>
									<td>$9.99</td>
									<td>xx/xx/xxxx</td>
								</tr>
								<tr>
									<td>8</td>
									<td>Monthly Subscription: Recurring Monthly</td>
									<td>$9.99</td>
									<td>xx/xx/xxxx</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<hr />

				<h1>My Payment Options</h1>
				<div class="row">
					<div class="col-lg-6">
						<h3>Credit Card Information</h3>
						<address>
							<strong>Firstname Lastname</strong><br>
							Type: Visa<br>
							**** **** **** **** 0002<br>
							Exp: xx/xxxx
						</address>

						
						<h3>EZ-PAY</h3>
						<p>EZ-PAY is the simplest, most economical payment plan. By answering YES here, your payment will be automatically debited or credited to the card of your choice at renewal.
						
						<div class="form-group">
							<input type="checkbox" value=""> Yes, enroll me in EZ-PAY
						</div>

						<div class="form-group">
							<label>EZ-PAY billing cycle</label>
							<select class="form-control">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</select>
						</div>

						<div class="form-group">
							<label>Day of the month payments occur</label>
							<select class="form-control">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</select>
						</div>
					</div>
					<div class="col-lg-6">
						<button class="btn btn-primary">Edit</button>
					</div>
				</div>

				<hr />

			</div>
		</div>

	</div>

	<script src="js/vendor/jquery-1.10.2.min.js"></script>
	<script src="js/vendor/bootstrap.js"></script>
	<script src="js/vendor/underscore.js"></script>
	<script src="js/vendor/backbone.js"></script>
	<script src="js/vendor/backbone.marionette.min.js"></script>
	<script src="js/app/app.js"></script>
</body>
</html>