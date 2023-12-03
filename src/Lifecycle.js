import React, { useEffect, useState } from 'react';

const UnMountTest = () => {
  useEffect(() => {
    console.log('mount');
    return () => {
      // UnMount 시점에 실행하게 됨
      console.log('UnMount');
    };
  }, []);

  return <div>UnMount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  // isVisible이 true면 UnMountTest 반환
  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnMountTest />}
    </div>
  );

  /*
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 컴포넌트가 탄생할 때 (Mount 될 때 - 화면에 나타나는 것)
  // ex) 초기화 작업, 화면이 사용자에게 보여질 때
  useEffect(() => {
    console.log('mount!'); // 화면이 사용자에게 보여질 때 원하는 함수를 입력하면 됨
  }, []); // 빈 배열을 전됨

  // 컴포넌트가 변화할 때 (Update 될 때 - 리렌더 되는 것)
  // ex) 예외 처리 작업, 부모 컴포넌트에서 내려받는 값이 변경될 때, 사용자가 화면에서 값을 바꿀 때
  // 배열(Dependency Array)을 활용하여 감지하고 싶은 값만 감지하여 그 값이 변화하는 순간에 콜백함수를 실행하게 할 수 있음
  useEffect(() => {
    console.log('update');
  }); // 배열 전달 X

  useEffect(() => {
    console.log(`count is update' : ${count}`);
    if (count > 5) {
      alert('count가 5를 넘었습니다. 따라서 1로 초기화합니다.');
      setCount(1);
    }
  }, [count]); // count가 변화하는 순간 호출됨

  useEffect(() => {
    console.log(`text is update ' : ${text}`);
  }, [text]); // text가 변화하는 순간 호출됨

  // 컴포넌트가 죽을 때 (unMount 될 때 - 화면에서 사라지는 것)
  // ex) 메모리 정리 작업

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
  */
};

export default Lifecycle;
