import {
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  VStack
} from '@chakra-ui/react'
import {Field} from '@snek-at/jaen'
import {FC} from 'react'
import {CONTAINER_MAX_WIDTH} from '../../../../constant/sizes'

interface IGroßhandelUpperHeroProps {}

const GroßhandelUpperHero: FC<IGroßhandelUpperHeroProps> = () => {
  return (
    <>
      <Container maxW={CONTAINER_MAX_WIDTH}>
        <VStack
          pos="relative"
          zIndex="1"
          py={{base: '16', md: '44', lg: '52', xl: '56'}}>
          <Heading fontWeight="semibold" size="h5030">
            <Field.Text name="title" label="Titel" defaultValue="Großhandel" />
          </Heading>
          <Heading
            mb="-4 !important"
            fontWeight="semibold"
            size="h5020"
            as="span">
            <Field.Text
              name="subtitle"
              label="Subtitle"
              defaultValue="<p>Werde <i>Ballon-Partner</i></p>"
            />
          </Heading>
          <HStack>
            <Button size={{base: 'sm', md: 'md'}} variant="outline">
              Anmelden
            </Button>
            <Button size={{base: 'sm', md: 'md'}}>Registrieren</Button>
          </HStack>
          <Grid
            right="0"
            pos="absolute"
            top="6.25rem"
            w={{md: '12.5rem', lg: '16.875rem', xl: '20rem'}}
            h="40vh">
            <Field.Image
              name="image"
              label="Image"
              //defaultValue="/images/großhandel/ballon_box.png"
              objectFit="contain"
            />
          </Grid>
        </VStack>
      </Container>
      z
    </>
  )
}
export default GroßhandelUpperHero
