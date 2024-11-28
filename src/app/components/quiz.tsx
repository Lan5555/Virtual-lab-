'use client';
import { faBars, faBook, faClock, faClose, faCompass, faGear, faHistory, faInfo, faInfoCircle, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import AnimatedText from "./movingtext";
import { useRouter } from "next/navigation";
import { useTimer } from "react-timer-hook";

interface Option {
  text: string;
  correct: boolean;
}

interface Question {
  subject: string;
  question: string;
  options: Option[];
  timeLimit?: number;
}

const Quzzies: React.FC<{ questions: Question[] }> = ({ questions }) => {
  const [viewport, setViewport] = useState('desktop');
  const [state, setState] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [waiting, isFinished] = useState(false);
  const router = useRouter();
  const updateMediaQuery = () => {
    if (window.matchMedia('(max-width: 600px)').matches) {
      setViewport('mobile');
    } else if (window.matchMedia('(max-width: 768px)').matches) {
      setViewport('tablet');
    } else {
      setViewport('desktop');
    }
  };

  useEffect(() => {
    updateMediaQuery();
    window.addEventListener('resize', updateMediaQuery);
    return () => window.removeEventListener('resize', updateMediaQuery);
  }, []);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    const correctOption = currentQuestion.options.find(option => option.correct);
    if (correctOption?.text === answer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer('');
    }
  };

  
  const toggleToast = () => {
    isFinished(true);
  }
  
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 300);
  const {
    seconds,
    minutes,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire:() => {
        toggleToast();
    },
  })
  
  const showToast = () => {
    return (
        <div>
            <div style={{
                position:'absolute',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)',
                boxShadow:'var(--shadow-box)',
                width: viewport == 'desktop'? '30%' : '60%',
                height:'300px',
                padding:'10px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                borderRadius:'20px',
                flexDirection:'column',
                gap:'10',
                 background: 'linear-gradient(to right, blueviolet, black)'
                
            }} >
              <h2 className="text-center text-white">Quiz Over<br></br>Score:{score}</h2>
              <p className="text-white">Points earned: {score == 0 ? 0 : (score / 100) + 2}</p>
              <button className="p-1 bg-purple-500 rounded-lg w-28 h-8 text-white hover:bg-slate-400 border-none cursor-pointer absolute bottom-3 right-4" onClick={()=>{
                router.push('/pages/lab')}
            }>Exit</button>
            </div>
            
        </div>
    )
  }

  

  const showBar = () => {
    return (
      <div>
        <div className="w-60 h-screen shadow-2xl z-10 bg-transparent fixed top-0" style={{
          transition: 'right 0.3s ease-in-out',
          right: state ? '0px' : '-400px',
          zIndex:'5'
          
        }}>
          <div className="h-44 w-full shadow-2xl rounded-bl-3xl flex justify-center items-center bg-slate-600">
            <FontAwesomeIcon icon={faClose} className="absolute top-3 left-2 hover:text-green-400 cursor-pointer text-slate-300" onClick={() => {
              setState(prev => !prev);
            }}></FontAwesomeIcon>
            <AnimatedText text={currentQuestion.subject} position={undefined} size={undefined} icon={undefined}></AnimatedText>
          </div>
          <div className="grid gap-1 p-6 ml-5 mt-5">
            <div className="flex gap-2">
              <FontAwesomeIcon icon={faHistory} className="text-slate-300"/>
              <p className="text-white select-none hover:text-blue-600 cursor-pointer relative bottom-4">Score</p>
            </div>
            <div className="flex gap-2">
              <FontAwesomeIcon icon={faGear} className="text-slate-300"/>
              <p className="text-white text-none select-none hover:text-blue-600 cursor-pointer relative bottom-4">Settings</p>
            </div>
            <div className="flex gap-2">
              <FontAwesomeIcon icon={faClock} className="text-slate-300"></FontAwesomeIcon>
              <p className="text-white relative bottom-4 cursor-default">Time left:{minutes}:{seconds < 10 ? `0${seconds}`:seconds}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-2xl w-11/12 h-5/6 shadow-2xl gap-3 hover:shadow-slate-500 p-5" style={{backdropFilter:'blur(20px)'}}>
        <header className="flex p-2">
          {viewport === 'desktop' ? (
            <FontAwesomeIcon icon={faBook} className="relative left-52 text-white" style={{
              height: '25px'
            }} />
          ) : null}
          {viewport === 'desktop' ? (
            <h2 className="relative left-56 bottom-5 text-xl">{`Subject: ${currentQuestion.subject}`}</h2>
          ) : null}
          {viewport === 'desktop' ? (
            <div className="flex gap-2 absolute right-72">
              <button className="p-1 bg-black rounded-lg w-28 h-8 text-white hover:bg-slate-400 border-none cursor-pointer">
                <FontAwesomeIcon icon={faCompass} />
                &nbsp; Data
              </button>
              <button className="p-1 bg-black rounded-lg w-28 h-8 text-white hover:bg-slate-400 border-none cursor-pointer">
                <FontAwesomeIcon icon={faGear} />
                &nbsp; Settings
              </button>
              <div className="flex relative left-32">
                <FontAwesomeIcon icon={faClock} />
                <p className="relative bottom-4 ml-2 text-white">Time left:{minutes}:{seconds < 10 ? `0${seconds}`:seconds}</p>
              </div>
            </div>
          ) : (
            <FontAwesomeIcon icon={faBars} className="absolute right-10 text-white" onClick={() => {
              setState(prev => !prev);
            }} />
          )}
        </header>
        {showBar()}

        <div className="overflow-auto p-4">
          <p className="ml-8 text-white text-lg">{currentQuestion.question}</p>
        </div>

        <div className="mt-4 ml-16">
          {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name="item"
                value={option.text}
                onChange={() => handleAnswerSelection(option.text)}
                checked={selectedAnswer === option.text}
              />
              <label htmlFor={`option-${index}`} className="text-white">{option.text}</label>
              <br /><br />
            </div>
          ))}
        </div>

        {selectedAnswer && (
          <div className="absolute w-52 h-40 bottom-24 right-5 rounded-xl grid place-items-center gap-0 p-2 animate-pulse" style={{
            background: 'linear-gradient(to right, blueviolet, black)',
            zIndex: '5',
            overflow: 'none'
          }}>
            <FontAwesomeIcon icon={faWaveSquare} className="text-white animate-pulse" />
            <button className="p-1 bg-purple-500 rounded-xl w-28 h-8 text-white hover:bg-slate-400 border-none cursor-pointer" onClick={prevQuestion}>Previous</button>
            <button className="p-1 bg-purple-500 rounded-xl w-28 h-8 text-white hover:bg-slate-400 border-none cursor-pointer" onClick={nextQuestion}>Next</button>
          </div>
        )}
        {waiting && showToast()}
      </div>
    </div>
  );
}

export default Quzzies;
