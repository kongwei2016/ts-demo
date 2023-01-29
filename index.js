var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var str = "你好";
var abc = 123;
var num = 123;
var orwhere = "都行吧";
var someValue = "this is a string";
var strLength = someValue.length;
var color1;
(function (color1) {
    color1[color1["Red"] = 0] = "Red";
    color1[color1["Blue"] = 1] = "Blue";
    color1[color1["Green"] = 2] = "Green";
})(color1 || (color1 = {}));
var color2;
(function (color2) {
    color2[color2["Red"] = 1] = "Red";
    color2[color2["Blue"] = 3] = "Blue";
    color2[color2["Green"] = 5] = "Green";
})(color2 || (color2 = {})); //指定位置
var cc = color1.Blue;
var colorName = color2[1];
var list = [
    {
        id: "123",
        name: "ming",
        tt: 666
    },
];
var mylist = [
    {
        id: "222",
        age: 25,
        tt: 7878
    },
];
var Point = /** @class */ (function () {
    function Point() {
        this.x = 1;
        this.y = 1;
    }
    Point.prototype.log = function () {
        console.log("123456");
    };
    return Point;
}());
var pp3d = {
    x: 1,
    y: 2,
    z: 3,
    log: function () {
        console.log("log");
    }
};
var mydiy = function (str1, str2) {
    var result = str1.length + str2.length;
    return result > 10;
};
var ccc = mydiy("aaa", "asd");
console.log(ccc);
//----------------装饰器----------------//
// -------------类装饰器-------------
// leizsq() 接收的参数 params 就是被装饰的类 myleizsq
// 为 myleizsq 动态扩展属性属性和方法
var leizsq = function (params) {
    params.prototype.url = "动态扩展的属性";
    params.prototype.run = function () {
        console.log("作弊暴击100点");
    };
};
var myleizsq = /** @class */ (function () {
    function myleizsq() {
    }
    myleizsq.prototype.run = function () {
        console.log("伤害10点");
    };
    myleizsq = __decorate([
        leizsq
    ], myleizsq);
    return myleizsq;
}());
var myhttp = new myleizsq();
myhttp.run(); //作弊暴击100点
var aleizsq = /** @class */ (function (_super) {
    __extends(aleizsq, _super);
    function aleizsq() {
        return _super.call(this) || this;
    }
    return aleizsq;
}(myleizsq));
var ahttp = new aleizsq();
ahttp.run(); //伤害10点
//装饰器工厂
var leilog = function (params) {
    console.log("params:", params); //params: "1000"
    return function (target) {
        console.log("target:", target); //target: class myCli
        target.prototype.url = "www.baidu.com/" + params; //扩展一个url属性
        target.prototype.run = function () {
            console.log("作弊暴击", params);
        };
    };
};
var myCli = /** @class */ (function () {
    function myCli() {
    }
    myCli = __decorate([
        leilog("100000000000") //装饰器工厂（可传参）
    ], myCli);
    return myCli;
}());
var leihttp = new myCli();
leihttp.url; // "www.baidu.com/1000"
leihttp.run(); // //作弊暴击 10000000000000 点
// -------------方法装饰器-------------
// ● 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// ● 成员的名字。
// ● 成员的属性描述符。//get,set,value,writable
// 方法装饰器表达式会在运行时当作函数被调用，当前装饰器作用于实例方法，运行代码会打印
var addTarget = function (target, key, descriptor) {
    //打印tar1类的 prototype 原型对象
    //打印tar2类的 构造函数
    console.log(target);
};
var tar1 = /** @class */ (function () {
    function tar1() {
    }
    tar1.prototype.run = function () {
        console.log("");
    };
    __decorate([
        addTarget
    ], tar1.prototype, "run");
    return tar1;
}());
var tar2 = /** @class */ (function () {
    function tar2() {
    }
    tar2.run = function () {
        console.log("");
    };
    __decorate([
        addTarget
    ], tar2, "run");
    return tar2;
}());
function addKey(target, key, descriptor) {
    //打印mykey类的 所装饰的方法的名字
    console.log(key);
    // aaa
    // bbb
}
var mykey = /** @class */ (function () {
    function mykey() {
    }
    mykey.prototype.aaa = function () {
        console.log("");
    };
    mykey.prototype.bbb = function () {
        console.log("");
    };
    __decorate([
        addKey
    ], mykey.prototype, "aaa");
    __decorate([
        addKey
    ], mykey.prototype, "bbb");
    return mykey;
}());
function addDes(target, key, descriptor) {
    // descriptor 是一个 PropertyDescriptor 的内置类型,
    // PropertyDescriptor 对应着 Js 的 Object.defineProperty() 的第三个参数 descrideptor，
    // 通过 IDE 的功能可以发现它有以下属性，完全对应上, descrideptor 就是控制函数的属性
    descriptor.value = function () {
        console.log("replace");
    };
    // descriptor.writable = false; // 设置禁止修改
}
var myDes = /** @class */ (function () {
    function myDes() {
    }
    myDes.prototype.run = function () {
        console.log("run");
    };
    __decorate([
        addDes
    ], myDes.prototype, "run");
    return myDes;
}());
var weqw = new myDes();
weqw.run();
// value 是指被装饰的函数，这里我们重写被装饰的函数，程序运行的结果将会是我们重写后函数的值,输出
// "replace",而不是"run"
weqw.run = function () {
    console.log("abcd");
};
// 对于在外部覆盖原有的函数，不希望它发生，那么我们可以使用 writable 设置为 false
//装饰器工厂
var gongc = function (val) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = val; //--对象属性的可枚举性
    };
};
var mygongc = /** @class */ (function () {
    function mygongc() {
    }
    mygongc.prototype.run = function () {
        console.log("run");
    };
    __decorate([
        gongc(false) //装饰器工厂（可传参）
    ], mygongc.prototype, "run");
    return mygongc;
}());
// -------------参数装饰器-------------
// 参数装饰器表达式会在运行时被调用，可以为类的原型增加一些元素数据，传入3个参数:
//  对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象；
//  方法名称；
//  参数在函数参数列表中的索引；
function logParams(params) {
    console.log(params); // 装饰器传入的参数：myaaa/mybbb
    return function (target, methodName, paramIndex) {
        console.log(target); // { constructor:f, getData:f }
        console.log(methodName); // getData
        console.log(paramIndex); // 0
    };
}
var csClient = /** @class */ (function () {
    function csClient() {
    }
    csClient.prototype.getData = function (aaa, bbb) {
        console.log(aaa, bbb);
    };
    __decorate([
        __param(0, logParams("myaaa")), __param(1, logParams("mybbb"))
    ], csClient.prototype, "getData");
    return csClient;
}());
// -------------属性装饰器-------------
// 属性装饰器表达式会在运行时当作函数被调用，传入两个参数：
//  对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象；
//  成员的名字；
function logProp(params) {
    console.log(params); // 装饰器传入的参数："baidu.com"
    return function (target, attr) {
        console.log(target); // { constructor:f, getData:f }
        console.log(attr); // url
        //通过原型对象修改属性值 = 装饰器传入的参数
        target.attr = params; //target.url = "baidu.com";
        target.api = "myapi";
        target.run = function () {
            console.log("run");
        };
    };
}
var hClient = /** @class */ (function () {
    function hClient() {
    }
    hClient.prototype.getData = function () {
        console.log(this.url); // baidu.com
    };
    __decorate([
        logProp("baidu.com")
    ], hClient.prototype, "url");
    return hClient;
}());
var shttp = new hClient();
shttp.getData(); // baidu.com
console.log(shttp.api); // myapi
shttp.run(); // run
// -------------装饰器组合-------------
function log11(params) {
    return function (target) {
        console.log("log11");
    };
}
function log22(params) {
    return function (target) {
        console.log("log22");
    };
}
function logAttr(params) {
    return function (target, attrName) {
        console.log("logAttr");
    };
}
function logMethod(params) {
    return function (target, methodName, desc) {
        console.log("logMethod");
    };
}
function logParam11(params) {
    return function (target, methodName, paramIndex) {
        console.log("logParam11");
    };
}
function logParam22(params) {
    return function (target, methodName, paramIndex) {
        console.log("logParam22");
    };
}
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
        console.log("get data");
    };
    HttpClient.prototype.setData = function (param1, param2) {
        console.log("set data");
    };
    __decorate([
        logAttr()
    ], HttpClient.prototype, "url");
    __decorate([
        logMethod()
    ], HttpClient.prototype, "getData");
    __decorate([
        __param(0, logParam11()), __param(1, logParam22())
    ], HttpClient.prototype, "setData");
    HttpClient = __decorate([
        log11("baidu.com"),
        log22()
    ], HttpClient);
    return HttpClient;
}());
// 在TypeScript里，当多个装饰器应用在一个声明上时会进行如下步骤的操作：
// 由上至下依次对装饰器表达式求值;
// 求值的结果会被当作函数，由下至上依次调用.
// 不同装饰器的执行顺序：属性装饰器 > 方法装饰器 > 参数装饰器 > 类装饰器
// logAttr --> logMethod --> logParam22 --> logParam11 --> log22 --> log11
// 属性 -> 方法 -> 参数2 -> 参数1 -> 类2 -> 类1
