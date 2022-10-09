import { List, ListItem } from '@chakra-ui/react'

export default function DiscoArtist(props: any) {
  const disco = props.disco
  return (
    <List>
      {disco.map((disk: any, index: number) => (
        <ListItem
          key={index}
          px={4}
          py={2}
        >
          {disk.strAlbum}
        </ListItem>
      ))}
    </List>
  )
}
