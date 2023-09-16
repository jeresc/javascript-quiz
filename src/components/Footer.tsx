import { useQuestionsData } from '@/hooks/useQuestionsData'
import { useQuestionsStore } from '@/store/questions'
import { Button } from '@mui/material'

function Footer() {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <footer style={{ textAlign: 'center', marginTop: '16px' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={reset}>Reiniciar juego</Button>
      </div>
    </footer>
  )
}

export default Footer
