webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(1);
	var platform_browser_dynamic_1 = __webpack_require__(159);
	var core_1 = __webpack_require__(4);
	var http_1 = __webpack_require__(276);
	var router_deprecated_1 = __webpack_require__(297);
	var uc_1 = __webpack_require__(329);
	core_1.enableProdMode();
	platform_browser_dynamic_1.bootstrap(uc_1.SeedApp, [
	    http_1.HTTP_PROVIDERS,
	    router_deprecated_1.ROUTER_PROVIDERS,
	    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy })
	])
	    .catch(function (err) { return console.error(err); });
	

/***/ },

/***/ 329:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var router_deprecated_1 = __webpack_require__(297);
	var calc_1 = __webpack_require__(330);
	var SeedApp = (function () {
	    function SeedApp() {
	    }
	    SeedApp = __decorate([
	        core_1.Component({
	            selector: 'seed-app',
	            providers: [],
	            pipes: [],
	            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
	            templateUrl: 'app/uc.html',
	        }),
	        router_deprecated_1.RouteConfig([
	            { path: '/calc', component: calc_1.Calc, name: 'Calc', useAsDefault: true },
	        ]), 
	        __metadata('design:paramtypes', [])
	    ], SeedApp);
	    return SeedApp;
	}());
	exports.SeedApp = SeedApp;
	

/***/ },

