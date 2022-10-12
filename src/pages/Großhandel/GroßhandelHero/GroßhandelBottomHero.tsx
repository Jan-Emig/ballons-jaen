import { Flex, Text, Heading, Image, Grid } from '@chakra-ui/react';
import { CONTAINER_MAX_WIDTH } from 'constant/sizes';
import { FC } from 'react';

interface IGroßhandelBottomHeroProps {}

const GroßhandelBottomHero: FC<IGroßhandelBottomHeroProps> = () => {
  return (
    <Flex
      pos="relative"
      h={{ base: '50rem', sm: '45rem', md: '55rem', xl: '60rem', '2xl': '65rem' }}
      zIndex="0"
      top={{ base: '-20rem', md: '-30rem' }}
      mb={{ base: '-20rem', md: '-30rem' }}
      bgImage="url('/images/großhandel/großhandel_bg.svg')"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="cover">
      <Flex
        align="end"
        w="full"
        pb={{ base: '8', md: 20 }}
        mx="auto"
        maxW={CONTAINER_MAX_WIDTH}
        px="4">
        <Flex
          justify="space-between"
          gap={{ base: '4', md: '16' }}
          w="full"
          flexDir={{ base: 'column', md: 'row' }}>
          <Flex align={{ base: 'end', md: 'start' }} maxW="40rem" flex="1">
            <Heading size="h4015" flex="1">
              Entdecken Sie die Vielfalt an Motiven und die vielfältige Anwendbarkeit der Ballons,
              um Ihr Sortiment speziell auf Ihre KundInnen abzustimmen.
            </Heading>
            <Grid display={{ base: 'grid', md: 'none' }} w={{ base: '8rem' }}>
              <Image src="/images/großhandel/ballon_box.png" />
            </Grid>
          </Flex>
          <Text size="b2015" maxW="37.5rem" flex="1">
            Ob Sie einen Ballonshop starten möchten, einen Teil Ihres Geschäftes einer neuen Branche
            widmen oder nur eine bisher unbespielte Wand ausstatten möchten – wir sind Ihre Partner
            dafür. Suchen Sie als Dekorateur für Hochzeiten, Kinderparties oder Corporate Events die
            “very best balloons”, die Ihren Namen wirklich verdienen.
            <br />
            <br />
            <Text as="span" display={{ base: 'none', lg: 'inline-block' }}>
              Als Marktfahrer suchen Sie nach Motiven, die Kinder magisch anziehen und die im
              Augenblick im Trend liegen.
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default GroßhandelBottomHero;
