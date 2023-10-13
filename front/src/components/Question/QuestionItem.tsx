import React from 'react';

import { Question } from '@/shared/types/types';

export type QuestionItemPropsType = {
  question: Question,
};

const QuestionItem: React.FC<QuestionItemPropsType> = ({
  question,
}) => {
  return <>{ question.title }</>
};

export default QuestionItem;