/***/ 330:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by mpd on 4/10/16.
	 */
	var http_1 = __webpack_require__(276);
	var core_1 = __webpack_require__(4);
	var common_1 = __webpack_require__(1);
	var parameters_1 = __webpack_require__(331);
	var SubsystemPipe_1 = __webpack_require__(332);
	var lsName = "UCREparm";
	var parameters_2 = __webpack_require__(331);
	var Calc = (function () {
	    function Calc(http) {
	        this.title = 'UCRE Capacity Calculator';
	        this.parameters = parameters_1.PARAMETERS;
	        this.neCUSP = 0;
	        this.nCUBE = 0;
	        this.nCMS = 0;
	        this.iCPS = 0;
	        this.eCPS = 0;
	        this.nVM = 0;
	        this.nVcore = 0;
	        this.mem = 0;
	        this.ss = parameters_2.subSystem;
	        this.field = new common_1.Control('', common_1.Validators.minLength(4));
	    }
	    Calc.prototype.onSelect = function (parameter) { this.selectedParameter = parameter; };
	    Calc.prototype.nBoxes = function (cps, bc, percload, red) {
	        return Math.ceil((cps / bc) * (100 / percload)) + red;
	    };
	    Calc.prototype.saveDefaults = function () {
	        var idx = 0;
	        for (var _i = 0, PARAMETERS_1 = parameters_1.PARAMETERS; _i < PARAMETERS_1.length; _i++) {
	            var entry = PARAMETERS_1[_i];
	            localStorage.setItem(lsName + String(idx++), String(entry.value));
	        }
	    };
	    Calc.prototype.loadDefaults = function () {
	        for (var idx in parameters_1.PARAMETERS) {
	            var item = localStorage.getItem(lsName + idx);
	            if (item)
	                parameters_1.PARAMETERS[idx].value = +item;
	            idx = idx + 1;
	        }
	    };
	    Calc.prototype.sanitize = function (p) {
	        if (p.value < p.min)
	            p.value = p.min;
	        else if (p.value > p.max)
	            p.value = p.max;
	    };
	    Calc.prototype.reCalc = function () {
	        for (var i in parameters_1.PARAMETERS) {
	            this.sanitize(parameters_1.PARAMETERS[i]);
	        }
	        this.TahoeCapacity = +parameters_1.PARAMETERS[0].value;
	        this.holdingTime = +parameters_1.PARAMETERS[1].value;
	        this.CUBECapacity = +parameters_1.PARAMETERS[2].value;
	        this.CUSPCapacity = +parameters_1.PARAMETERS[3].value;
	        this.redundancy = +parameters_1.PARAMETERS[4].value;
	        this.concurrentServerLoss = +parameters_1.PARAMETERS[5].value;
	        this.recoveryRate = +parameters_1.PARAMETERS[6].value;
	        this.loadRate = +parameters_1.PARAMETERS[7].value;
	        this.maxCC = +parameters_1.PARAMETERS[8].value;
	        this.avgh = +parameters_1.PARAMETERS[9].value;
	        this.CMSCapacity = +parameters_1.PARAMETERS[10].value;
	        this.CMSPorts = +parameters_1.PARAMETERS[11].value;
	        this.P = +parameters_1.PARAMETERS[12].value;
	        this.vCores = +parameters_1.PARAMETERS[13].value;
	        this.vMem = +parameters_1.PARAMETERS[14].value;
	        var CPS = this.TahoeCapacity / (60 * this.holdingTime);
	        /* The IVR box calculator is based on the Erlang-B formula.  Specifically, on prof. Brian Borchers' ingenious
	         rendition of the reverse Erlang-B calculation.  I am just a dumb programmer, and have worked hard to confirm
	         to the best of my admittedly limited abilities that my Typescript port performs on par with the Matlab original
	         (which is available here: http://www.mathworks.com/matlabcentral/fileexchange/824-erlang-b-and-c-probabilities/content/erlang/erlangbinv.m)
	         I've also verified the results with a completely different implementation found here:
	         http://www.cas.mcmaster.ca/~qiao/publications/erlang/newerlang.html If you have a problem with the porting job,
	         I'd be happy to discuss it.  If you have a problem with the math, please feel free to confront prof. Borchers
	         (or Mr. Erlang's himself) - I'm neither qualified, nor adequately compensated for this kind of discussion.
	         */
	        var lambda = CPS * 60.; //convert to calls per minute
	        var mu = 60. / +this.avgh; //Service Rate: how many calls are served per time unit (minute);  if average h is 30 seconds, then mu == 2
	        var Rho = +lambda / +mu; //busy hour traffic in Erlangs
	        var B = 1;
	        var n = 1;
	        while (true) {
	            B = ((Rho * B) / n) / (1 + Rho * B / n);
	            if (B <= +this.P)
	                break;
	            n = n + 1;
	        }
	        this.nCMS = Math.ceil(n / this.CMSPorts) + this.redundancy; //the number of CMS according to Erlang-B;  however, we're not done yet – one more check.
	        var nCMSbyCPS = this.nBoxes(CPS, this.CMSCapacity, this.loadRate, this.redundancy); //we need this many boxes to handle the general CPS of the system
	        if (nCMSbyCPS > this.nCMS) {
	            this.nCMS = nCMSbyCPS;
	        }
	        this.nDSA = Math.ceil(this.nCMS / 4);
	        if (this.nDSA < 2)
	            this.nDSA = 2;
	        //UCRE call routing and SBC layers
	        this.neCUSP = this.nBoxes(CPS, this.CUSPCapacity, this.loadRate, this.redundancy);
	        var adjustedCPS = CPS + this.recoveryRate * this.concurrentServerLoss; //if 2 TAS and 1 CMS pop at the same time, we're looking at 600 CPS increase
	        // Calculate the number of CUBE and iCUSP instances based on peak hour + recovery CPS
	        this.niCUSP = this.nBoxes(adjustedCPS, this.CUSPCapacity, this.loadRate, this.redundancy);
	        this.nCUBE = this.nBoxes(adjustedCPS, this.CUBECapacity, this.loadRate, this.redundancy);
	        // This condition is unlikely to ever be true:  it would mean a very high CPS for CUBE
	        if (this.maxCC * (this.nCUBE - this.redundancy) < this.TahoeCapacity)
	            this.nCUBE = Math.ceil(this.TahoeCapacity / this.maxCC) + this.redundancy;
	        var coresPerCuspVm = 6; //this is a temporary measure to reflect CUSP requiring a different flavor VM.
	        // If more components emerge that deviate from the standard flavor, the UI needs to change to reflect that.
	        var nCusp = this.neCUSP + this.niCUSP;
	        this.nVM = this.nCMS * 2 + this.nDSA + this.nCUBE;
	        this.nVcore = this.vCores * this.nVM + nCusp * coresPerCuspVm;
	        this.mem = (this.nVM + nCusp) * this.vMem;
	        this.nVM = this.nVM + nCusp;
	        this.saveDefaults();
	    };
	    Calc.prototype.ngOnInit = function () {
	        this.loadDefaults();
	        this.reCalc();
	    };
	    Calc = __decorate([
	        core_1.Component({
	            selector: 'calc',
	            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
	            //  changeDetection: ChangeDetectionStrategy.OnPush,
	            templateUrl: 'app/components/calc/calc.html',
	            styleUrls: ['app/components/calc/calc.css'],
	            pipes: [SubsystemPipe_1.SubsystemPipe],
	        }), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], Calc);
	    return Calc;
	}());
	exports.Calc = Calc;
	

/***/ },

