// React.memo는 고차 컴포넌트이다.
// 고차 컴포넌트란? 컴포넌트 로직을 재사용하지 위한 React의 고급 기술
// 즉, 컴포넌트를 가져와 새 컴토넌트를 반환하는 함수(ex: 가죽을 주면 구두를 만들어서 주겠다)
// const EnhancedComponent = higherOrderComponent(WrappedComponent);
// 함수(higherOrderComponent)를 호출해서 매개변수로 함수(WrappedComponent)를 전달하면 더 좋은 함수(EnhancedComponent)를 반환하는 것

// React.memo 코드 예시
// const MyComponent = React.memo(function MyComponent(props) {
//   /* props를 사용하여 렌더링 */
// });
// 똑같은 props를 받으면 리렌더링 하지 않는다.
// 즉, React.memo에 리렌더링 되지 않았으면 하는 함수(function ~ MyComponent(props))을 감싸주면 props가 바뀌지 않으면
// 리렌더링 되지않은 강화면 컴포넌트(MyComponent)를 돌려주겠다 라는 의미
// 물론 자기자신의 state가 바뀌면 리렌더됨

// 본래는 부모 컴포넌트(App)가 변경되는 자식 컴포넌트(count, text)는 모두 리렌더가 되었어야 했지만, React.memo를 사용하면
// App인 부모 컴포넌트에서 자식 컴포넌트인 count가 변되면면
// 같은 자식 컴포넌트인 text는 리렌더 되지 않고, count만 리렌더되는 것이 가능하다
import React, { useEffect, useState } from 'react';

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`counterA Update :: ${count}`);
    // 객체의 값과 주소가 같기 때문에 버튼을 눌러도 리렌더 되지 않음
  });
  return <div>{count}</div>;
});

const CounterB = React.memo(({ obj }) => {
  useEffect(() => {
    console.log(`counterB Update :: ${obj.count}`);
    // 객체의 값이 아닌 주소에 의한 비교 "얕은 비교" 때문에 값이 변하지 않아도 게속 주소가 달라
    // 버튼을 누르면 계속 리렌더됨
  });
  return <div>{obj.count}</div>;
});

const areEqual = (prevProps, nextProps) => {
  // return true // 이전 프로스 == 현재 프롭스  => 리렌더를 일으키지 않게 됨
  // return false // 이전 프로스 != 현재 프롭스  => 리렌더를 일으킴
  //   if (prevProps.obj.count == nextProps.obj.count) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  return prevProps.obj.count == nextProps.obj.count;
};

const MemorizedCounterB = React.memo(CounterB, areEqual);
// areEqual는 비교함수로 작용
// counterB는 areEqual의 판단에 따라서 리렌더의 여부가 달라짐

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1, // 객체로 count 사용
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Count A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Count B</h2>
        <MemorizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
      </div>
    </div>
  );
};

/*
const TextView = React.memo(({ text }) => {
  // text가 바뀌지 않으면 렌더링이 발생하지 않음
  useEffect(() => {
    console.log(`Update :: text : ${text}`);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  // count가 바뀌지 않으면 렌더링이 발생하지 않음
  useEffect(() => {
    console.log(`Update :: count : ${count}`);
  });
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>count</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>text</h2>
        <TextView text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};
*/

export default OptimizeTest;
