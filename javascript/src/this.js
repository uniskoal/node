
/** 
 * * this
 * ? 자바스크립트 함수가 호출될 때 매개변수의 인자값을 객체로 가지고 있는 arguments 객체와
 * ? 객체를 가리키는 this를 암묵적으로 전달 받습니다.
*/

/** 
 * ? 정해지지 않은 매개변수를 받아 더하는 함수
*/

function add() {
    
    var result = 0; 

    for ( data of arguments) {
        result += data;
    }

    return console.log(result);
}

add(1,4,7,5,2);

/** 
 * ? arguments 는 매개변수의 인자값을 배열처럼 작동하는 객체 형태로 저장한다.
 * ? 배열처럼 이라는 뜻은 인덱스 기능을 지원하지만 태생이 Object이기 때문에 Array.prototype의 메서드를 사용할 수 없다.
 * ? call,bind,apply 같은 함수 프로토타입을 사용할 순 있다.
*/

/** 
 * * this 바인딩 방식
 * ? 바인딩은 연결한다라는 의미로, 대표적인 사용 방식은 생성자 함수의 매개변수와 프로퍼티를 구분하기
 * ? 위함으로 자신의 객체를 가리키는 용도로 사용했다.
 * ? 자바에서 this는 단순히 자기 자신을 가리키는 참조변수로써 사용하지만, 
 * ! 자바스크립트 같은 경우에는 함수가 어떤 식으로 호출 되는지에 따라 가리키는 객체가 다르다.
 * ! 이걸 모른다? 자바 처럼 사용하다가 큰일 난다.
 * 
 * ? 저번에 공부했던 함수 정적 스코프의 경우에는 함수가 선언되었을때의 스코프를 따졌지만
 * ? 생성자,메서드,일반적인 함수, 함수 메서드인 apply,call,bind를 이용한 강제 바인딩 등
 * ? 호출 방식에 의해 this의 연결될 객체가 동적으로 결정된다. 
*/


/** 
 * * 함수의 호출 방식의 종류
 * 
 * ? 1. 일반적인 전역 함수 호출 / 내부 함수
 * ? 2. 객체의 메서드 호출
 * ? 3. 생성자 함수 호출
 * ? 4. apply,bind,call 을 통한 강제 바인딩
*/


/** 
 * * 1. 일반적인 전역 함수 호출 / 내부 함수 / 콜백 함수
 * 
 * ? 여기서 전역 객체라는 뜻은 이전에서 공부했듯이 window 객체를 뜻한다.
 * ? 전역 객체의 연결된다? window 로 연결된다.
 * ? 일반적으로 this는 전역 객체의 바인딩 됩니다. 내부 함수 또한 마찬가지입니다.
 *  TODO 비동기 프로그래밍에서 사용하는 콜백 또한 전역 객체를 바인딩합니다. 이런
*/

glory = 1000; // 선언되지 않는 변수는 전역 객체 window의 프로퍼티가 된다.


var extend = function() {
    console.log(this.glory); // ? global 객체를 가지고 있는걸 알 수 있다. node같은 경우는 global 브라우저에서는 window 로 작동한다.
    
    function expend() {
        var glory = 2000;
        console.log(this.glory); // ? 내부함수 또한 전역 객체의 바인딩 되는 사실을 알 수 있다.
    }

    expend();
} 

extend();

/** 
 * ! window 객체에 접근하면 에러가 난다. 사실 접근 안 하는게 좋다.
*/

/** 
 * * 2. 메서드 호출 
 * 
 * ? 함수가 객체의 프로퍼티로써 사용될 경우, 이를 메서드라고 한다.
 * ? this는 해당 메서드를 소유한 객체를 바인딩한다. 즉 메서드를 호출한 객체에 따라 바인딩된다.
 * TODO 객체의 프로퍼티는 언제든지 다른 객체의 프로퍼티가 될 수 있기 때문에 이를 위해 호출에 따른 바인딩을 부여한 거 같다.
*/

var god = {
    name : "god",
    skill : function() {
        console.log(this.name);
    }
}

god.skill();

var human = {
    name : "human",
}

