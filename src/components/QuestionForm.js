import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const newQuestion = { prompt, answers, correctIndex: parseInt(correctIndex) };
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then(onAddQuestion);
    setPrompt("");
    setAnswers(["", "", "", ""]);
    setCorrectIndex(0);
  }

  function handleAnswerChange(index, value) {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Question</h2>
      <label>
        Prompt
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} required />
      </label>
      {answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}
          <input
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            required
          />
        </label>
      ))}
      <label>
        Correct Answer
        <select value={correctIndex} onChange={(e) => setCorrectIndex(e.target.value)}>
          {[0,1,2,3].map((i) => (
            <option key={i} value={i}>{i+1}</option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
