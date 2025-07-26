import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => onDelete(id));
  }

  function handleChange(e) {
    const newCorrectIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((r) => r.json())
      .then(onUpdate);
  }

  return (
    <div style={{ border: "1px solid #ccc", margin: "5px", padding: "5px" }}>
      <h3>{prompt}</h3>
      <ul>
        {answers.map((ans, i) => <li key={i}>{ans}</li>)}
      </ul>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {[0,1,2,3].map((i) => (
            <option key={i} value={i}>{i+1}</option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </div>
  );
}

export default QuestionItem;
