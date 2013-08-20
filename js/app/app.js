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


var UpdateCCard = Backbone.Model.extend({
	url: '/test/',
	defaults: {
		card_name: "",
		card_number: "",
		card_exp_month: "",
		card_exp_year: "",
		billing_addr: "",
		billing_city: "",
		billing_state: "",
		billing_zip: ""
	},
	initialize: function(){
		this.validators = {};
		
		this.validators.card_name = function(value){
			return value.length > 0 ? {isValid: true} : {isValid: false, message: 'You must enter a name'};
		}

		this.validators.card_number = function(value){
			return value.length > 0 ? {isValid: true} : {isValid: false, message: 'You must enter a valid credit card number'};
		}

		this.validators.card_exp_month = function(value){
			return value.length > 0 ? {isValid: true} : {isValid: false, message: 'You must enter a valid expiration month'};
		}

		this.validators.card_exp_year = function(value){
			return value.length > 0 ? {isValid: true} : {isValid: false, message: 'You must enter a valid expiration year'};
		}

		this.validators.billing_addr = function(value){
			return value.length > 0 ? {isValid: true} : {isValid: false, message: 'You must enter a billing address'};
		}

		this.validators.billing_city = function(value){
			return value.length > 0 ? {isValid: true} : {isValid: false, message: 'You must enter a city'};
		}

		this.validators.billing_state = function(value){
			return value.length > 0 ? {isValid: true} : {isValid: false, message: 'You must enter a state'};
		}

		this.validators.billing_zip = function(value){
			return value.length > 0 ? {isValid: true} : {isValid: false, message: 'You must enter a zip code'};
		}


	},
	validateItem: function(key){
		return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
	},
	validateAll: function(){
		var messages = {};
		for (var key in this.validators){
			if (this.validators.hasOwnProperty(key)){
				var check = this.validators[key](this.get(key));
				if (check.isValid === false){
					messages[key] = check.message;
				}
			}
		}
		return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
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
	ui: {
		card_name: '#card_name',
		card_number: '#card_number',
		card_exp_month: '#card_exp_month',
		card_exp_year: '#card_exp_year',
		billing_addr: '#billing_addr',
		billing_city: '#billing_city',
		billing_state: '#billing_state',
		billing_zip: '#billing_zip',
		//sameAddrBox: '#sameAddrBox'
	},
	events: {
		'change': 'change',
		'click #cancelBtn': 'cancelChange',
		'click #sameAddrBox': 'useSameAddr',
		'click #submitBtn': 'setChange'
	},
	onRender: function(){
		this.delegateEvents();
	},
	initialize: function(){},
	change: function (event) {
		var self = this;

		// Remove any existing alert message
		utils.hideAlert();
		

		// Apply the change to the model
		var target = event.target;
		var change = {};

		if (target.name === "card_number"){
		
			$(target).validateCreditCard(function(result){
				if (result.luhn_valid && result.length_valid){
					console.log(result);
					//self.model.set({card_number: $(self.ui.card_number).val()});
					change[target.name] = target.value;
					self.model.set(change);

					var check = self.model.validateItem(target.id);
					if(check.isValid === false){
						utils.addValidationError(target.id, check.message);
					} else {
						utils.removeValidationError(target.id);
					}
				} else {
					var check = self.model.validateItem(target.id);
					if(check.isValid === false){
						utils.addValidationError(target.id, check.message);
					} else {
						utils.removeValidationError(target.id);
					}
				}
			},{ accept: ['visa', 'mastercard', 'amex', 'discover']});
		
		} else {
			change[target.name] = target.value;
			this.model.set(change);
			
			// Run validation rule (if any) on changed item
			var check = this.model.validateItem(target.id);
			if (check.isValid === false) {
				utils.addValidationError(target.id, check.message);
			} else {
				utils.removeValidationError(target.id);
			}
		}
    },
	cancelChange: function(e){
		e.preventDefault();
		PGProfile.navCredit();
	},
	useSameAddr: function(e){
		if (e.currentTarget.checked) {
			console.log("checked");
		} else {
			console.log("unchecked");
		}
	},
	setChange: function(e){
		var self = this;
		var check = this.model.validateAll();
		if (check.isValid === false){
			utils.displayValidationErrors(check.messages);
			return false;
		}
		this.submitChanges();
		return false;
	},
	submitChanges: function(e){
		this.model.save({
			success: function(){
				alert("success");
			},
			error: function(){
				console.log("error");
			}
		});
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

	//MODELS
	PGProfile.loggedInModel = new LoggedInStatus();
	PGProfile.subscriptions = new Subscriptions();
	PGProfile.acctHistory = new AccountHistCollection(exampleAccountData);
	PGProfile.updateCard = new UpdateCCard();

	//Views
	PGProfile.navLayout = new NavView({model: PGProfile.loggedInModel});
	PGProfile.loginLayout = new LoginView();
	PGProfile.sideLayout = new SideView();
	PGProfile.profileLayout = new ProfileView({model: PGProfile.loggedInModel });
	PGProfile.editProfileLayout = new EditProfileView({ model: PGProfile.loggedInModel });
	PGProfile.changePassLayout = new ChangePasswordView();
	PGProfile.creditCardLayout = new CreditCardView();
	PGProfile.editCreditCardLayout = new EditCreditCardView({ model: PGProfile.updateCard });
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
