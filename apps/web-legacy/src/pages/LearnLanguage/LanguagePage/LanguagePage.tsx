import { Loader } from "../../../components";
import { LessonModal } from "../../../modals";
import {
  LanguagePageNavBar,
  ControlButtons,
  Exercise,
} from "../../../components";
import { useLessonLogic } from "../../../hooks/useLessonLogic";
import ZeroLivesModal from "../../../modals/ZeroLives/ZeroLivesModal";
import LessonCompletePage from "../../../modals/LessonCompleteModal/LessonCompleteModal";
import { useQuiz } from "../../../context/QuizContext";
import "./LanguagePage.css";

const LanguagePage = () => {
  const {
    modalOn,
    selectedOption,
    hasAnswered,
    lives,
    content,
    loading,
    error,
    currentQuestion,
    qIndex,
    totalQuestions,
    hasNextQuestion,
    nextUrl,
    setSelectedOption,
    handleModal,
    closeModal,
    checkAnswer,
  } = useLessonLogic();

  if (lives <= 0) return <ZeroLivesModal />;
  if (loading) return <Loader />;
  if (error || !content || !currentQuestion) {
    return <div>Error loading lesson: {error || "Question not found"}</div>;
  }

  const { state: quizState } = useQuiz();

  return (
    <div className='languagePageContainer'>
      <LanguagePageNavBar
        onSettingsClick={handleModal}
        total={totalQuestions}
        current={qIndex + 1}
      />
      
      <Exercise 
        question={currentQuestion}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />

      <ControlButtons
        selectedOption={selectedOption}
        unitId={""}
        nextQuestionId={nextUrl}
        checkAnswer={checkAnswer}
      />
      {!hasNextQuestion && hasAnswered && (
        <LessonCompletePage 
          total={totalQuestions} 
          correct={quizState.totalCorrect} 
        />
      )}
      {modalOn && <LessonModal onClose={closeModal} />}
    </div>
  );
};

export default LanguagePage;
