
var PGProfile = new Backbone.Marionette.Application({
	navHome: function(){
		PGProfile.router.navigate("", true);
	},
	navProfile: function(){
		PGProfile.router.navigate("myProfile", true);
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
	},
	navLogout: function(){
		PGProfile.router.navigate("logout", true);
	}
});

var LoggedInStatus = Backbone.Model.extend({
	defaults:{
		status: false,
		firstname: "",
		lastname: ""
	}
});

var Subscription = Backbone.Model.extend({});
var Subscriptions = Backbone.Collection.extend({
	model: Subscription,
	url: 'https://stage.syncaccess.net/po/pit/api/svcs/availableplans?format=json'
});




var LoginView = Backbone.Marionette.ItemView.extend({
	template: '#loginTemplate',
	className: 'row',
	events: {
		'click #loginBtn' : 'loginUser'
	},
	initialize: function(){
		var hasCookie = Boolean($.cookie('_pgp'));
		if(hasCookie){
			console.log("has Cookie");
			this.loggedIn();
		}
	},
	ui: {
		email: '#email',
		pass: '#pass'
	},
	removeAlerts: function(){

	},
	loginUser: function(){
		console.log(this.ui.email.val(), this.ui.pass.val());
		if (this.ui.email.val() === 'test' && this.ui.pass.val() === 'test'){
			$.cookie('_pgp', "sessionid", {expires: 7, path: '/'});
			this.loggedIn();
		}
	},
	loggedIn: function(){
		console.log("logged in");
		PGProfile.loggedInModel.set({status: true, firstname: "Firstname", lastname: "Lastname"});
		PGProfile.navProfile();
	},
	failedAttempt: function(){

	}
});
var LoggedOutView = Backbone.View.extend({
	template: '#navLoggedOut',
	className: 'navbar'
});

var NavView = Backbone.Marionette.ItemView.extend({
	template: '#navTemplate',
	className: 'navbar',
	events: {
		'click #logout': 'logmeout'
	},
	logmeout: function(e){
		e.preventDefault();
		PGProfile.navLogout();
	}
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
	changeActive: function(element){
		$(element).addClass('active').siblings().removeClass('active');
	},
	showProfile: function(e){
		e.preventDefault();
		PGProfile.navProfile();
		this.changeActive(e.currentTarget);
	},
	showPassword: function(e){
		e.preventDefault();
		PGProfile.navPass();
		this.changeActive(e.currentTarget);
	},
	showHistory: function(e){
		e.preventDefault();
		PGProfile.navHist();
		this.changeActive(e.currentTarget);
	},
	showLink: function(e){
		e.preventDefault();
		PGProfile.navLink();
		this.changeActive(e.currentTarget);
	},
	showCredit: function(e){
		e.preventDefault();
		PGProfile.navCredit();
		this.changeActive(e.currentTarget);
	},
	showSubscription: function(e){
		e.preventDefault();
		PGProfile.navSub();
		this.changeActive(e.currentTarget);
	}
});


var ProfileView = Backbone.Marionette.ItemView.extend({
	template: '#profileTemplate',
	className: 'row'
});


var ChangePasswordView = Backbone.Marionette.ItemView.extend({
	template: '#changePasswordTemplate',
	className: 'row'
});

var CreditCardView = Backbone.Marionette.ItemView.extend({
	template: '#creditCardTemplate',
	className: 'row'
});

var SubscriptionView = Backbone.Marionette.ItemView.extend({
	template: '#subscriptionTemplate'
})

var SubscriptionsView = Backbone.Marionette.CollectionView.extend({
	className: 'row',
	itemView: SubscriptionView
});

var LinkPrintView = Backbone.Marionette.ItemView.extend({
	template: '#linkPrintTemplate',
	className: 'row'
});




PGProfile.addInitializer(function(){
	//Router
	PGProfile.router = new PGProfile.Router({
		controller: new PGProfile.Controller()
	});

	//Data
	PGProfile.subscriptions = new Subscriptions();
	PGProfile.loggedInModel = new LoggedInStatus();

	//Views
	PGProfile.navLayout = new NavView({model: PGProfile.loggedInModel});
	PGProfile.loginLayout = new LoginView();
	PGProfile.sideLayout = new SideView();
	PGProfile.profileLayout = new ProfileView();
	PGProfile.changePassLayout = new ChangePasswordView();
	PGProfile.creditCardLayout = new CreditCardView();
	PGProfile.subscriptionsLayout = new SubscriptionsView({collection: PGProfile.subscriptions});
	PGProfile.linkPrintLayout = new LinkPrintView({collection: PGProfile.loggedInStatus});

	PGProfile.AppLayout = Marionette.Layout.extend({
		regions: {
			mainView: '#main-view',
			sideView: '#side-view',
			navView: '#nav-view'
		}
	});

	//PGProfile.SubscriptionsLayout = Marionette.Layout.extend({});

	PGProfile.appLayout = new PGProfile.AppLayout({ el: '#app' });
});

PGProfile.on("initialize:after", function(){
	//Backbone.history.start({pushState: true, root: 'pg-profile'});
	Backbone.history.start();
	console.log("after:init");

});

PGProfile.Controller = Marionette.Controller.extend({
	index: function(){
		console.log(Boolean($.cookie('_pgp')));
		console.log($.cookie('_pgp'));
		PGProfile.appLayout.navView.show(PGProfile.navLayout);
		if ($.cookie('_pgp')){
			PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
			PGProfile.appLayout.mainView.show(PGProfile.profileLayout);

		} else {
			window.location.hash = '';
			PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
			return this;
		}
	},
	login: function(){
		PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
		//PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
	},
	myProfile: function(){
		PGProfile.appLayout.navView.show(PGProfile.navLayout);
		PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
		PGProfile.appLayout.mainView.show(PGProfile.profileLayout);
	},
	password: function(){
		PGProfile.appLayout.mainView.show(PGProfile.changePassLayout);
		//PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
	},
	accountHistory: function(){
		//PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
		//PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
	},
	linkAccount: function(){
		PGProfile.appLayout.mainView.show(PGProfile.linkPrintLayout);
	},
	creditCard: function(){
		PGProfile.appLayout.mainView.show(PGProfile.creditCardLayout);
		//PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
	},
	subscription: function(){
		PGProfile.appLayout.mainView.show(PGProfile.subscriptionsLayout);
		//PGProfile.subscriptions.fetch();
	},
	logout: function(){
		$.cookie('_pgp', "", {expires: 7, path: '/'});
		PGProfile.loggedInModel.set({status: false, firstname: "", lastname: ""});
		PGProfile.appLayout.sideView.close();
		PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
		location.reload();
		return this;
	}
});

PGProfile.Router = Marionette.AppRouter.extend({
	initialize: function(){
		window.location.hash = '';
		return this;
	},
	appRoutes: {
		"": "index",
		"login": "login",
		"myProfile": "myProfile",
		"password": "password",
		"history": "accountHistory",
		"link": "linkAccount",
		"cc": "creditCard",
		"subscription": "subscription",
		"logout": "logout"
	}
});

PGProfile.start();