webpackJsonp([0],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_analytics__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl, ga) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.ga = ga;
        this.percent_mode = 0;
        this.percent_radio = 85;
        this.mod_info = 0;
        this.error = { 'conducted': '', 'present': '' };
        this.result = { 'emotion': 'input details to calculate attendance!!', 'att': '', 'msg': '--', 'icon': 'md-happy', 'iconcolor': 'primary' };
        this.conducted = "";
        this.present = "";
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () {
            _this.myInput.setFocus();
        }, 500);
        this.init_ga();
    };
    HomePage.prototype.init_ga = function () {
        var _this = this;
        this.ga.startTrackerWithId('UA-127384723-3')
            .then(function () {
            console.log('Google analytics is ready now');
            _this.ga.trackView('Bunkmate');
            // Tracker is ready
            // You can now track pages or set additional information such as AppVersion or UserId
        })
            .catch(function (e) { return console.log('Error starting GoogleAnalytics', e); });
    };
    HomePage.prototype.check_valid_input = function () {
        if (this.conducted == "" || this.conducted <= 0) {
            this.result['emotion'] = "enter number of classes conducted";
            this.result['icon'] = "md-create";
            this.result['iconcolor'] = "warning";
            this.result['att'] = "";
            this.result['msg'] = "--";
        }
        else if (this.present == "" || this.present < 0) {
            this.result['emotion'] = "enter number of classes present";
            this.result['icon'] = "md-create";
            this.result['iconcolor'] = "warning";
            this.result['att'] = "";
            this.result['msg'] = "--";
        }
        else if (parseInt(this.conducted) < parseInt(this.present)) {
            this.result['emotion'] = "Error! check if you have exchanged conducted classes with present classes!";
            this.result['icon'] = "md-swap";
            this.result['iconcolor'] = "warning";
            this.result['att'] = "";
            this.result['msg'] = "--";
        }
        else if (parseInt(this.conducted) > 0 && parseInt(this.present) > 0) {
            this.result['emotion'] = "Calculating...";
            this.calculate_att();
        }
        else {
            this.calculate_att();
        }
    };
    HomePage.prototype.calculate_att = function () {
        var att_per = parseInt(this.present) / parseInt(this.conducted);
        att_per = att_per * 100;
        this.result['emotion'] = "--";
        var target_att = this.percent_radio;
        if (parseInt(target_att) > att_per) {
            //how many claas to attend
            var x = ((parseInt(target_att) * parseInt(this.conducted) - 100 * parseInt(this.present)) / (100 - parseInt(target_att)));
            // alert(x);
            if (isNaN(parseInt(x))) {
                this.result['emotion'] = "Oops! you can't bunk now.";
                this.result['icon'] = "thumbs-down";
                this.result['iconcolor'] = "danger";
                this.result['att'] = "Your current attendance is " + att_per + "%";
                this.result['msg'] = "you can never make it to " + parseInt(target_att) + "%.";
            }
            else {
                this.result['emotion'] = "Oops! you can't bunk now.";
                this.result['icon'] = "thumbs-down";
                this.result['iconcolor'] = "danger";
                this.result['att'] = "Your current attendance is " + att_per + "%";
                if (parseFloat(x) % 1 >= 0.1) {
                    x = x + 1;
                }
                this.result['msg'] = "you need to attend " + parseInt(x) + " more classes to get attendance back to " + target_att + "%";
            }
        }
        else if (parseInt(target_att) < parseInt(att_per)) {
            //how many can we bunk
            var x = (100 * parseInt(this.present) - parseInt(target_att) * parseInt(this.conducted)) / parseInt(target_att);
            if (parseInt(x) == 0) {
                //handling zero error
                this.result['emotion'] = "critical! you can bunk - " + x + " classes!!";
                this.result['icon'] = "thumbs-down";
                this.result['iconcolor'] = "red";
                this.result['att'] = "Your current attendance is " + att_per + "%";
                this.result['msg'] = "you are at edge of your attendance requirement - you can't bunk currently! try after some more classes";
            }
            else {
                this.result['emotion'] = "Yay! you can bunk";
                this.result['icon'] = "thumbs-up";
                this.result['iconcolor'] = "secondary";
                this.result['att'] = "Your current attendance is " + att_per + "%";
                this.result['msg'] = "you can bunk upto " + parseInt(x) + " classes and yet still maintain attendance at " + target_att + "%";
            }
        }
        else {
            //cant bunk now
            this.result['emotion'] = "Bunk/Not-Bunk - make your decision!!";
            this.result['icon'] = "warning";
            this.result['iconcolor'] = "warning";
            this.result['att'] = "Your current attendance is " + att_per + "%";
            this.result['msg'] = "you are at edge of your attendance requirement - try after some more classes!";
        }
    };
    HomePage.prototype.validate_input = function (k) {
        if (parseInt(this.conducted) < parseInt(this.present)) {
            this.showAlert("Invalid input", "looks like you have exchanged values of conducted and present classes", 1);
            return false;
        }
        if (this.percent_radio_cus != "" && k == 999) {
            if (parseInt(this.percent_radio_cus) > 100) {
                // this.showAlert("More than 100%?","please check for attendance percentage you want to check for!!",1);
                this.result['emotion'] = "More than 100%?", "please check for attendance percentage you want to check for!!";
                this.result['icon'] = "thumbs-down";
                this.result['iconcolor'] = "danger";
                this.result['att'] = "";
                this.result['msg'] = "--";
                return false;
            }
        }
        return true;
    };
    HomePage.prototype.radio_change = function (k) {
        if (!this.validate_input(k)) {
            return;
        }
        if (k == 999) {
            this.percent_mode = k;
            if (this.percent_radio_cus <= 0) {
                this.result['emotion'] = "Enter valid attendance!!";
                this.result['icon'] = "thumbs-down";
                this.result['iconcolor'] = "danger";
                this.result['att'] = "";
                this.result['msg'] = "how can you expect negative/zero attendance huh??";
                return;
            }
            this.percent_radio = this.percent_radio_cus;
            this.check_valid_input();
        }
        else {
            this.percent_mode = k;
            this.percent_radio_cus = "";
            this.percent_radio = k;
            this.check_valid_input();
        }
    };
    HomePage.prototype.toggle_mod_info = function () {
        if (this.mod_info == 0) {
            this.mod_info = 1;
        }
        else {
            this.mod_info = 0;
        }
    };
    HomePage.prototype.showAlert = function (title, msg, type) {
        if (type == 1) {
            return;
        }
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.mail = function (email) {
        window.open('mailto:' + email);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('conducted_inp'),
        __metadata("design:type", Object)
    ], HomePage.prototype, "myInput", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/nikk/Downloads/bunkmate/bunkmate/src/pages/home/home.html"*/'<ion-fab bottom right>\n  <button ion-fab mini (click)="toggle_mod_info()"><ion-icon name="ios-information-circle-outline"></ion-icon></button>\n</ion-fab>\n<ion-fab bottom left>\n  <a href="/Bunkmate/app.apk"><button ion-fab mini color="secondary"><ion-icon name="logo-android"></ion-icon></button></a>\n</ion-fab>\n<div class="info_modal_container" *ngIf="mod_info==1" (click)="toggle_mod_info()">\n</div>\n  <div class="info_modal" *ngIf="mod_info==1">\n    <h2 style=\'text-align:center;border-bottom:1px solid grey\'>BunkMate app</h2>\n    <h4 style="text-align:center">\n      Designed & developed by Nikhil. Stay tuned for more apps!<br/>\n      <span style=\'font-size:250%;\'><a href="http://facebook.com/nikhiltanni"><ion-icon name="logo-facebook"></ion-icon></a></span> &nbsp;&nbsp;\n      <span style=\'font-size:250%\'><a href="#" (click)="mail(\'nikhiltanni97@gmail.com?subject=Bunkmate%20app%20\')"><ion-icon name="md-mail"></ion-icon></a></span>\n    </h4>\n  </div>\n<ion-content padding-top>\n\n  <hr/>\n  <h1 padding style="color:rgb(255, 191, 0)">BU<span style=\'color:#0080ff\'>N</span>KMATE - Help you Bunk!</h1>\n\n  <ion-card>\n    <ion-card-content>\n        <ion-item>\n          <ion-label stacked style="color: black"><b><span style="color:rgb(255, 191, 0)">C</span>lasses <span style="color:rgb(255, 191, 0)">C</span>onducted</b></ion-label>\n          <ion-input type="number" [(ngModel)]="conducted"#conducted_inp (keyup)="check_valid_input()" placeholder="# of classes conducted" autofocus></ion-input>\n        </ion-item>\n        <hr/>\n        <ion-item>\n          <ion-label stacked style="color: black"><b><span style="color:rgb(255, 191, 0)">C</span>lasses <span style="color:rgb(255, 191, 0)">P</span>resent</b></ion-label>\n          <ion-input type="number" [(ngModel)]="present" (keyup)="check_valid_input()" placeholder="# of classes present"></ion-input>\n        </ion-item>\n    </ion-card-content>\n  </ion-card>\n    <ion-card>\n      <ion-item class="radio_inp">\n        <div class="radio">\n          <input id="radio-50" name="radio_percent" type="radio" (click)="radio_change(50)">\n          <label for="radio-50" class="radio-label">50%</label>\n\n          <input id="radio-60" name="radio_percent" type="radio" (click)="radio_change(60)">\n          <label for="radio-60" class="radio-label">60%</label>\n\n          <input id="radio-70" name="radio_percent" type="radio" (click)="radio_change(70)">\n          <label for="radio-70" class="radio-label">70%</label>\n        </div>\n        <div class="radio">\n          <input id="radio-75" name="radio_percent" type="radio" (click)="radio_change(75)">\n          <label for="radio-75" class="radio-label">75%</label>\n\n          <input id="radio-80" name="radio_percent" type="radio" (click)="radio_change(80)">\n          <label for="radio-80" class="radio-label">80%</label>\n\n          <input id="radio-85" name="radio_percent" type="radio" checked  (click)="radio_change(85)">\n          <label for="radio-85" class="radio-label">85%</label>\n        </div>\n        <div class="radio">\n          <input id="radio-90" name="radio_percent" type="radio" (click)="radio_change(90)">\n          <label for="radio-90" class="radio-label">90%</label>\n\n          <input id="radio-95" name="radio_percent" type="radio"  (click)="radio_change(95)">\n          <label for="radio-95" class="radio-label">95%</label>\n\n          <input id="radio-cus" name="radio_percent" type="radio"  (click)="radio_change(999)" [checked]="percent_mode==999">\n          <label for="radio-cus" class="radio-label"><input type="number" (keyup)="radio_change(999)" class="radio_cus_input" [(ngModel)]="percent_radio_cus" placeholder="other"/></label>\n\n\n        </div>\n      </ion-item>\n    </ion-card>\n\n  <ion-card>\n    <ion-card-content>\n      <h2 class="emotion_display"><span>{{result.emotion}}</span><ion-icon style="margin-left:10px;" name="{{result.icon}}" color="{{result.iconcolor}}"></ion-icon></h2><hr/>\n      <h2 class="att_display"><span>{{result.att}}</span></h2>\n      <h2 class="msg_display"><span>{{result.msg}}</span></h2>\n    </ion-card-content>\n  </ion-card>\n    <br/><br/><br/><br/><br/>\n    <br/><br/><br/><br/><br/>\n</ion-content>\n'/*ion-inline-end:"/home/nikk/Downloads/bunkmate/bunkmate/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_analytics__["a" /* GoogleAnalytics */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(218);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_analytics__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_analytics__["a" /* GoogleAnalytics */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.overlaysWebView(true);
            statusBar.styleDefault();
            statusBar.backgroundColorByHexString("#ffbf00");
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/nikk/Downloads/bunkmate/bunkmate/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/nikk/Downloads/bunkmate/bunkmate/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[195]);
//# sourceMappingURL=main.js.map