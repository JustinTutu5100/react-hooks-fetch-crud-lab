import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) setQuestions(data);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main>
      <h1>Quiz Questions</h1>
      <button onClick={() => setShowQuestions(true)}>View Questions</button>
      {showQuestions && (
        <QuestionList
          questions={questions}
          onDelete={(id) =>
            setQuestions((prev) => prev.filter((q) => q.id !== id))
          }
          onUpdate={(updatedQ) =>
            setQuestions((prev) =>
              prev.map((q) => (q.id === updatedQ.id ? updatedQ : q))
            )
          }
        />
      )}
    </main>
  );
}

export default App;
