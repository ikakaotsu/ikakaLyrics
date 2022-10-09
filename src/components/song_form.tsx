import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

type FormValues = {
  artist: string;
  song: string;
};

export default function SongForm({ handleSearch }: any) {
  const { handleSubmit, register, formState: { errors, isSubmitting } } =
    useForm<FormValues>()

  const { isOpen, onClose, onOpen } = useDisclosure()

  function onSubmit(values: any) {
    handleSearch(values)
  }
  return (
    <>
      <IconButton
        aria-label="Search Song"
        icon={<SearchIcon />}
        onClick={onOpen}
        marginRight={'4px'}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Search Artist and Song
            </DrawerHeader>
            <DrawerBody>
              <Stack>
                <Box>
                  <FormControl isInvalid={errors.artist ? true : false}>
                    <FormLabel htmlFor="artist">Artist</FormLabel>
                    <Input
                      id="artist"
                      placeholder="Please enter an Artist"
                      {...register('artist', {
                        required: 'Campo Requerido',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.artist && errors.artist.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isInvalid={errors.song ? true : false}>
                    <FormLabel htmlFor="song">Song</FormLabel>
                    <Input
                      id="song"
                      placeholder="Please enter a Song"
                      {...register('song', {
                        required: 'Campo Requerido',
                      })}
                    />
                    <FormErrorMessage>
                      {errors.song && errors.song.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting} onClick={onClose}>
                Search
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  )
}
