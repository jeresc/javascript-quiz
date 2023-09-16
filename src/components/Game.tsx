import { useQuestionsStore } from '@/store/questions'
import Question from './Question'
import { IconButton, Stack, Typography } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import Footer from './Footer'

function Game() {
  const [questions, currentQuestionIndex, goNextQuestion, goPreviousQuestion] =
    useQuestionsStore((state) => [
      state.questions,
      state.currentQuestionIndex,
      state.goNextQuestion,
      state.goPreviousQuestion,
    ])

  const questionInfo = questions[currentQuestionIndex]

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
        <Typography variant="h6">
          {currentQuestionIndex + 1} / {questions.length}
        </Typography>
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}

export default Game
