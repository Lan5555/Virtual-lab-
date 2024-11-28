'use client'
import Quzzies from "@/app/components/quiz";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const QuizPage:React.FC = () => {
  const [viewport, setViewport] = useState('desktop');
  const [shown, setShown] = useState(false);
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
    const questions = [
        {
          subject: "Math",
          question: "What is 2 + 2?",
          options: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
          ],
          timeLimit: 30,
        },
        {
          subject: "Science",
          question: "What is H2O?",
          options: [
            { text: "Water", correct: true },
            { text: "Oxygen", correct: false },
            { text: "Hydrogen", correct: false },
          ],
          timeLimit: 30,
        },
      ];
      const initialMessage = () => {
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
                <h2 className="text-center text-white"><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> Info</h2>
                <p className="text-center text-white">You are required to complete the quiz within 5minutes.<br></br>Earn rewards while you play!</p>
                <button className="p-1 bg-purple-500 rounded-lg w-28 h-8 text-white hover:bg-slate-400 border-none cursor-pointer absolute bottom-3 right-4" onClick={()=>{
                  setShown(true);
                }
              }>Begin</button>
              </div>
              
          </div>
      )
      }
      const overlay = () => {
        return (
          <div className="h-screen w-screen p-0 m-0 bg-slate-700 flex justify-center items-center">
            <h1 style={{
              fontSize: viewport == 'desktop'? '130pt'
              : viewport == 'tablet' ? '80pt' : '50pt'
            }}>VIRTUAL LAB</h1>
          </div>
        )
      }
    return( 
    <div style={{
      backgroundImage:'url(/misc/competition/images/biology.jpg)',
      backgroundPosition:'center',
      backgroundSize:'cover',
      backgroundRepeat:'no-repeat',
      overflow:'hidden'
    }}>
      {!shown && overlay()}
      {!shown && initialMessage()}
        {shown && (<Quzzies questions={questions} />)}
    </div>
    );
}
export default QuizPage;