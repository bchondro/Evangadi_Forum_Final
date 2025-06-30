import React, { useEffect, useRef, useState } from 'react';

import { BsPatchQuestionFill } from "react-icons/bs";
import axios from '../../utils/axios';
import classes from './Answer.module.css';
import { useParams } from 'react-router-dom';

function Answer() {
  const { qid } = useParams();
  const [answer, setAnswer] = useState([]);
  const [question, setQuestion] = useState({});
  const answerRef = useRef('');
  const token = localStorage.getItem('token');
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch question and answers
  useEffect(() => {
    (async () => {
      try {
        const question_response = await axios.get(`/questions/${qid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuestion(question_response.data.question);

        const answer_response = await axios.get(`/answers/${qid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnswer(answer_response.data.Answer);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Handle answer posting
  async function postAnswer(e) {
    e.preventDefault();
    const answerValue = answerRef.current.value.trim();

    if (answerValue.length < 6) {
      setErrorMsg("Answer must be at least 6 characters long.");
      return;
    }

    try {
      await axios.post(
        "/answers",
        { answer: answerValue, question_id: qid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      answerRef.current.value = "";
      setErrorMsg("");

      // Refresh answers after posting
      const updatedAnswers = await axios.get(`/answers/${qid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnswer(updatedAnswers.data.Answer);
    } catch (error) {
      console.log(error);
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <div className={classes.main_container}>
      <div className={classes.container}>

        {/* Question Info */}
        <div className={classes.question}>
          <h3 className={classes.title}>
            <BsPatchQuestionFill /> {question?.title}
          </h3>
          <p>Tag: {question?.tag}</p>
          <p>{question?.description}</p>
        </div>

        {/* Recent Answers */}
        <div className={classes.answer}>
          <h3>Recent Answers</h3>

          {answer.length === 0 && (
            <div className={classes.no_answers}>
              <p>No answers yet. Be the first to answer this question!</p>
            </div>
          )}

          <div className={classes.answer_list}>
            {answer.map((item) => {
              const icon = item.username[0].toUpperCase();
              return (
                <div key={item.answer_id}>
                  <div className={classes.single_answer}>
                    <div className={classes.profile}>
                      <div className={classes.avatar}>{icon}</div>
                      <span>{item.username}</span>
                    </div>
                    <p>{item.answer}</p>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>

        {/* Post Answer Form */}
        <div className={classes.post_answer}>
          <h3 className={classes.title}>Answer this question</h3>
          <form onSubmit={postAnswer}>
            <textarea ref={answerRef} placeholder='Describe your answer here!' />
            {errorMsg && <p className={classes.error}>{errorMsg}</p>}
            <button type='submit'>Post Answer</button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Answer;
