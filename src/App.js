import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// import Lifecycle from './Lifecycle';
import React, { useMemo, useState, useRef, useEffect } from 'react';
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

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
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

export default App;
