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
		},
		initialize: function(options){
			console.log(this);
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
		PGProfile.appLayout.mainView.show(PGProfile.loginLayout);
	},
	myProfile: function(){
		PGProfile.appLayout.navView.show(PGProfile.navLayout);
		PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
		PGProfile.appLayout.mainView.show(PGProfile.profileLayout);
	},
	editProfile: function(){
		PGProfile.appLayout.mainView.show(PGProfile.editProfileLayout);
	},
	password: function(){
		PGProfile.appLayout.mainView.show(PGProfile.changePassLayout);
	},
	accountHistory: function(){
		PGProfile.appLayout.mainView.show(PGProfile.accountHistoryLayout);
		PGProfile.acctHistory.fetch();
	},
	linkAccount: function(){
		PGProfile.appLayout.mainView.show(PGProfile.linkPrintLayout);
	},
	creditCard: function(){
		PGProfile.appLayout.mainView.show(PGProfile.creditCardLayout);
	},
	goeditCard: function(){
		PGProfile.appLayout.mainView.show(PGProfile.editCreditCardLayout);
	},
	subscription: function(){
		PGProfile.appLayout.mainView.show(PGProfile.subscriptionsLayout);
		PGProfile.subscriptions.fetch();
	},
	logout: function(){
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
		} else {
			if ($('#nav-view').children().length < 1){
				PGProfile.appLayout.navView.show(PGProfile.navLayout);
			}
			if ($('#side-view').children().length < 1){
				PGProfile.appLayout.sideView.show(PGProfile.sideLayout);
			}
		}
	}
});

$(function(){
	PGProfile.start();
});
