import { useQuestionsData } from '@/hooks/useQuestionsData'

function Footer() {
  const { correct, incorrect, unanswered } = useQuestionsData()

  return (
    <footer style={{ textAlign: 'center', marginTop: '16px' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
    </footer>
  )
}

export default Footer
