import axios from 'axios'
import { Box, Center, Flex, Heading,Stack, HStack, Link, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import SongForm from './song_form'
import DiscoArtist from './disco_artist'
import Lyrics from './lyrics'
import StateHandler from './state_handler'
import { UnlockIcon } from '@chakra-ui/icons'

type T_State = {
  loading: boolean
  responses: Array<any> | null
  error: null
  lyric: string
  disco: string
};

export default function SongAPI() {
  const [search, setSearch] = useState(null)
  const [state, setState] = useState<T_State>({
    loading: false,
    responses: [],
    error: null,
    lyric: '',
    disco: '' 
  })


  useEffect(() => {
    if (search === null) return
    const getInfo = async () => {
      const { artist, song } = search
      let url_artist =`https://www.theaudiodb.com/api/v1/json/2/discography.php?s=${artist}`
      let url_lyric =`https://cors-anywhere.herokuapp.com/http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=${artist}&song=${song}`
      // let url_lyric2=`https://proxy.cors.sh/http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=${artist}&song=${song}`
      const reqOne = axios.get(url_artist)
      const reqTwo = axios.get(url_lyric, {responseType: 'document'})
      // const reqTwo2 = axios.get(url_lyric2, {responseType: 'document'})

         
      axios.all([reqOne, reqTwo ]).then(axios.spread((...responses) => {
        console.log(responses)
        const res_album = responses[0].data.album
        const res_lyric = responses[1].data.all[10].textContent
        setState({ loading: false, responses, error: null, disco:res_album, lyric:res_lyric })
      })).catch((errors) => {
        setState({ loading: false, responses: null, error: errors, disco:'', lyric:''})
        console.log('Errores:', errors)
      })
      
    }
    getInfo()
  }, [search])

  const handleSearch = (data: any) => {
    setState({ loading: true, responses: null, error: null, disco:'', lyric:'' })
    setSearch(data)
  }
  return (
    <>
      <Flex
        bg={'#c2c9e2'}
        pl={'12px'}
        borderWidth={'2px'}
        borderColor={'#7c899f'}
      >
        <Center textShadow={'1px 1px #423e56'}>𝕀𝕜𝕒𝕜𝕒𝕃𝕪𝕣𝕚𝕔𝕤</Center>
        <Spacer />
          <Center mr={'10px'} >
          <Link href='https://cors-anywhere.herokuapp.com/corsdemo' isExternal>
            <UnlockIcon w={6} h={6} />
          </Link>
          </Center>
        <SongForm handleSearch={handleSearch} />
      </Flex>
        <StateHandler
          showError={state.error}
          showLoader={state.loading}
          showEmpty={state.responses?.length == 0}
        >
          <Stack flexDirection={'row'}>
          <Center w="50%" h="50%" pt={'15px'} flexDirection='column'>
           <Heading as={"h3"} size="md">Discografia</Heading>
            {<DiscoArtist disco={state.disco} />}
          </Center>
          <Center w="50%" h="50%" pt={'15px'} flexDirection='column' textAlign={'center'}>
           <Heading as={"h3"} size="md" marginBottom={'10px'}>Lyric</Heading>
            {<Lyrics lyric={state.lyric} />}
          </Center>
          </Stack>
        </StateHandler>
    </>
  )
}