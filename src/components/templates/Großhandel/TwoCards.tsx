import {Box, Container, Image} from '@chakra-ui/react'
import {FC} from 'react'
import {CONTAINER_MAX_WIDTH} from '../../../constant/sizes'
import HorizontalImageCard from '../../organisms/HorizontalImageCard'

interface ITwoCardsProps {}

const TwoCards: FC<ITwoCardsProps> = () => {
  return (
    <>
      <Box
        pos="relative"
        overflow="hidden"
        pb={{md: '10', xl: 8}}
        pt={{base: '16', lg: 48}}>
        <Image
          display={{base: 'none', md: 'block'}}
          src="/images/großhandel/card_line.svg"
          pos="absolute"
          top="0"
          w="full"
        />
        <Container
          maxW={CONTAINER_MAX_WIDTH}
          pos="relative"
          mb={{base: '16 !important', md: '0'}}>
          <HorizontalImageCard
            card={{
              tagFieldName: 'wholeSaleCardTag1',
              tagDefaultValue: 'PRODUKTE',
              titleFieldName: 'wholeSaleCardTitle1',
              titleDefaultValue: '<p>Unsere <i>Kataloge</i></p>',
              descriptionFieldName: 'wholeSaleCardDescription1',
              descriptionDefaultValue:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et do',
              imageFieldName: 'wholeSaleCardImage1',
              imageDefaultValue: '/images/großhandel/img1.png',
              buttonTextFieldName: 'wholeSaleCardButtonTextField1',
              buttonTextFieldDefaultValue: 'Zum Shop'
            }}
            orientation="left"
          />
        </Container>
      </Box>
      <Box pt={{'2xl': 16}} pb="10" pos="relative" overflow="hidden">
        <Image
          display={{base: 'none', md: 'block'}}
          src="/images/großhandel/shape2.svg"
          pos="absolute"
          top="0"
          right="0"
          w="25%"
          transform="rotate(270deg)"
        />
        <Container maxW={CONTAINER_MAX_WIDTH} pos="relative">
          <HorizontalImageCard
            card={{
              tagFieldName: 'wholeSaleCardTag2',
              tagDefaultValue: 'PRODUKTE',
              titleFieldName: 'wholeSaleCardTitle2',
              titleDefaultValue: '<p><i>Rund</i> umsteigen</p>',
              descriptionFieldName: 'wholeSaleCardDescription2',
              descriptionDefaultValue:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et do',
              imageFieldName: 'wholeSaleCardImage2',
              imageDefaultValue: '/images/großhandel/img1.png',
              buttonTextFieldName: 'wholeSaleCardButtonTextField2',
              buttonTextFieldDefaultValue: 'Mehr erfahren'
            }}
            orientation="right"
          />
        </Container>
      </Box>
    </>
  )
}
export default TwoCards
