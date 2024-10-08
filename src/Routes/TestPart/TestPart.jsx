import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Question from '../../Components/Question/Question';
import { questions } from '../../data/questions';
import './TestPart.css'
import Swal from 'sweetalert2';
import Arrow from '../../Components/Arrow/Arrow';
import { Helmet } from 'react-helmet';

const TestPart = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const part = parseInt(page) || 1;

  const questionsPerPart = 25;
  const startIndex = (part - 1) * questionsPerPart;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPart);

  const savedAnswers = JSON.parse(localStorage.getItem('answers')) || {};
  const [answers, setAnswers] = useState(savedAnswers[part] || {});

  useEffect(() => {
    // Save answers when part changes
    const storedAnswers = JSON.parse(localStorage.getItem('answers')) || {};
    storedAnswers[part] = answers;
    localStorage.setItem('answers', JSON.stringify(storedAnswers));
  }, [answers, part]);

  const handleSelect = (id, letter) => {
    setAnswers(prev => ({ ...prev, [id]: letter }));
  };

  const handleNext = () => {
    if (part < 4) {
      navigate(`/placement-test/test/${part + 1}`);
      window.scrollTo(0, 0)
    } else {
      const finalLevel = englishLevel();
      Swal.fire({
        title: "Good job!",
        text: `Tu nivel de inglés es: ${finalLevel}`,
        icon: "success",
        confirmButtonText: "Volver al inicio"
      }).then(res => {
        if (res.isConfirmed) {
          navigate("/")
        }
      })
      localStorage.removeItem('currentPart');
      localStorage.removeItem('answers');
    }
  };

  const handlePrevious = () => {
    if (part > 1) {
      navigate(`/placement-test/test/${part - 1}`);
    }
  };

  const englishLevel = () => {
    const allAnswers = JSON.parse(localStorage.getItem('answers')) || {};
    let totalCorrect = 0;
    let totalQuestions = 0;

    Object.values(allAnswers).forEach(partAnswers => {
      totalQuestions += Object.keys(partAnswers).length;
      Object.entries(partAnswers).forEach(([questionId, answer]) => {
        const question = questions.find(q => q.id === parseInt(questionId));
        if (question && question.correct_answer === answer) {
          totalCorrect++;
        }
      });
    });

    const score = (totalCorrect / totalQuestions) * 100;

    if (score >= 85) return 'B2';
    if (score >= 70) return 'B1';
    if (score >= 50) return 'A2';
    return 'A1';
  };

  return (
    <>
      <Helmet>
        <title>Test de Colocación - Parte {page} - Kingdom Institute</title>
        <meta name="description" content={`Realiza la parte ${page} de nuestro test de nivelación para conocer tu nivel de inglés.`} />
        <meta name="keywords" content={`test de nivelacion, parte ${page}, Kingdom Institute, inglés`} />
        <meta property="og:title" content={`Test de Nivelacion - Parte ${page} - Kingdom Institute`} />
        <meta property="og:description" content={`Realiza la parte ${page} de nuestro test de Nivelacion.`} />
        <meta property="og:image" content="/images/placement-test-part.jpg" />
      </Helmet>
      <section className='test container'>
        <nav className="navigation">
          <button
            onClick={handlePrevious}
            disabled={part === 1}
            className={part === 1 ? 'disabled prev' : 'prev'}
          >
            <Arrow color={part !== 1 ? '#bebebe' : '#2e2e2e'} direction='left' /> <span className='btn-text'>Anterior</span>
          </button>

          <h3>Parte {part}</h3>

          <button
            onClick={handleNext}
            disabled={part === 4}
            className={part === 4 ? 'disabled next' : 'next'}
          >
            <span className='btn-text'>Siguiente</span> <Arrow color={part !== 4 ? '#bebebe' : '#2e2e2e'} />
          </button>
        </nav>
        <div className='questions'>
          {currentQuestions.map(q => (
            <Question
              key={q.id}
              question={q}
              onSelect={handleSelect}
              selectedAnswer={answers[q.id]}
            />
          ))}
        </div>
        <button onClick={handleNext} className='button'>
          {part === 4 ? 'Finalizar test' : 'Siguiente parte'}
        </button>
      </section>
    </>
  );
};

export default TestPart;
