import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../../components";
import { LessonModal } from "../../../modals";
import {
  LanguagePageNavBar,
  QuestionDisplay,
  QuestionDisplay2,
  QuestionDisplay3,
  QuestionDisplay4,
  LanguagePageNotification,
  ControlButtons,
} from "../../../components";
import sectionData from "../../../dummydata/sections.json";
import { useLifeline } from "../../../context/LifelineContext";
import "./languagepage.css";
import ZeroLivesModal from "../../../modals/zerolives/ZeroLivesModal";
import LessonCompletePage from "../../../modals/lessoncompletemodal/LessonCompletePage";

const LanguagePage = () => {
  const [modalOn, setModalOn] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const { unitId, questionId } = useParams<{
    unitId: string;
    questionId: string;
  }>();
  const { lives, decreaseLife } = useLifeline();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleModal = () => setModalOn(true);
  const closeModal = () => setModalOn(false);

  const handleContinue = () => {
    setAnswerCorrect(false);
    setHasAnswered(false);
    setSelectedOption(null);
  };

  const checkAnswer = () => {
    if (lives > 0) {
      setHasAnswered(true);
      const section = sectionData.find((sec) => sec.id === Number(unitId));
      const question = section?.sectionContent.find(
        (q) => q.id === Number(questionId)
      );
      if (question && selectedOption !== null) {
        const correctAnswer = Number(question.correctAnswer);
        const isAnswerCorrect = Number(selectedOption) === correctAnswer;
        setAnswerCorrect(isAnswerCorrect);
        if (!isAnswerCorrect) {
          decreaseLife();
        }
      }
    }
  };

  if (lives <= 0) {
    return <ZeroLivesModal />;
  }

  const section = sectionData.find((sec) => sec.id === Number(unitId));
  const question = section?.sectionContent.find(
    (q) => q.id === Number(questionId)
  );

  if (!section || !question) {
    console.error(
      `Question not found: unitId=${unitId}, questionId=${questionId}`
    );
    return <div>Question not found</div>;
  }

  const questionType = question?.questiontype;

  const questionIndex = section?.sectionContent.findIndex(
    (q) => q.id === Number(questionId)
  );
  const hasNextQuestion =
    questionIndex !== undefined &&
    questionIndex < section?.sectionContent.length - 1;
  const nextQuestionId = hasNextQuestion
    ? section?.sectionContent[questionIndex + 1]?.id.toString()
    : null;

  if (loading) {
    return <Loader />;
  }

  const renderQuestionDisplay = () => {
    switch (questionType) {
      case "identify":
        return (
          <QuestionDisplay
            question={question}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        );
      case "pronounciation":
        return (
          <QuestionDisplay2
            question={question}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        );
      case "sentence":
        return (
          <QuestionDisplay3
            question={question}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        );
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div className='languagePageContainer'>
      <LanguagePageNavBar onSettingsClick={handleModal} />
      {renderQuestionDisplay()}
      {hasAnswered ? (
        <LanguagePageNotification
          answerCorrect={answerCorrect}
          hasNextQuestion={hasNextQuestion}
          unitId={unitId || ""}
          nextQuestionId={nextQuestionId}
          handleContinue={handleContinue}
        />
      ) : (
        <ControlButtons
          selectedOption={selectedOption}
          unitId={unitId || ""}
          nextQuestionId={nextQuestionId}
          checkAnswer={checkAnswer}
        />
      )}
      {!hasNextQuestion && <LessonCompletePage />}
      {modalOn && <LessonModal onClose={closeModal} />}
    </div>
  );
};

export default LanguagePage;
