const str: string = "你好";
let abc: number = 123;
const num: number = 123;
const orwhere: string | number = "都行吧";

const someValue: any = "this is a string";
const strLength: number = (someValue as string).length;

enum color1 {
  Red,
  Blue,
  Green,
}
enum color2 {
  Red = 1,
  Blue = 3,
  Green = 5,
} //指定位置
let cc: color1 = color1.Blue;
let colorName: string = color2[1];

//----------------interface 接口----------------//

interface ListItem {
  id: string;
  name?: number | string;
  readonly tt: number;
}

const list: ListItem[] = [
  {
    id: "123",
    name: "ming",
    tt: 666,
  },
];

interface myListItem extends ListItem {
  age: number;
  // [propName: string]: any;
}

const mylist = [
  {
    id: "222",
    age: 25,
    tt: 7878,
    // qwe: 123
  },
];

class Point {
  public x: number = 1;
  public y?: number = 1;
  log() {
    console.log("123456");
  }
}

interface Point3d extends Point {
  z: number;
}

var pp3d: Point3d = {
  x: 1,
  y: 2,
  z: 3,
  log() {
    console.log("log");
  },
};

interface myFun {
  (res1: string, res2: string): boolean;
}

const mydiy: myFun = function (str1: string, str2: string) {
  const result = str1.length + str2.length;
  return result > 10;
};
const ccc = mydiy("aaa", "asd");
console.log(ccc);

//----------------装饰器----------------//

// -------------类装饰器-------------
// leizsq() 接收的参数 params 就是被装饰的类 myleizsq
// 为 myleizsq 动态扩展属性属性和方法
let leizsq = (params: any) => {
  params.prototype.url = "动态扩展的属性";
  params.prototype.run = () => {
    console.log("作弊暴击100点");
  };
};
@leizsq
class myleizsq {
  run() {
    console.log("伤害10点");
  }
}
const myhttp = new myleizsq();
myhttp.run(); //作弊暴击100点
class aleizsq extends myleizsq {
  constructor() {
    super();
  }
}
const ahttp = new aleizsq();
ahttp.run(); //伤害10点

//装饰器工厂
let leilog = (params: string) => {
  console.log("params:", params); //params: "1000"
  return function (target: any) {
    console.log("target:", target); //target: class myCli
    target.prototype.url = `www.baidu.com/${params}`; //扩展一个url属性
    target.prototype.run = () => {
      console.log("作弊暴击", params);
    };
  };
};
@leilog("100000000000") //装饰器工厂（可传参）
class myCli {
  constructor() {}
}
const leihttp: any = new myCli();
leihttp.url; // "www.baidu.com/1000"
leihttp.run(); // //作弊暴击 10000000000000 点

// -------------方法装饰器-------------
// ● 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// ● 成员的名字。
// ● 成员的属性描述符。//get,set,value,writable
// 方法装饰器表达式会在运行时当作函数被调用，当前装饰器作用于实例方法，运行代码会打印
let addTarget = (target: any, key: string, descriptor: PropertyDescriptor) => {
  //打印tar1类的 prototype 原型对象
  //打印tar2类的 构造函数
  console.log(target);
};
class tar1 {
  @addTarget
  run() {
    console.log("");
  }
}
class tar2 {
  @addTarget
  static run() {
    console.log("");
  }
}

function addKey(target: any, key: string, descriptor: PropertyDescriptor) {
  //打印mykey类的 所装饰的方法的名字
  console.log(key);
  // aaa
  // bbb
}
class mykey {
  @addKey
  aaa() {
    console.log("");
  }

  @addKey
  bbb() {
    console.log("");
  }
}

