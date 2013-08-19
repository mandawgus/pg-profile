var PGProfile = new Backbone.Marionette.Application({
	cookieName: "xp_PGPP",
	navHome: function(){
		PGProfile.router.navigate("", true);
	},
	navProfile: function(){
		PGProfile.router.navigate("profile", true);
	},
	navEditProfile: function(){
		PGProfile.router.navigate("profile/edit", true);
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
	navEditCredit: function(){
		PGProfile.router.navigate("cc/edit", true);
	},
	navSub: function(){
		PGProfile.router.navigate("subscription", true);
	},
	navLogout: function(){
		PGProfile.router.navigate("logout", true);
	},
	navLogin: function(){
		PGProfile.router.navigate("login", true);
	},
	checkStatus: function(){
		console.log("check status");
	}
});



//MODELS & COLLECTIONS
var LoggedInStatus = Backbone.Model.extend({
	defaults:{
		status: false,
		firstname: "",
		lastname: "",
		planID: 5
	}
});

var AccountHist = Backbone.Model.extend({});
var AccountHistCollection = Backbone.Collection.extend({
	model: AccountHist,
	//url: 'http://pay.ppgnow.com/userapi/1/user/get/'
	url: 'https://stage.syncaccess.net/po/pit/api/svcs/availableplans?format=json'
});

var Subscription = Backbone.Model.extend({});
var Subscriptions = Backbone.Collection.extend({
	model: Subscription,
	url: 'https://stage.syncaccess.net/po/pit/api/svcs/availableplans?format=json&callback=?',
	parse: function(response){
		console.log(response);
		return response;
	}
});



//VIEWS
var LoginView = Backbone.Marionette.ItemView.extend({
	template: '#loginTemplate',
	className: 'row',
	events: {
		'click #loginBtn' : 'loginUser',
		'keypress input': 'onEnter'
	},
	initialize: function(){
		var hasCookie = Boolean($.cookie(PGProfile.cookieName));
		if(hasCookie){
			console.log("has Cookie");
			this.loggedIn();
		}
	},
	ui: {
		email: '#email',
		pass: '#pass'
	},
	onEnter: function(e){
		if (e.keyCode != 13) return;
		this.loginUser();
	},
	removeAlerts: function(){

	},
	loginUser: function(){
		console.log(this.ui.email.val(), this.ui.pass.val());
		if (this.ui.email.val() === 'test' && this.ui.pass.val() === 'test'){
			$.cookie(PGProfile.cookieName, "sessionid", {expires: 7, path: '/'});
			this.loggedIn();
		}
	},
	loggedIn: function(){
		console.log("logged in");
		PGProfile.loggedInModel.set({
			status: true,
			firstname: "Dave",
			lastname: "Esaias",
			address: "123 Any Street",
			city: "Pittsburgh",
			state: "PA",
			zip: "15232",
			phone: "412-555-1212",
			email: "test@test.com"
		});
		PGProfile.navProfile();
	},
	failedAttempt: function(){

	}
});


var NavView = Backbone.Marionette.ItemView.extend({
	template: '#navTemplate',
	className: 'navbar',
	events: {
		'click #logout': 'logmeout',
		'click #profile' : 'showProfile',
		'click #password' : 'showPassword',
		'click #history' : 'showHistory',
		'click #link' : 'showLink',
		'click #credit' : 'showCredit',
		'click #subscription' : 'showSubscription'
	},
	logmeout: function(e){
		e.preventDefault();
		PGProfile.navLogout();
	},
	changeActive: function(element){
		$(element).parent().addClass('active').siblings().removeClass('active');
		$('.navbar-toggle').trigger('click');
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
	className: 'row',
	events: {
		'click #editProfileBtn': 'editProfile'
	},
	editProfile: function(e){
		e.preventDefault();
		PGProfile.navEditProfile();
	},
	onRender: function(){
		this.delegateEvents();
	}
});

var EditProfileView = Backbone.Marionette.ItemView.extend({
	template: '#editProfileTemplate',
	className: 'row',
	events: {
		'click #submitEditBtn': 'submitChanges',
		'click #cancelBtn': 'cancelChanges'
	},
	submitChanges: function(e){
		e.preventDefault();
		console.log("submit changes");
	},
	cancelChanges: function(e){
		e.preventDefault();
		PGProfile.navProfile();
	},
	onRender: function(){
		this.delegateEvents();
	}
});


var CreditCardView = Backbone.Marionette.ItemView.extend({
	template: '#creditCardTemplate',
	className: 'row',
	events: {
		'click #editCardBtn': 'editCard',
		'click #ezpayBtn': 'ezpay'
	},
	editCard: function(e){
		e.preventDefault();
		console.log("Edit card");
		PGProfile.navEditCredit();

	},
	ezpay: function(e){
		e.preventDefault();
		console.log('ezpay');
	},
	onRender: function(){
		this.delegateEvents();
	}
});

var EditCreditCardView = Backbone.Marionette.ItemView.extend({
	template: '#editCreditCardTemplate',
	className: 'row',
	events: {
		'click #cancelBtn': 'cancelChange',
		'click #submitBtn': 'submitChange'
	},
	cancelChange: function(e){
		e.preventDefault();
		PGProfile.navCredit();
	},
	submitChange: function(e){
		console.log("submit cc change");
	},
	onRender: function(){
		this.delegateEvents();
	}
});

var ChangePasswordView = Backbone.Marionette.ItemView.extend({
	template: '#changePasswordTemplate',
	className: 'row'
});

var LinkPrintView = Backbone.Marionette.ItemView.extend({
	template: '#linkPrintTemplate',
	className: 'row'
});

var ErrorView = Backbone.Marionette.ItemView.extend({
	template: '#noSubs'
});

var SubscriptionView = Backbone.Marionette.ItemView.extend({
	template: '#subscriptionTemplate',
	tagName: 'tr'
});

var SubscriptionsView = Backbone.Marionette.CompositeView.extend({
	template: '#subscriptionsTemplate',
	itemView: SubscriptionView,
	itemViewContainer: "tbody"
});


var AccountRowView = Backbone.Marionette.ItemView.extend({
	tagName: 'tr',
	template: '#accountRowTemplate'
});

var AccountTableView = Backbone.Marionette.CompositeView.extend({
	template: '#accountTableTemplate',
	itemView: AccountRowView,
	itemViewContainer: 'tbody'
});

var WizardView = Backbone.Marionette.ItemView.extend({
	template: '#wizard',
	onRender: function(){
		$('#myWizard').wizard();
	}
});


PGProfile.addInitializer(function(){
	//Router
	PGProfile.router = new PGProfile.Router({
		controller: new PGProfile.Controller()
	});

	//Data
	var exampleAccountData = [
		{id: 1234, details: "Details...", timestamp: new Date()},
		{id: 1235, details: "Details...", timestamp: new Date()},
		{id: 1236, details: "Details...", timestamp: new Date()},
		{id: 1237, details: "Details...", timestamp: new Date()}
	];

	/*
	var exampleSubscriptionsData = [
		{
			"planID": 5,
			"isActive": true,
			"baseRate": 4.95,
			"description": "",
			"fullPubName": "Pittsburgh (pit)",
			"planCode": "4d",
			"planLength": 0,
			"planName": "Weekender Print with Full Digital Access",
			"planTerm": "Weeks(s)",
			"publication": "pit",
			"requiresCardOnFile": true,
			"totalCost": 4.95,
			"offerToPrintSubscribers": true,
			"offerToDigitalSubscribers": true
		},
		{
			"planID": 3,
			"isActive": true,
			"baseRate": 3.95,
			"description": "",
			"fullPubName": "Pittsburgh (pit)",
			"planCode": "5d",
			"planLength": 0,
			"planName": "Digital Only",
			"planTerm": "Weeks(s)",
			"publication": "pit",
			"requiresCardOnFile": true,
			"totalCost": 3.95,
			"offerToPrintSubscribers": true,
			"offerToDigitalSubscribers": true
		},
		{
			"planID": 8,
			"isActive": false,
			"baseRate": 0,
			"description": "",
			"fullPubName": "Pittsburgh (pit)",
			"planCode": "5day",
			"planLength": 0,
			"planName": "5Day Print with Full Digital Access",
			"planTerm": "Weeks(s)",
			"publication": "pit",
			"requiresCardOnFile": false,
			"totalCost": 0,
			"offerToPrintSubscribers": true,
			"offerToDigitalSubscribers": true
		},
		{
			"planID": 9,
			"isActive": false,
			"baseRate": 0,
			"description": "",
			"fullPubName": "Pittsburgh (pit)",
			"planCode": "6day",
			"planLength": 0,
			"planName": "6Day Print with Full Digital Access",
			"planTerm": "Weeks(s)",
			"publication": "pit",
			"requiresCardOnFile": false,
			"totalCost": 0,
			"offerToPrintSubscribers": true,
			"offerToDigitalSubscribers": true
		},
		{
			"planID": 10,
			"isActive": false,
			"baseRate": 0,
			"description": "",
			"fullPubName": "Pittsburgh (pit)",
			"planCode": "7d",
			"planLength": 0,
			"planName": "Digital Only w/Steelers App",
			"planTerm": "Month(s)",
			"publication": "pit",
			"requiresCardOnFile": false,
			"totalCost": 0,
			"offerToPrintSubscribers": true,
			"offerToDigitalSubscribers": true
		},
		{
			"planID": 2,
			"isActive": true,
			"baseRate": 5.95,
			"description": "",
			"fullPubName": "Pittsburgh (pit)",
			"planCode": "7day",
			"planLength": 0,
			"planName": "7Day Print with Full Digital Access",
			"planTerm": "Weeks(s)",
			"publication": "pit",
			"requiresCardOnFile": true,
			"totalCost": 5.95,
			"offerToPrintSubscribers": true,
			"offerToDigitalSubscribers": true
		},
		{
			"planID": 11,
			"isActive": true,
			"baseRate": 0,
			"description": "Steelers, Pens (not avail), Pirates (not avail)",
			"fullPubName": "Pittsburgh (pit)",
			"planCode": "App1",
			"planLength": 0,
			"planName": "Sports App Bundle",
			"planTerm": "Month(s)",
			"publication": "pit",
			"requiresCardOnFile": false,
			"totalCost": 0,
			"offerToPrintSubscribers": true,
			"offerToDigitalSubscribers": true
		},
		{
			"planID": 7,
			"isActive": true,
			"baseRate": 3.95,
			"description": "",
			"fullPubName": "Pittsburgh (pit)",
			"planCode": "SS",
			"planLength": 0,
			"planName": "Sat/Sun Print with Full Digital Access",
			"planTerm": "Weeks(s)",
			"publication": "pit",
			"requiresCardOnFile": true,
			"totalCost": 3.95,
			"offerToPrintSubscribers": true,
			"offerToDigitalSubscribers": true
		},
		{
			"planID": 4,
			"isActive": true,
			"baseRate": 2.95,
			"description": "",
			"fullPubName": "Pittsburgh (pit)",
			"planCode": "SU",
			"planLength": 0,
			"planName": "Sunday Only Print with Full Digital Access",
			"planTerm": "Weeks(s)",
			"publication": "pit",
			"requiresCardOnFile": true,
			"totalCost": 2.95,
			"offerToPrintSubscribers": true,
			"offerToDigitalSubscribers": true
		},
		{
			"planID": 1,
			"isActive": true,
			"baseRate": 0.1,
			"description": "This is a test plan",
			"fullPubName": "Test Pub For Whiz DONT CHANGE (P1)",
			"planCode": "TEST",
			"planLength": 5,
			"planName": "TestPlan",
			"planTerm": "Day(s)",
			"publication": "P1",
			"requiresCardOnFile": true,
			"totalCost": 0.1,
			"offerToPrintSubscribers": false,
			"offerToDigitalSubscribers": true
		},
		{
			"planID": 6,
			"isActive": true,
			"baseRate": 3.95,
			"description": "",
			"fullPubName": "Pittsburgh (pit)",
			"planCode": "TS",
			"planLength": 0,
			"planName": "Thu/Sunday Print with Full Digital Access",
			"planTerm": "Weeks(s)",
			"publication": "pit",
			"requiresCardOnFile": true,
			"totalCost": 3.95,
			"offerToPrintSubscribers": true,
			"offerToDigitalSubscribers": true
		}
	];
	*/

	PGProfile.loggedInModel = new LoggedInStatus();
	//PGProfile.subscriptions = new Subscriptions(exampleSubscriptionsData);
	PGProfile.subscriptions = new Subscriptions();
	PGProfile.acctHistory = new AccountHistCollection(exampleAccountData);

	//Views
	PGProfile.navLayout = new NavView({model: PGProfile.loggedInModel});
	PGProfile.loginLayout = new LoginView();
	PGProfile.sideLayout = new SideView();
	PGProfile.profileLayout = new ProfileView({model: PGProfile.loggedInModel });
	PGProfile.editProfileLayout = new EditProfileView({ model: PGProfile.loggedInModel });
	PGProfile.changePassLayout = new ChangePasswordView();
	PGProfile.creditCardLayout = new CreditCardView();
	PGProfile.editCreditCardLayout = new EditCreditCardView();
	PGProfile.subscriptionsLayout = new SubscriptionsView({collection: PGProfile.subscriptions});
	PGProfile.accountHistoryLayout = new AccountTableView({collection: PGProfile.acctHistory});
	PGProfile.linkPrintLayout = new LinkPrintView({collection: PGProfile.loggedInStatus});

	PGProfile.wizard = new WizardView();

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
	//Backbone.history.start({pushState: true, root: 'pg-profile'});
	Backbone.history.start();
});

PGProfile.Controller = Marionette.Controller.extend({
	login: function(){
		PGProfile.checkStatus();
		PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
	},
	myProfile: function(){
		//PGProfile.checkStatus();
		PGProfile.appLayout.navView.show(PGProfile.navLayout);
		PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
		PGProfile.appLayout.mainView.show(PGProfile.profileLayout);
	},
	editProfile: function(){
		//PGProfile.checkStatus();
		PGProfile.appLayout.mainView.show(PGProfile.editProfileLayout);
	},
	password: function(){
		//PGProfile.checkStatus();
		PGProfile.appLayout.mainView.show(PGProfile.changePassLayout);
	},
	accountHistory: function(){
		//PGProfile.checkStatus();
		PGProfile.appLayout.mainView.show(PGProfile.accountHistoryLayout);
		PGProfile.acctHistory.fetch();
	},
	linkAccount: function(){
		//PGProfile.checkStatus();
		PGProfile.appLayout.mainView.show(PGProfile.linkPrintLayout);
	},
	creditCard: function(){
		//PGProfile.checkStatus();
		PGProfile.appLayout.mainView.show(PGProfile.creditCardLayout);
	},
	goeditCard: function(){
		//PGProfile.checkStatus();
		PGProfile.appLayout.mainView.show(PGProfile.editCreditCardLayout);
	},
	subscription: function(){
		//PGProfile.checkStatus();
		PGProfile.appLayout.mainView.show(PGProfile.subscriptionsLayout);
		PGProfile.subscriptions.fetch();
	},
	logout: function(){
		//PGProfile.checkStatus();
		$.cookie(PGProfile.cookieName, "", {expires: 7, path: '/'});
		PGProfile.loggedInModel.set({status: false, firstname: "", lastname: ""});
		PGProfile.appLayout.sideView.close();
		PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
		location.reload();
		return this;
	},
	test: function(){
		PGProfile.appLayout.mainView.show(PGProfile.wizard);
	}
});

PGProfile.Router = Marionette.AppRouter.extend({
	appRoutes: {
		"": "login",
		"login": "login",
		"profile": "myProfile",
		"profile/edit": "editProfile",
		"password": "password",
		"history": "accountHistory",
		"link": "linkAccount",
		"cc": "creditCard",
		"cc/edit": "goeditCard",
		"subscription": "subscription",
		"logout": "logout",
		"test": "test"
	},
	before: function( route, params ){
		if (route === "profile"){ console.log("boommm")}
		
		if (!$.cookie(PGProfile.cookieName)){
			PGProfile.navLogin();
			PGProfile.appLayout.navView.show(PGProfile.navLayout);
			PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
			return false;
		}
	}
});

$(function(){
	PGProfile.start();
});
