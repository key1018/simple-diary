import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// import Lifecycle from './Lifecycle';
import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
// import OptimizeTest from './OptimizeTest';

// https://jsonplaceholder.typicode.com/comments

// const dummyList = [
//   {
//     id: 1,
//     author: '김은영',
//     content: '안녕1',
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: '아무개',
//     content: '안녕2',
//     emotion: 4,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: '봉자',
//     content: '안녕3',
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    // await 키워드랑 같이 이용하기 때문에 async를 붙여서 <Promise>를 반환하는 비동기함수로 호출
    // Mount 되자마자 호출
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  // useCallback 함수
  // 메모이제이션된 콜백을 반환힘 => 즉, 콜백 함수를 다시 반환해주는 역할을 한다
  // dependecy Array값이 변화하지 않으면 첫 번째 인자로 전달한 콜백 함수를 계속 재사용 가능하다

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
    // 함수형 업데이트
    // => 상태변화 함수에 함수를 전달하여 인자를 data로 받아서 newItem을 추가한 데이터함수(...data)를 return하는 콜백함수를 전달
  }, []);
  // 빈 배열을 dependecy Array값으로 지정하면서 마운트되는 시점을 한 번만 만들고
  // 이후에는 첫 번째 만들었던 함수를 재사용할 수 있도록함

  // 마운트(Mount)란?
  // 1. props로 받은 값을 컴포넌트의 state로 설정할 때
  // 2. 컴포넌트가 나타나면 외부 API를 요청해야 할 때
  // 3. 라이브러리를 사용할 때
  // 4. setInterval이나 setTimeout과 같은 작업
  // 결론 : 컴포넌트 생성부터 최초 렌더링까지의 작업

  const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((it) => it.id !== targetId));
    // 원래 다이어리 리스트에서 삭제된 것을 제외한 새로운 다이어리 리스트들을 출력
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    // 값을 반환
    // 이미 계산 해 본 연산 결과를 기억해두었다가
    // 동일한 계산을  시키면, 다시 연산하지 않고 기억해 두었던 데이터를 반환 시키게 하는법방법
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); // data.length가 변화할 때만 callback함수가 재실행됨 => 변화하지 않으면 똑같은 결과를 return함

  // useMemo로 함수를 감싸고 dependency Array를 전달하여 함수를 최적화하면 더이상 함수가 아니게된다.
  // useMemo는 함수를 전달받아서 callback함수가 return하는 값을 전달한다.
  // 즉, getDiaryAnalysis는 값을 useMemo로부터 return 받게되므로 '값'으로 사용해야된다.
  // const { goodCount, badCount, goodRatio } = getDiaryAnalysis(); // 함수로 사용 X
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // 값으로 사용 O

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      {/* <OptimizeTest /> */}
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

// Highlight updates when components render. 를 최적화하기

export default App;
