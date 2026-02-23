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

  return (
    <div className='languagePageContainer'>
      <LanguagePageNavBar
        onSettingsClick={handleModal}
        totalQuestions={totalQuestions}
        sectionContent={content.questions as any}
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
      {!hasNextQuestion && hasAnswered && <LessonCompletePage />}
      {modalOn && <LessonModal onClose={closeModal} />}
    </div>
  );
};

export default LanguagePage;