human.skill = god.skill; // ? -> 프로퍼티를 넘겨줄때는 이름만 사용하면 된다.

human.skill();

/** 
 * * 2-1. 객체의 내부 함수(메서드) this 사용법
 * 
 * ? 내부 함수의 this는 어떤 함수를 사용하든 반드시 전역 객체를 바인딩한다.
 * ? 이로 인해 원하지 않는 문제가 생길 수 있기 때문에, 내부 함수의 this가
 * ? 자신의 객체를 바인딩하게 해야 한다. 그러기 위한 방법은 두 가지가 있다.
 * 
 * * 1. 내부 변수 사용
 * * 2. call,apply,bind 를 이용한 강제 바인딩 -> 하위에서 따로 설명
*/

/** 
 * * 1. 내부 변수 사용 
 * 
 * ? 외부 함수의 선두에 this를 값으로 변수를 할당한다. 
*/



var base = {
    name : 'base',
    door : function () {
        function print() {
            console.log(this.name);
        }
        print();
    }
}

base.door(); // ? -> 정의되지 않은 전역객체의 프로퍼티를 참고하려고 하기 때문에 undefined

/** 
 * ? 하지만 함수 객체의 선두의 this를 변수화 시킨다면?
*/

var base = {
    name : 'base',
    door : function () {
        var that = this;
        function print() {
            console.log(that.name);
        }
        print();
    }
}

base.door(); // ? -> 성공적으로 자신의 객체인 base를 바인딩 했다는 걸 알 수 있다.

/** 
 * ! 이는 프로토타입 메서드에서도 똑같이 작동한다.
*/

/** 
 * * 3. 생성자 함수 호출
 * 
 * ? 생성자 함수의 역할은 새로운 하위 객체를 생성하는 데에 있다. 이 때, 사용되는 키워드가 
 * ? new 이며 new를 사용해야만 생성자 함수로써 작동하고, 심지어 일반 함수 또한 new를 통해 생성자 함수처럼
 * ? 작동할 수 있다. 이에 대한 혼란을 방지하기 위해 생성자 함수에 첫 글자를 대문자로 사용하는 것이 관례이다.
 * 
 * ! new 를 사용한 생성자 함수에 경우에만 this 바인딩이 정상적으로 작동한다.
*/


/** 
 * TODO 생성자 함수 동작 방식
 * 
 * ? new 연산자와 함께한 생성자 함수의 진정한 동작 수순이다.
*/

/** 
 * * 1. 빈 객체 생성 및 this 바인딩 
 * 
 * ? 하위 객체를 생성하는 과정에서 생성자 함수의 코드 실행 전에 빈 객체를 생성합니다. 
 * ? 아마도  이게 new 의 역할이지 않을까 합니당.
 * ? 새로 생겨난 객체의 this를 바인딩합니다. 앞으로 this는 생성될 하위 객체를 가리키게 됩니다.
*/

/**
 * * 2. this를 통한 프로퍼티 생성
 * 
 * ? this를 사용해서 자신의 객체의 프로퍼티를 생성할 수 있습니다. 이미 this가 바인딩 되었기 때문에
 * ? 하위 객체의 프로퍼티를 할당하겠다라는 의미가 됩니다.
 */

/** 
 * * 3. 생성된 객체 반환
 * 
 * ? 완성된 객체를 반환하는데, 이때 따로 다른 객체를 명시적으로 반환해 버릴 경우,
 * ? 그 객체만 반환되고, this로 생성한 빈 객체는 반환되지 않습니다. 그래서 절대로
 * ? return으로 다른 객체를 반환하면 안 됩니다. 큰일남.
*/

/** 
 * * apply/call/bind 호출 
 * 
 * ? 내부 함수를 자신의 객체에 바인딩 시키는 방법은 변수를 선언하는게 외에도 함수 메서드를 사용해 바인딩하는 방법이 있다.
*/

