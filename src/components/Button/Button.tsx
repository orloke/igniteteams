import { TouchableOpacityProps, View } from 'react-native'
import { ButtonTypeStyleProps, Container, Title } from './styles'

type Props = TouchableOpacityProps & {
  title: string
  type?: ButtonTypeStyleProps
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Container {...rest} type={type} >
      <Title>{title}</Title>
    </Container>
  )
}