function addDes(target: any, key: string, descriptor: PropertyDescriptor) {
  // descriptor 是一个 PropertyDescriptor 的内置类型,
  // PropertyDescriptor 对应着 Js 的 Object.defineProperty() 的第三个参数 descrideptor，
  // 通过 IDE 的功能可以发现它有以下属性，完全对应上, descrideptor 就是控制函数的属性
  descriptor.value = () => {
    console.log("replace");
  };
  // descriptor.writable = false; // 设置禁止修改
}
class myDes {
  @addDes
  run() {
    console.log("run");
  }
}
const weqw = new myDes();
weqw.run();
// value 是指被装饰的函数，这里我们重写被装饰的函数，程序运行的结果将会是我们重写后函数的值,输出
// "replace",而不是"run"
weqw.run = () => {
  console.log("abcd");
};
// 对于在外部覆盖原有的函数，不希望它发生，那么我们可以使用 writable 设置为 false

//装饰器工厂
let gongc = (val: boolean) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.enumerable = val; //--对象属性的可枚举性
  };
};
class mygongc {
  @gongc(false) //装饰器工厂（可传参）
  run() {
    console.log("run");
  }
}

// -------------参数装饰器-------------
// 参数装饰器表达式会在运行时被调用，可以为类的原型增加一些元素数据，传入3个参数:
//  对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象；
//  方法名称；
//  参数在函数参数列表中的索引；
function logParams(params: string) {
  console.log(params); // 装饰器传入的参数：myaaa/mybbb
  return (target: any, methodName: any, paramIndex: any) => {
    console.log(target); // { constructor:f, getData:f }
    console.log(methodName); // getData
    console.log(paramIndex); // 0
  };
}
class csClient {
  getData(@logParams("myaaa") aaa: string, @logParams("mybbb") bbb: string) {
    console.log(aaa, bbb);
  }
}

// -------------属性装饰器-------------
// 属性装饰器表达式会在运行时当作函数被调用，传入两个参数：
//  对于静态成员来说是类的构造函数，对于实例成员来说是类的原型对象；
//  成员的名字；
function logProp(params: string) {
  console.log(params); // 装饰器传入的参数："baidu.com"
  return (target: any, attr: any) => {
    console.log(target); // { constructor:f, getData:f }
    console.log(attr); // url
    //通过原型对象修改属性值 = 装饰器传入的参数
    target.attr = params; //target.url = "baidu.com";
    target.api = "myapi";
    target.run = () => {
      console.log("run");
    };
  };
}
class hClient {
  @logProp("baidu.com")
  url: string | undefined;
  getData() {
    console.log(this.url); // baidu.com
  }
}
const shttp: any = new hClient();
shttp.getData(); // baidu.com
console.log(shttp.api); // myapi
shttp.run(); // run

// -------------装饰器组合-------------
function log11(params: string) {
  return function (target: any) {
    console.log("log11");
  };
}
function log22(params?: string) {
  return function (target: any) {
    console.log("log22");
  };
}
function logAttr(params?: string) {
  return function (target: any, attrName: any) {
    console.log("logAttr");
  };
}
function logMethod(params?: string) {
  return function (target: any, methodName: any, desc: any) {
    console.log("logMethod");
  };
}
function logParam11(params?: any) {
  return function (target: any, methodName: any, paramIndex: any) {
    console.log("logParam11");
  };
}
function logParam22(params?: any) {
  return function (target: any, methodName: any, paramIndex: any) {
    console.log("logParam22");
  };
}

@log11("baidu.com")
@log22()
class HttpClient {
  @logAttr()
  public url: string | undefined;
  @logMethod()
  getData() {
    console.log("get data");
  }
  setData(@logParam11() param1: any, @logParam22() param2: any) {
    console.log("set data");
  }
}
// 在TypeScript里，当多个装饰器应用在一个声明上时会进行如下步骤的操作：
// 由上至下依次对装饰器表达式求值;
// 求值的结果会被当作函数，由下至上依次调用.
// 不同装饰器的执行顺序：属性装饰器 > 方法装饰器 > 参数装饰器 > 类装饰器

// logAttr --> logMethod --> logParam22 --> logParam11 --> log22 --> log11
// 属性 -> 方法 -> 参数2 -> 参数1 -> 类2 -> 类1
