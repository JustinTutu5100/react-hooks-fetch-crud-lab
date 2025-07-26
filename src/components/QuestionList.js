import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDelete, onUpdate }) {
  if (!questions || !Array.isArray(questions)) return null;

  return (
    <section>
      <h2>Question List</h2>
      <ul>
        {questions.map((q) =>
          q ? (
            <QuestionItem
              key={q.id}
              question={q}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ) : null
        )}
      </ul>
    </section>
  );
}

export default QuestionList;
