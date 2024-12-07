'use client'
import HoverBar from "@/app/components/hover-bar";
import Quzzies from "@/app/components/quiz";
import { shuffle } from "@/app/hooks/shuffle";
import { faInfoCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import anime from "animejs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const QuizPage:React.FC = () => {
  const [viewport, setViewport] = useState('desktop');
  const [shown, setShown] = useState(false);
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
    useEffect(()=> {
      anime({
        targets:'.text',
        opacity:[0,1],
        duration:5000,
        easing:'linear',
        delay:anime.stagger(50),
        loop:true
      })
    })
    const questions = [
      // Secondary Level Questions
      {
        subject: "Math",
        question: "What is the value of x in the equation 2x + 3 = 11?",
        options: [
          { text: "4", correct: false },
          { text: "3", correct: true },
          { text: "5", correct: false },
          { text: "6", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Math",
        question: "What is the area of a triangle with base 10 cm and height 5 cm?",
        options: [
          { text: "25 cm²", correct: false },
          { text: "50 cm²", correct: true },
          { text: "15 cm²", correct: false },
          { text: "30 cm²", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Math",
        question: "What is the sum of the angles in a triangle?",
        options: [
          { text: "180°", correct: true },
          { text: "360°", correct: false },
          { text: "90°", correct: false },
          { text: "270°", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Math",
        question: "What is the value of π (pi) to two decimal places?",
        options: [
          { text: "3.14", correct: true },
          { text: "3.13", correct: false },
          { text: "3.15", correct: false },
          { text: "3.12", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Physics",
        question: "Which of the following is the unit of force?",
        options: [
          { text: "Newton", correct: true },
          { text: "Joule", correct: false },
          { text: "Pascal", correct: false },
          { text: "Watt", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Physics",
        question: "What is the acceleration due to gravity on Earth?",
        options: [
          { text: "9.8 m/s²", correct: true },
          { text: "10 m/s²", correct: false },
          { text: "9.6 m/s²", correct: false },
          { text: "8.9 m/s²", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Physics",
        question: "Which of the following is not a form of energy?",
        options: [
          { text: "Heat", correct: false },
          { text: "Light", correct: false },
          { text: "Mass", correct: true },
          { text: "Kinetic", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Physics",
        question: "What is the formula for calculating kinetic energy?",
        options: [
          { text: "KE = mv²", correct: false },
          { text: "KE = 1/2 mv²", correct: true },
          { text: "KE = mgh", correct: false },
          { text: "KE = p²/2m", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Biology",
        question: "What is the primary function of red blood cells?",
        options: [
          { text: "Carry oxygen", correct: true },
          { text: "Fight infection", correct: false },
          { text: "Clot blood", correct: false },
          { text: "Transmit signals", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Biology",
        question: "Which of the following is the largest organ in the human body?",
        options: [
          { text: "Heart", correct: false },
          { text: "Liver", correct: false },
          { text: "Skin", correct: true },
          { text: "Brain", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Biology",
        question: "What is the main function of mitochondria?",
        options: [
          { text: "Produce energy", correct: true },
          { text: "Synthesize proteins", correct: false },
          { text: "Store genetic information", correct: false },
          { text: "Regulate cell division", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Biology",
        question: "What is the process by which plants make food using sunlight?",
        options: [
          { text: "Photosynthesis", correct: true },
          { text: "Respiration", correct: false },
          { text: "Excretion", correct: false },
          { text: "Transpiration", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Chemistry",
        question: "Which of the following elements is a noble gas?",
        options: [
          { text: "Oxygen", correct: false },
          { text: "Neon", correct: true },
          { text: "Nitrogen", correct: false },
          { text: "Carbon", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Chemistry",
        question: "What is the chemical symbol for gold?",
        options: [
          { text: "Au", correct: true },
          { text: "Ag", correct: false },
          { text: "Fe", correct: false },
          { text: "Hg", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Chemistry",
        question: "Which of the following compounds is formed by the reaction of an acid and a base?",
        options: [
          { text: "Salt", correct: true },
          { text: "Water", correct: false },
          { text: "Oxygen", correct: false },
          { text: "Hydrogen", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Chemistry",
        question: "Which of the following is the formula for hydrochloric acid?",
        options: [
          { text: "HCl", correct: true },
          { text: "H₂SO₄", correct: false },
          { text: "HNO₃", correct: false },
          { text: "NaOH", correct: false },
        ],
        timeLimit: 30,
      },
      // Tertiary Level Questions
      {
        subject: "Math",
        question: "What is the derivative of the function f(x) = 3x² + 5x + 2?",
        options: [
          { text: "6x + 5", correct: true },
          { text: "6x + 2", correct: false },
          { text: "3x + 5", correct: false },
          { text: "3x² + 5", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Math",
        question: "What is the integral of f(x) = 2x?",
        options: [
          { text: "x²", correct: false },
          { text: "x² + C", correct: true },
          { text: "2x² + C", correct: false },
          { text: "2x + C", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Math",
        question: "What is the determinant of the matrix [1 2; 3 4]?",
        options: [
          { text: "-2", correct: true },
          { text: "2", correct: false },
          { text: "0", correct: false },
          { text: "4", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Math",
        question: "What is the solution to the quadratic equation x² - 5x + 6 = 0?",
        options: [
          { text: "x = 2, 3", correct: true },
          { text: "x = 1, 6", correct: false },
          { text: "x = 3, 4", correct: false },
          { text: "x = -2, -3", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Physics",
        question: "In Einstein's equation, E = mc², what does 'm' represent?",
        options: [
          { text: "Mass", correct: true },
          { text: "Momentum", correct: false },
          { text: "Energy", correct: false },
          { text: "Force", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Physics",
        question: "What is the principle of conservation of energy?",
        options: [
          { text: "Energy can be created and destroyed", correct: false },
          { text: "Energy is constant and cannot be created or destroyed", correct: true },
          { text: "Energy can only be transformed, not transferred", correct: false },
          { text: "Energy is only conserved in closed systems", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Physics",
        question: "What is the speed of light in a vacuum?",
        options: [
          { text: "3 × 10⁸ m/s", correct: true },
          { text: "3 × 10⁶ m/s", correct: false },
          { text: "3 × 10⁹ m/s", correct: false },
          { text: "3 × 10¹⁰ m/s", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Physics",
        question: "Which of the following is a non-renewable energy source?",
        options: [
          { text: "Wind", correct: false },
          { text: "Solar", correct: false },
          { text: "Coal", correct: true },
          { text: "Hydroelectric", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Biology",
        question: "What is the process by which cells divide to form two identical daughter cells?",
        options: [
          { text: "Mitosis", correct: true },
          { text: "Meiosis", correct: false },
          { text: "Fission", correct: false },
          { text: "Binary fission", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Biology",
        question: "What molecule carries genetic information?",
        options: [
          { text: "RNA", correct: false },
          { text: "DNA", correct: true },
          { text: "Protein", correct: false },
          { text: "Enzyme", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Biology",
        question: "Which of the following organelles is responsible for protein synthesis?",
        options: [
          { text: "Mitochondria", correct: false },
          { text: "Ribosomes", correct: true },
          { text: "Nucleus", correct: false },
          { text: "Golgi apparatus", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Chemistry",
        question: "Which of the following elements has the highest electronegativity?",
        options: [
          { text: "Fluorine", correct: true },
          { text: "Oxygen", correct: false },
          { text: "Chlorine", correct: false },
          { text: "Nitrogen", correct: false },
        ],
        timeLimit: 30,
      },
      {
        subject: "Chemistry",
        question: "Which of the following compounds is an example of an ionic bond?",
        options: [
          { text: "NaCl", correct: true },
          { text: "CO₂", correct: false },
          { text: "H₂O", correct: false },
          { text: "O₂", correct: false },
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
      const shuffledQuestions = shuffle([...questions]);
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
        {shown && (<Quzzies questions={shuffledQuestions} />)}
       {shown && (<HoverBar items={[faSignOutAlt]} iconClass="text-white cursor-pointer"
        runFunc1={()=> router.push('/pages/lab')}
        title="Back to lab"></HoverBar>)}
    </div>
    );
}
export default QuizPage;