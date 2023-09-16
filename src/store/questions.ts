import { create } from 'zustand'
import { Question } from '@/types/types'
import confetti from 'canvas-confetti'
import { persist } from 'zustand/middleware'

interface QuestionsState {
  questions: Question[]
  currentQuestionIndex: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerId: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
}

export const useQuestionsStore = create<QuestionsState>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestionIndex: 0,

      fetchQuestions: async (limit: number) => {
        const res = await fetch('http://localhost:5173/data.json')
        const json = await res.json()

        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
        set({ questions })
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

        set({ questions: newQuestions })
      },

      goNextQuestion: () => {
        const { currentQuestionIndex, questions } = get()
        const nextQuestionIndex = currentQuestionIndex + 1

        if (nextQuestionIndex < questions.length) {
          set({ currentQuestionIndex: nextQuestionIndex })
        }
      },

      goPreviousQuestion: () => {
        const { currentQuestionIndex } = get()
        const prevQuestionIndex = currentQuestionIndex - 1

        if (prevQuestionIndex >= 0) {
          set({ currentQuestionIndex: prevQuestionIndex })
        }
      },
    }),
    {
      name: 'questions',
    }
  )
)
