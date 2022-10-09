import { Container, Text } from '@chakra-ui/react'

export default function Lyrics(props:any){
  return(
    <>
      <Container>
        <Text whiteSpace={'pre-line'}>
        {props.lyric}
        </Text>
      </Container>
     </>
  )
}
