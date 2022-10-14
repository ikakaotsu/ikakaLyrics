import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Box,
  Spinner,
} from '@chakra-ui/react'

export default function StateHandler(props: any) {
  const {
    showLoader = false,
    showError = false,
    showEmpty = false,
  } = props

  if (showLoader) return <Center w={'100%'} h='calc(100vh)'><Spinner size={'xl'} /></Center> 
  if (showError) {
    return (
      <Alert status="error" justifyContent={'center'}>
        <AlertIcon />
        <AlertTitle>Artist or Lyric not found!</AlertTitle>
        <AlertDescription>
          Cors are enabled? Hit the 🔓and enabled it, next return the page
        </AlertDescription>
      </Alert>
    )
  }
  if (showEmpty) {
    return (
      <Alert status="warning" justifyContent={'center'}>
        <AlertIcon />
        <AlertTitle>No Lyrics to Show</AlertTitle>
        <AlertDescription>
          Hit the search icon and find the lyric.
        </AlertDescription>
      </Alert>
        
    )
  }
  return props.children
}
