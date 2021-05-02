
/**
 * * 객체의 불변 데이터 패턴
 * ? 참조값을 전달하는 객체는 데이터를 공유하고 있는 다른 객체에 의해서
 * ? 의도치 않은 문제가 생길 수 있다. 바로 데이터가 같이 바뀐다는 것.
 * ? 이 문제를 심각하게 표현한 일상생활의 예를 들어보겠다.
 * 
 * TODO 같은 주택에 동거하고 있는 2명의 청년이 있다.
 * TODO 두 청년은 치킨 3인분을 시켜먹었고, 너무 많이 시킨 나머지 냉장고에
 * TODO 치킨 한 마리를 보관했다. 이게 바로 냉장고라는 객체에 담긴 치킨 프로퍼티를 공유하고 있는 상태다
 * TODO 근데? 이걸 허락도 없이 누군가가 먹어버린다? 그럼 다른 한 명은 멘붕이 온다.
 * TODO 바로 이런 문제가 일어날 수 있다. 
 * 
 * ? 객체 주소를 공유하기 때문에 무작정 막 바꾸면 안된다는것.
 * * 이를 해결하기 위해선 두 가지 방법이 있다. 
 */


/** 
 * * 객체의 방어적 복사(defensive copy)
 * ? -> Object.assign
 * ? Object.assign(target, ...객체);
 * ? 말그대로 복붙 객체 내용을 복사해서 새로운 객체에 붙여넣을 수 있다.
*/

const num = { a : 1, b : 2, c : 3 }

/** 
 * ! 시작하기 전 
 * ? const 키워드는 상수를 지원하는 키워드다. 한 번 변수에 값을 할당하면 
 * ? 정확히는 참조값을 변경할 수 없다. 
 * ? 즉 다른 객체로 이동하는 것도 안되고 원시값을 새롭게 할당해 새로운 메모리 참조값으로 
 * ? 옮기는 것도 할 수 없다. 
*/

const cp = Object.assign({}, num); 

console.log(cp === num); // false


/** 
 * ? 첫 번째 매개변수인 {} 는 붙여넣기를 당하는 대상입니다. 빈 객체만이 아닌
 * ? 다른 객체 또한 대상이 될 수 있습니다. 쉽게 표현하면 복붙입니다. 
*/

const one = { n : 1 };
const two = { n : 2 };
const three = { n : 3 };

Object.assign(one,two,three);

console.log(one);

/** 
 * ? 동일한 프로퍼티 값이 있을 경우, 덮어씌운다.
*/

/** 
 * ! 객체 내부의 객체에 대한 작동 방식
 * ? 객체 카피는 객체 내부의 객체 까지 완벽하게 카피하진 못한다. 
 * ? 완벽하게 카피하지 못한다는 건 복사가 아닌 공유라는 뜻이다.
*/

const warrior = {
    level : 1,
    hp : 100,
    equipment : {
        weapon : "Wooden Sword",
        skill : "fire ball",
    },
}

let user1 = Object.assign({}, warrior);

console.log(warrior === user1) // false

// ? 붙여넣기를 통해 객체를 훌륭히 복사했고, 서로 완벽히 다른 객체가 된 것 같지만,

console.log(warrior.equipment === user1.equipment); // true

// ? 객체 안의 객체는 복사하지 못하고 공유됨을 알 수 있다.


/**
 * * 객체불변화 
 * ? 이름 그대로 객체에 불변성을 부여해서 프로퍼티 값을 변경할 수 없게 만들어버린다.
 * ? -> Object.freeze()
 * ? 위에 방법은 새로운 객체를 만들어 같은 값을 넣어준 것으로 해결했으나, 그만큼 메모리 용량이 늘어났다.
 * ? 단순하게 객체 자체를 불변하게 만들고 싶을땐 그냥 객체를 얼리면 된다.
 */

Object.freeze(warrior);

warrior.level = 3; // 무시됨.

console.log(warrior.level); // 1 

/**
 * ! 문제는 이 녀석도 객체 내부의 객체를 얼릴 수 없다 ㅠㅠ 
 * ! 내부 객체 까지 얼리려면 따로 함수를 만들어야 한다.
 */

function deepfreeze(obj) {
    const props = Object.getOwnPropertyNames(obj);

    props.forEach(function(name) {
        const prop = obj[name];
    
        if(typeof prop === typeof {} && prop != null) {
            deepfreeze(prop);
        }
    });
    return Object.freeze(obj);
}

deepfreeze(user1); 

user1.equipment.weapon = "Golden Sword"; // 무시됨.

console.log(user1.equipment); // 완벽히 동결.





































