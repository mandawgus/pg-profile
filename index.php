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

		<div id="nav-view"></div>

		<div class="container">

			<div id="side-view" class="col-lg-3 hidden-sm"></div>
			<div id="main-view" class="col-lg-9"></div>
		</div>

	</div>

	
	<script type="text/template" id="navTemplate">
		<div class="container">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>


			<a class="navbar-brand" href="#">My PG Profile</a>

			<div class="nav-collapse collapse navbar-responsive-collapse">
				<% if (status){ %>
				<p class="navbar-text pull-left">Signed in as <%= firstname %> <%= lastname %></p>
				<ul class="nav navbar-nav visible-sm">
					<li class="active"><a href="#">My Profile</a></li>
					<li><a href="#">Change Password</a></li>
					<li><a href="#">Account History</a></li>
					<li><a href="#">My Credit Card Information</a></li>
					<li><a href="#">Manage Subscription</a></li>
					<li><a href="#">Link To My Print Subscription</a></li>
				</ul>
				<p class="navbar-text pull-right"><i class="icon-off"></i> <a id="logout" href="#" class="navbar-link">Logout</a></p>
				<%}%>
			</div>

		</div>
	</script>

	<script type="text/template" id="sideTemplate">
		<a id="profile" href="#" class="list-group-item active">My Profile</a>
		<a id="password" href="#" class="list-group-item">Change Password</a>
		<a id="history" href="#" class="list-group-item">Account History</a>
		<a id="credit" href="#" class="list-group-item">My Credit Card Information</a>
		<a id="subscription" href="#" class="list-group-item">Manage My Subscription</a>
		<a id="link" href="#" class="list-group-item">Link To My Print Subscription</a>
	</script>

	<script type="text/template" id="profileTemplate">
		<div class="col-lg-6">
			<h1>My Profile</h1>
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

			<div class="form-group">
				<button class="btn btn-primary">Edit my profile</button>
			</div>
		</div>
		<div class="col-lg-6"></div>
	</script>

	<script type="text/template" id="changePasswordTemplate">
		<div class="col-lg-6">
			<h1>Change Password</h1>
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
	</script>

	<script type="text/template" id="creditCardTemplate">
		<div class="col-lg-6">
			<h1>My Payment Options</h1>
			<h3>Credit Card Information</h3>
			<address>
				<strong>Firstname Lastname</strong><br>
				Type: Visa<br>
				**** **** **** **** 0002<br>
				Exp: xx/xxxx
			</address>

			<div class="form-group">
				<button class="btn btn-primary">Edit Credit Card Details</button>
			</div>
			
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
		<div class="col-lg-6"></div>
	</script>

	<script type="text/template" id="subscriptionTemplate">
		<%= planName %>
	</script>

	<script type="text/template" id="subscriptionsTemplate">
		<div class="col-lg-6">
			<h1>Subscription Template</h1>
		</div>
		<div class="col-lg-6"></div>
	</script>



	<script type="text/template" id="linkPrintTemplate">
		<div class="col-6">
			<h1>Link Print Subscription</h1>
			<div class="form-group">
				<input id="email" type="text" class="form-control" placeholder="Email Address">
			</div>
			<div class="form-group">
				<input id="pass" type="password" class="form-control" placeholder="Password">
			</div>
			<div class="form-group">
			<button id="loginBtn" class="btn btn-primary">Login</button>
			</div>
		</div>
		<div class="col-6"></div>
	</script>

	<script type="text/template" id="loginTemplate">
		<div class="col-6">
			<h1>Login:</h1>
			<div class="form-group">
				<input id="email" type="text" class="form-control" placeholder="Email Address">
			</div>
			<div class="form-group">
				<input id="pass" type="password" class="form-control" placeholder="Password">
			</div>
			<div class="form-group">
			<button id="loginBtn" class="btn btn-primary">Login</button>
			</div>
		</div>
		<div class="col-6"></div>
	</script>

	<script src="js/vendor/jquery-1.10.2.min.js"></script>
	<script src="js/vendor/bootstrap.js"></script>
	<script src="js/vendor/underscore.js"></script>
	<script src="js/vendor/backbone.js"></script>
	<script src="js/vendor/backbone.marionette.min.js"></script>
	<script src="js/vendor/jquery.cookie.js"></script>
	<script src="js/app/app.js"></script>

</body>
</html>