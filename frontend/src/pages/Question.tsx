import { useEffect, useState } from "react";
import GeminiHint from "../component/geminiHint";
import SquareBox from "../component/QuestionSquareBox";
import { Bookmark, BookmarkMinus, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookmarkStore } from "@/hooks/useBookmarkStore";
import { API_URL } from "@/config/env";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";


export default function Questions(props: any) {
  interface Question {
    questionDiagram: string;
    _id: string;
    question: string;
    option: string[];
    answer: string[];
    subject: string;
    year: number;
    examType: string[];
    difficulty: string[];
    tags: string[];
  }
  const {
    bookmarks,
    bookmarkQuestions,
    fetchBookmarks,
    fetchBookmarkQuestion,
    removeBookmark,addBookmark
  } = useBookmarkStore();

    useEffect(() => {
    const loadData = async () => {
      await fetchBookmarks();
      await fetchBookmarkQuestion();
    };
    loadData();
  }, []);


  type Status = "notVisited" | "notAnswered" | "answered" | "review" | "answeredReview";
  const [answered, setAnswered] = useState(0);
  const [notAnswered, setNotAnswered] = useState(0);
  const [status, setStatus] = useState<Status[]>([]);
  const [isBookmark , setIsBookmark] = useState(false);

  function markForReview(qIndex: number) {
    setStatus((prev) => {
      const newStatus = [...prev];
      const current = newStatus[qIndex];
      if (current === "answered") {
        newStatus[qIndex] = "answeredReview";
      } else {
        newStatus[qIndex] = "review";
      }                                                              
      return newStatus;
    });
  }


  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const question = questions[index];


  const [answers, setAnswers] = useState<{ [key: string]: string[] }>({});
 const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("userAnswers");
    if (!saved) return;

    const parsed = JSON.parse(saved);
    const expiry = parsed.timestamp + 3 * 60 * 60 * 1000;

    if (Date.now() < expiry) {
      setAnswers(parsed.data);
      setRemainingTime(expiry - Date.now());
    } else {
      localStorage.removeItem("userAnswers");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "userAnswers",
      JSON.stringify({ data: answers, timestamp: Date.now() })
    );
    setRemainingTime(3 * 60 * 60 * 1000);
  }, []);

  useEffect(() => {
    if (remainingTime === null) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => (prev && prev > 1000 ? prev - 1000 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };
  let d = Date.now();
  let a = Math.floor(d/1000)

  useEffect(() => {
    fetch(`${API_URL}/api/v1/user/questions`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.importQuestions)
        setStatus(Array(data.importQuestions.length).fill("notVisited"));

      })
      .catch((err) => console.error(err));

  }, [props.subj]);


  const handleChange = (e: any, questionId: string, qIndex: number) => {
    const value = e.target.value;

    setAnswers((prev) => {
      const prevAns = prev[questionId] || [];
      let updated: string[];
      if (e.target.checked) {
        updated = [...prevAns, value];
      } else {
        updated = prevAns.filter((v) => v !== value);
      }
      setStatus((prev) => {
        const newStatus = [...prev];
        if (updated.length > 0) {
          newStatus[qIndex] = "answered";
        } else {
          newStatus[qIndex] = "notAnswered";

        }


        return newStatus;
      });

      return { ...prev, [questionId]: updated };
    });
  };



  let correctCount = 0;
  const handleSubmit = async () => {
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const selected = answers[q._id] || [];
      const isCorrect =
        q.answer.length === selected.length &&
        q.answer.every((ans) => selected.includes(ans));
      if (isCorrect) correctCount++;

      handleAttemtQuestion(
        q.question,
        selected,
        q.questionDiagram,
        q.answer,
        q.subject,
        isCorrect ? "solved" : "attempt",
        q.tags,
        "2m"
      );

    }
    alert(`you got ${correctCount} out of ${questions.length}  correct!`)

    localStorage.removeItem("userAnswers");
  };

  async function handleAttemtQuestion(
    question: string,
    userAnswer: string[],
    questionDiagram: string,
    answer: string[],
    subject: string,
    status: string,
    tags: string[],
    timetaken: string
  ) {
    try {
      const res = await fetch(
        `${API_URL}/api/v1/user/attempt/question`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            questionDiagram,
            userAnswer,
            answer,
            subject,
            status,
            tags,
            timetaken
          })
        }
      );
      const data = res.json();
      console.log("Data is :   ", data);
    } catch (e) {
      console.log(e);
    }
  }
  const [markedForReview, setMarkedForReview] = useState(0);
