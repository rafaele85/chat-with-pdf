import {FC,} from 'react';

const ChatToFilePage: FC<{params: {id: string}}> = ({params: {id,},}) => {
  return (
    <div>
      Chat to page {id}
    </div>
  );
};

export default ChatToFilePage;