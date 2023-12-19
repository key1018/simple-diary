import { useContext } from 'react';
import DiaryItem from './DiaryItem';
import { DiaryDispatchContext, DiaryStateContext } from './App';

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext); // context(문맥)에서 전달받은 데이터를 전달받기
  const { onEdit } = useContext(DiaryDispatchContext);
  const { onRemove } = useContext(DiaryDispatchContext);

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
