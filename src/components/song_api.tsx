import axios from 'axios'
import { Center, Flex, HStack, Spacer } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import SongForm from './song_form'
import DiscoArtist from './disco_artist'
import Lyrics from './lyrics'
import StateHandler from './state_handler'

type T_State = {
  loading: boolean;
  responses: Array<any> | null;
  error: null;
};

export default function SongAPI() {
  // const [search, setSearch] = useState(null)
  const [search, setSearch] = useState(null)
  const [disco, setDisco] = useState([])
  const [lyric, setLyric] = useState('')
  const [state, setState] = useState<T_State>({
    loading: false,
    responses: [],
    error: null,
  })

  useEffect(() => {
    if (search === null) return
    const getInfo = async () => {
      const { artist, song } = search
      let url_artist =
        `https://www.theaudiodb.com/api/v1/json/2/discography.php?s=${artist}`
      let url_lyric =
        // `http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=${artist}&song=${song}`
      // `https://cors-anywhere.herokuapp.com/http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=${artist}&song=${song}`
      `https://cors-proxy.htmldriven.com/?url=http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=${artist}&song=${song}`
      const reqOne = axios.get(url_artist)
      const reqTwo = axios.get(url_lyric, {
        responseType: 'document'
      })

      axios.all([reqOne, reqTwo]).then(axios.spread((...responses) => {
        const res_album = responses[0].data.album
        const res_lyric = responses[1].data.all[10].textContent
        console.log(res_lyric)
        setState({ loading: false, responses, error: null })
        setDisco(res_album)
        setLyric(res_lyric)
      })).catch((errors) => {
        setState({ loading: false, responses: null, error: errors })
        console.log('Errores:', errors)
      })
    }
    getInfo()
  }, [search])

  const handleSearch = (data: any) => {
    setState({ loading: true, responses: null, error: null })
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
        <Center textShadow={'1px 1px #423e56'}>𝕀𝕂𝔸𝕂𝔸𝕆𝕋𝕊𝕌</Center>
        <Spacer />
        <SongForm handleSearch={handleSearch} />
      </Flex>
      <HStack alignItems={'initial'}>
        <StateHandler
          showError={state.error}
          showLoader={state.loading}
          showEmpty={state.responses?.length == 0}
        >
          <Center w="50%" h="50%" pt={'15px'}>
            {<DiscoArtist disco={disco} />}
          </Center>
          <Center w="50%" h="50%" pt={'15px'}>
            {<Lyrics lyric={lyric} />}
          </Center>
        </StateHandler>
      </HStack>
    </>
  )
}
