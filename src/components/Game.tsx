import { useQuestionsStore } from '@/store/questions'
import Question from './Question'

function Game() {
  const [questions, currentQuestionIndex] = useQuestionsStore((state) => [
    state.questions,
    state.currentQuestionIndex,
  ])

  const questionInfo = questions[currentQuestionIndex]

  return (
    <>
      <Question info={questionInfo} />
    </>
  )
}

export default Game
