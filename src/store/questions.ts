import { create } from 'zustand'
import { Question } from '@/types/types'
import confetti from 'canvas-confetti'
import { persist, devtools } from 'zustand/middleware'
import { getAllQuestions } from '@/services/questions'

interface QuestionsState {
  questions: Question[]
  currentQuestionIndex: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerId: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

{
  /* 
   // Logger middleware example
const logger = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('applying', args)
      set(...args)
      console.log('applied', args)
    },
    get,
    api
  )
*/
}

export const useQuestionsStore = create<QuestionsState>()(
  devtools(
    persist(
      (set, get) => ({
        questions: [],
        currentQuestionIndex: 0,

        fetchQuestions: async (limit: number) => {
          const data = await getAllQuestions()
          const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
          set({ questions }, false, 'FETCH_QUESTIONS')
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get()
          const newQuestions = structuredClone(questions)

          const questionIndex = newQuestions.findIndex(
            (question) => question.id === questionId
          )
          const questionInfo = newQuestions[questionIndex]

          const isUserAnswerCorrect = questionInfo.correctAnswer === answerIndex

          if (isUserAnswerCorrect) confetti()

          newQuestions[questionIndex] = {
            ...questionInfo,
            isUserAnswerCorrect,
            userSelectedAnswer: answerIndex,
          }

          set({ questions: newQuestions }, false, 'SELECT_ANSWER')
        },

        goNextQuestion: () => {
          const { currentQuestionIndex, questions } = get()
          const nextQuestionIndex = currentQuestionIndex + 1

          if (nextQuestionIndex < questions.length) {
            set(
              { currentQuestionIndex: nextQuestionIndex },
              false,
              'GO_NEXT_QUESTION'
            )
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestionIndex } = get()
          const prevQuestionIndex = currentQuestionIndex - 1

          if (prevQuestionIndex >= 0) {
            set(
              { currentQuestionIndex: prevQuestionIndex },
              false,
              'GO_PREVIOUS_QUESTION'
            )
          }
        },

        reset: () => {
          set({ questions: [], currentQuestionIndex: 0 }, false, 'RESET')
        },
      }),
      {
        name: 'questions',
      }
    )
  )
)