/**
 * ? this는 함수가 어떻게 호출되냐에 따라 연결 되는 객체가 달라집니다. 단순히 자신의 객체 안에서 사용했다고
 * ? 해서 그 객체의 바인딩 되지 않기 때문에 개념을 완벽하게 알지 않으면 역시나 문제가 발견되기 쉽죠.
 * ? 아무리 이해를 했다고 할 지라도, 내부 변수는 어디에서나 this가 window 전역 객체를 연결합니다. 즉 객체 내부 프로퍼티에 연결 될 수가 없다는 뜻이죠.
 * ? 그러나 이 문제를 해결하기 위해 사용하는 것이 apply,call,bind입니다. 
 */

/** 
 * * apply 
 * 
 * ? (함수 객체).apply(object, [arguments]); 의 형태로 사용된다.
 * ? object는 this를 연결시킬 대상 객체를 의미하고, arguments는 함수의 인자를 유사 배열 객체로 넘기게 됩니다.
*/

var water = {
    ingredient : {
        h : 2,
        o : 1,
    },
    create : function() {
        console.log("create water! ");
        function combine() {
            console.log(this.h + this.o);
        }
        combine.apply(water.ingredient,[]); // ! 이 놈은 메서드가 아니라 함수를 호출할 때 추가로 실행되는 것이다. 즉 이놈도 함수를 실행하는 문이다.
    },
};

water.create();

/** 
 * ? 내부 변수에서 사용한 this 는 원래는 전역 객체에 바인딩되 undefined를 반환하지만,
 * ? apply,call을 이용해 water 객체 안의 객체인 ingredient의 연결해 프로퍼티를 사용할 수 있게 했습니다.
 * ? apply와 call의 차이는 두 번째 매개변수인 arguments 를 배열로 넘기냐, 각각 넘기냐의 차이일 뿐입니다.
*/

/** 
 * * apply 메서드의 또 다른 대표적인 사용법
 * 
 * ? 그거슨 바로 유사 배열 객체같은 배열 처럼 인덱스로 사용할 수 있지만, 배열 메서드는 사용할 수 없는 즉,
 * ? Array.prototype 을 상속받지 못한 유사 배열들에게 배열 메서드를 사용할 수 있게 합니다.
*/

function createArray() {
    
    var arr = Array.prototype.slice.apply(arguments);

    return arr;
}

var con = createArray(1,2,3);

console.log(con);

/** 
 * * Array.prototype.slice.apply(arguments); 
 * 
 * ? slice는 배열의 특정 부분에 대한 복사본을 생성하는 배열 메서드로써,
 * ? 배열 객체들은 전부 Array.prototype 을 프로토타입 객체로 가지고 있기 때문에
 * ? slice를 사용할 수 있는 것이다. 그러나 arguments는 유사 배열이므로, 배열의 메서드를 일반적으론 사용할 수 없으나,
 * ? apply를 통해 slice 메서드의 this를 arguments로 넘겨 마치 arguments.slice()인 것처럼 사용하게 만든 것이다.
 * ? call 또한 같은 효과를 가지고 있다.
 */


/**
  * * callback 함수에서의 this 바인딩
  * 
  * ? 콜백 함수 내부의 this와 외부 함수 내부의 this가 다르기 때문에 문제가 발생할 수 있다.
  * ? 이때 this를 callback내부의 this로 연결시켜 해결한다.
*/

function Insert(content) {
    this.content = content;
}

Insert.prototype.welcome = function(callback) {

    if(typeof callback == 'function') {
        
        callback.call(this); // ? apply 를 사용해도 똑같다. 
    }
}

function hi() {
    console.log(this.content);
}

var enter = new Insert("why?");

enter.welcome(hi);

/** 
 * * Function.prototype.bind 메서드 
 * 
 * ? apply,call과 같이 bind는 대놓고 this를 객체에 바인딩 하라는 의미를 갖고 있다.
 * ? 그러나 분명한 차이점은 apply,call는 함수 호출을 한다는 것이고, bind는 연결만 시키기 때문에
 * ? 따로 함수를 호출 해줘야 한다. 위의 예제를 바꿔보면 아래와 같다.
 * 
 * TODO callback.call(this); 
 * TODO --------------------- 체인지
 * TODO callback.bind(this)(); -> () 추가로 명시해줘야 함수가 호출된다. 
*/



