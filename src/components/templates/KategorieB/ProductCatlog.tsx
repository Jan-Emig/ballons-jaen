import {Box, Container, Flex, Heading, Stack, Text} from '@chakra-ui/react'
import {Field} from '@snek-at/jaen'
import {FC} from 'react'
import {CONTAINER_MAX_WIDTH} from '../../../constant/sizes'
import LinkButtonField from '../../fields/LinkButtonField'

interface IProductCatlogProps {}

const ProductCatlog: FC<IProductCatlogProps> = () => {
  return (
    <Container
      maxW={CONTAINER_MAX_WIDTH}
      pos="relative"
      top={{base: '-3rem', md: '-6.25rem', lg: '-12.5rem'}}
      mb={{base: '1rem', md: '-4.25rem', lg: '-10.5rem'}}>
      <Flex gap="12" align="center" flexDir={{base: 'column', lg: 'row'}}>
        <Box
          flex="1"
          w={{base: '70%'}}
          h={{
            base: '30rem',
            sm: '31.25rem',
            md: '35rem',
            lg: '40rem'
          }}>
          <Field.Image
            name="stack_cards"
            label="Image"
            //defaultValue="/images/we_design_party/stack_cards.png"
            objectFit="contain"
          />
        </Box>
        <Box display={{base: 'block', md: 'none'}}>
          <LinkButtonField
            name="catalogueButton"
            defaultValue={'Zum Katalog'}
            defaultUrl={`/products`}
            variant="outline"
          />
        </Box>
        <Stack
          display={{base: 'none', md: 'flex'}}
          flex="1"
          pl={{base: '4rem', xl: '9rem'}}
          pb={{base: '2rem', xl: '5rem'}}
          pt="3.125rem"
          pr="1.25rem"
          bg="white"
          boxShadow="light"
          borderRadius="xl">
          <Heading
            fontSize={{base: 'md', md: 'lg', xl: 'xl'}}
            fontWeight="semibold">
            <Field.Text
              name="cataloguePreTitle"
              label="Titel"
              defaultValue={'Katalog'}
            />
          </Heading>
          <Heading
            fontSize={{base: 'md', md: 'xl', lg: '2xl', xl: '3xl'}}
            fontWeight="semibold">
            <Field.Text
              name="catalogueTitle"
              label="Titel"
              rtf
              defaultValue="<p>Unsere <i>Kataloge</i></p>"
            />
          </Heading>
          <Text fontSize={{base: 'sm', lg: 'md'}} as="span">
            <Field.Text
              name="catalogueText"
              label="Text"
              defaultValue={
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quibusdam, atque iusto culpa libero nostrum sit fuga cumque sunt tenetur! Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
              }
            />
          </Text>
          <Box>
            <LinkButtonField
              name="catalogueButton"
              defaultValue={'Zum Katalog'}
              defaultUrl={`/products`}
              size="sm"
              variant="outline"
              mt="4"
            />
          </Box>
        </Stack>
      </Flex>
    </Container>
  )
}
export default ProductCatlog