useEffect(() => {
  let answeredCount = 0;
  let notAnsweredCount = 0;
  let reviewCount = 0;

  for (let i = 0; i < status.length; i++) {
    if (status[i] === "answered") {
      answeredCount++;
    } 
    else if (status[i] === "notAnswered") {
      notAnsweredCount++;
    } 
    else if (status[i] === "review") {
      reviewCount++;
    }
  }

  setAnswered(answeredCount);
  setNotAnswered(notAnsweredCount);
  setMarkedForReview(reviewCount);

}, [status]); 
  const id = localStorage.getItem('StudentID');
 
  
 return (
  <div className="w-full h-full">

    <div className="flex items-center justify-between px-4 py-2 md:hidden border-b">
      <div>
        <h1 className="text-sm font-semibold">Questions {index + 1}</h1>
        {remainingTime !== null && remainingTime > 0 && (
          <p className="text-xs text-gray-500">
            Expires in: {formatTime(remainingTime)}
          </p>
        )}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[85vw]">
          <SheetHeader>
            <SheetTitle>Questions</SheetTitle>
          </SheetHeader>

          <div className="mt-4 grid grid-cols-5 gap-2 overflow-y-auto">
            {questions.map((_, i) => (
              <SquareBox
                key={i}
                num={i + 1}
                state={status[i]}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <div className="mt-4 text-sm">
            Answered: {answered} <br />
            Not answered: {notAnswered} <br />
            Marked: {markedForReview}
          </div>
        </SheetContent>
      </Sheet>
    </div>

    <div className="flex justify-center gap-4 px-2 md:px-4">

      <div className="w-full md:w-1/2">

        <div className="hidden md:block">
          <h1>Answers Auto-Save with Expiry</h1>
          {remainingTime !== null && remainingTime > 0 ? (
            <p>Expires in: {formatTime(remainingTime)}</p>
          ) : (
            <p>No saved answers or expired</p>
          )}

          <div className="flex justify-around items-center">
            <h1 className="text-2xl font-bold">
              Questions {index + 1}
            </h1>

            {bookmarks.includes(question?._id) ? (
              <Bookmark fill="" onClick={() => removeBookmark(question?._id)} />
            ) : (
              <Bookmark onClick={() => addBookmark(question?._id)} />
            )}
          </div>
          <hr className="border-t-2 border-gray-400" />
        </div>

        <div className="h-[60vh] md:h-96 overflow-y-auto">
          {question && (
            <div key={question._id} className="p-3 space-y-3">
              <p className="font-semibold">{question.question}</p>

              {props.mode === "practice" && (
                <GeminiHint
                  prompt={`${question.question} hint with formula in 5-8 words`}
                />
              )}

              {question.questionDiagram && (
                <img
                  src={question.questionDiagram}
                  className="max-h-60 mx-auto"
                />
              )}

              <div className="mt-2">
                {question.option.map((opt, i) => (
                  <div key={i}>
                    <input
                      type="checkbox"
                      id={`q-${question._id}-${i}`}
                      value={opt}
                      checked={answers[question._id]?.includes(opt) || false}
                      onChange={(e) =>
                        handleChange(e, question._id, index)
                      }
                      className="peer hidden"
                    />

                    <label
                      htmlFor={`q-${question._id}-${i}`}
                      className="flex items-center gap-3 w-full p-4 mb-3 border-2 rounded-lg cursor-pointer
                      peer-checked:bg-blue-300 peer-checked:border-blue-300"
                    >
                      {opt}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <button
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
            className="border px-4 py-2"
          >
            Previous
          </button>

          <button
            disabled={index === questions.length - 1}
            onClick={() => setIndex(index + 1)}
            className="border px-4 py-2"
          >
            Next
          </button>

          <button
            className="border px-4 py-2"
            onClick={() => markForReview(index)}
          >
            Mark for review
          </button>

          <button
            className="border px-4 py-2"
            onClick={handleSubmit}
          >
            Submit test
          </button>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="grid grid-cols-6 gap-2 w-[30vw] h-[30vh] bg-gray-100 p-3 overflow-y-auto">
          {questions.map((_, i) => (
            <SquareBox
              key={i}
              num={i + 1}
              state={status[i]}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <div className="mt-2 text-sm">
          Answered: {answered}, Not answered: {notAnswered},
          Marked: {markedForReview}
        </div>
      </div>
    </div>
  </div>
);

}