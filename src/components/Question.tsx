import { type Question as QuestionType } from '@/types/types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { useQuestionsStore } from '@/store/questions'

interface IProps {
  info: QuestionType
}

const getBrackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info

  if (userSelectedAnswer == null) return 'transparent'

  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent'

  if (index === correctAnswer) return '#4caf50'

  if (index === userSelectedAnswer) return '#f44336'

  return 'transparent'
}

function Question({ info }: IProps) {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card
      variant="outlined"
      sx={{ textAlign: 'left', bgcolor: '#222', p: 2, marginTop: 4 }}
    >
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighlighter language="javascript" style={a11yDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#2b2b2b', overflow: 'hidden' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ bgcolor: getBrackgroundColor(info, index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default Question
