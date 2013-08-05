var PGProfile = new Backbone.Marionette.Application({
	navHome: function(){
		PGProfile.router.navigate("", true);
	},
	navProfile: function(){
		PGProfile.router.navigate("profile", true);
	},
	navPass: function(){
		PGProfile.router.navigate("password", true);
	},
	navHist: function(){
		PGProfile.router.navigate("history", true);
	},
	navLink: function(){
		PGProfile.router.navigate("link", true);
	},
	navCredit: function(){
		PGProfile.router.navigate("cc", true);
	},
	navSub: function(){
		PGProfile.router.navigate("subscription", true);
	}
});

var LoginView = Backbone.Marionette.ItemView.extend({
	template: '#loginTemplate'
});

var SideView = Backbone.Marionette.ItemView.extend({
	template: '#sideTemplate',
	className: 'list-group',
	events: {
		'click #profile' : 'showProfile',
		'click #password' : 'showPassword',
		'click #history' : 'showHistory',
		'click #link' : 'showLink',
		'click #credit' : 'showCredit',
		'click #subscription' : 'showSubscription'
	},
	showProfile: function(e){
		e.preventDefault();
		PGProfile.navProfile();
	},
	showPassword: function(e){
		e.preventDefault();
		PGProfile.navPass();
	},
	showHistory: function(e){
		e.preventDefault();
		PGProfile.navHist();
	},
	showLink: function(e){
		e.preventDefault();
		PGProfile.navLink();
	},
	showCredit: function(e){
		e.preventDefault();
		PGProfile.navCredit();
	},
	showSubscription: function(e){
		e.preventDefault();
		PGProfile.navSub();
	}
});


var ProfileView = Backbone.Marionette.ItemView.extend({
	template: '#profileTemplate'
});








PGProfile.addInitializer(function(){
	//Router
	PGProfile.router = new PGProfile.Router({
		controller: new PGProfile.Controller()
	});

	//Data

	//Views
	PGProfile.loginLayout = new LoginView();
	PGProfile.sideLayout = new SideView();
	PGProfile.profileLayout = new ProfileView();

	PGProfile.AppLayout = Marionette.Layout.extend({
		regions: {
			mainView: '#main-view',
			sideView: '#side-view',
			navView: '#nav-view'
		}
	});

	PGProfile.appLayout = new PGProfile.AppLayout({ el: '#app' });
});

PGProfile.on("initialize:after", function(){
	Backbone.history.start({pushState: true, root: 'pg-profile'});
});

PGProfile.Controller = Marionette.Controller.extend({
	login: function(){
		//PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
		PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
	},
	myProfile: function(){
		PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
		PGProfile.appLayout.mainView.show(PGProfile.profileLayout);
	},
	password: function(){
		//PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
		PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
	},
	accountHistory: function(){
		//PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
		PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
	},
	linkAccount: function(){
		//PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
		PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
	},
	creditCard: function(){
		//PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
		PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
	},
	subscription: function(){
		//PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
		PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
	}
});

PGProfile.Router = Marionette.AppRouter.extend({
	appRoutes: {
		"": "login",
		"profile": "myProfile",
		"password": "password",
		"history": "accountHistory",
		"link": "linkAccount",
		"cc": "creditCard",
		"subscription": "subscription"
	}
});

PGProfile.start();