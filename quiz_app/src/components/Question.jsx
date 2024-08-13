import React, {useState, useEffect, UseRef, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  nextQuiz,
  prevQuiz,
  submitQuiz,
  timeOUt,
} from "../redux/actiom/quizAction";
import quizData from "../data/quiz.json"


const Question = () => {
  const dispatch =useDispatch();
  const {activeQuestion, answers, time } = useSelector(
    (state) => state?.quizeReducer
  );
  const [data, setData] = useState(quizData?.data[activeQuestion]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("");
  const [timer, setTime] = useState(time);
  const radiosWrapper = useRef();

  useEffect(() => {
    if (time > 0){
      setTimeout(() => setTimer(timer - 1), 1000);
    }else{
      dispatch(timeOUt());
    }
  }, [timer]);
  useEffect (() => {
    setData(quizData?.data[activeQuestion]);
    if (answers[activeQuestion] != undefined) {
      setSelected(answers[activeQuestion].a);
    }
  }, [activeQuestion]);
  const changeHandler = (e) => {
    const value = e.target.value;
    setSelected((pervSelected) => 
      pervSelected.includes(value)
        ? pervSelected.filter((item) => item != value)
        : [...pervSelected, value]
    );
    if (error) {
      setError("");
    }
  };
  const handlePrev = () => {
    setError("");
    dispatch(prevQuiz());
  };

  const hanadleNext = (e) => {
    if (selected.length === 0) {
      return setError("Please select at least one option!");
    }
    let ans = [...answers];
    ans[activeQuestion] = {
      q: data.question,
      a:  selected,
    };
    dispatch(
      nextQuiz({
        answers: ans,
      })
    );
    setSelected([]);
    const findCheckInput = radiosWrapper.current.querrySelector("input:chwcked");
    if (findCheckInput) {
      findCheckInput.checked = false;
    }
  };

  const handleSubmit = () => {
    if (selected.length === 0) {
      return setError("Please select at least one option!");
    }
    dispatch(
      submitQuiz({
        answers: [
          ...answers,
          (answers[activeQuestion] = {
            q: data.question,
            a: selected,
          }),
        ],
        time: time - timer,
      })
    );
  };
};

export default Question;