/***/ 331:
/***/ function(module, exports) {

	/**
	 * Created by mpd on 4/11/16.
	 */
	"use strict";
	(function (subSystem) {
	    subSystem[subSystem["ucre"] = 0] = "ucre";
	    subSystem[subSystem["givr"] = 1] = "givr";
	    subSystem[subSystem["vm"] = 2] = "vm";
	})(exports.subSystem || (exports.subSystem = {}));
	var subSystem = exports.subSystem;
	exports.PARAMETERS = [
	    {
	        "name": "Concurrent Calls", "value": +120000,
	        "measurement": "[ports]",
	        "tooltip": "How many total conference ports do we want to serve with this UCRE deployment?",
	        "min": 1000,
	        "max": 10000000,
	        "step": "1000",
	        "subs": subSystem.ucre
	    },
	    {
	        "name": "Call Connect Time",
	        "value": +5,
	        "measurement": "[min]",
	        "tooltip": "How long does it take to connect all calls? This parameter is derived by observing user behavior.",
	        "min": 1,
	        "max": 60,
	        "step": "1",
	        "subs": subSystem.ucre
	    },
	    {
	        "name": "*CUBE Max Call Rate λ", "value": +40,
	        "measurement": "[CPS]",
	        "tooltip": "The maximum number of calls per second a CUBE can handle",
	        "min": 1,
	        "max": 5000,
	        "step": "1",
	        "subs": subSystem.ucre
	    },
	    {
	        "name": "*CUSP Max Call Rate λ", "value": +200,
	        "measurement": "[CPS]",
	        "tooltip": "The maximum number of calls per second a CUSP can handle",
	        "min": 1,
	        "max": 5000,
	        "step": "1",
	        "subs": subSystem.ucre
	    },
	    {
	        "name": "Redundancy, N+", "value": +2,
	        "measurement": "",
	        "tooltip": "How many severs can go down in each layer before further failures affect user experience?",
	        "min": 0,
	        "max": 100,
	        "step": "1",
	        "subs": subSystem.ucre
	    },
	    {
	        "name": "Fault Tolerance", "value": +1,
	        "measurement": "[servers]",
	        "tooltip": "How many servers (TAS, CMS, etc. – each in different Tahoe) can a system lose concurrently before the additional CPS the recovery creates overwhelmes UCRE?",
	        "min": 0,
	        "max": 10,
	        "step": "1",
	        "subs": subSystem.ucre
	    },
	    {
	        "name": "*Failure Recovery Rate", "value": +200,
	        "measurement": "[CPS]",
	        "tooltip": "At what calls per second rate do services relocate calls from a failed resource to a new one?",
	        "min": 1,
	        "max": 2000,
	        "step": "10",
	        "subs": subSystem.ucre
	    },
	    {
	        "name": "Maximum Load Rate", "value": +80,
	        "measurement": "[%]",
	        "tooltip": "What is the desired maximum load of each component under normal circumstances?",
	        "min": 1,
	        "max": 100,
	        "step": "10",
	        "subs": subSystem.ucre
	    },
	    {
	        "name": "*Max Calls per CUBE", "value": +12000,
	        "measurement": "",
	        "tooltip": "What is the maximum number of concurrent calls a CUBE can handle?",
	        "min": 1000,
	        "max": 100000,
	        "step": "1000",
	        "subs": subSystem.ucre
	    },
	    {
	        "name": "*Time spent in IVR", "value": +18,
	        "measurement": "[sec]",
	        "tooltip": "The average time the IVR system is busy per call, including resource allocation/release.",
	        "min": 5,
	        "max": 300,
	        "step": "1",
	        "subs": subSystem.givr
	    },
	    {
	        "name": "*IVR Max Call Rate λ", "value": +25,
	        "measurement": "[CPS]",
	        "tooltip": "The maximum number of calls per second an IVR/CMS pair can handle.",
	        "min": 1,
	        "max": 5000,
	        "step": "1",
	        "subs": subSystem.givr
	    },
	    {
	        "name": "*IVR ports per unit", "value": +2000,
	        "measurement": "",
	        "tooltip": "The maximum number of ports per CMS server that can be used concurrently for IVR.",
	        "min": 1,
	        "max": 50000,
	        "step": "100",
	        "subs": subSystem.givr
	    },
	    {
	        "name": "Grade of Service", "value": 0.01,
	        "measurement": "",
	        "tooltip": "Probability of a caller getting fast busy due to lack of available IVR ports. Lower is better.",
	        "min": 0.00001,
	        "max": 0.9,
	        "step": "any",
	        "subs": subSystem.givr
	    },
	    {
	        "name": "VCores per VM", "value": 4,
	        "measurement": "",
	        "tooltip": "Number of virtual CPU cores per VM flavored for voice infrastructure (except CUSP, which is fixed at 6 cores per VM).",
	        "min": 1,
	        "max": 16,
	        "step": "1",
	        "subs": subSystem.vm
	    },
	    {
	        "name": "Memory per VM", "value": 4,
	        "measurement": "[GB]",
	        "tooltip": "Size of memory of a VM flavored for voice infrastructure.",
	        "min": 1,
	        "max": 32,
	        "step": "1",
	        "subs": subSystem.vm
	    }
	];
	

/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by mpd on 8/26/16.
	 */
	var core_1 = __webpack_require__(4);
	// Tell Angular2 we're creating a Pipe with TypeScript decorators
	var SubsystemPipe = (function () {
	    function SubsystemPipe() {
	    }
	    SubsystemPipe.prototype.transform = function (value, arg) {
	        return value.filter(function (r) {
	            return r.subs == arg;
	        });
	    };
	    SubsystemPipe = __decorate([
	        core_1.Pipe({
	            name: 'SubsystemPipe'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], SubsystemPipe);
	    return SubsystemPipe;
	}());
	exports.SubsystemPipe = SubsystemPipe;
	

/***/ }

});
//# sourceMappingURL=app.map