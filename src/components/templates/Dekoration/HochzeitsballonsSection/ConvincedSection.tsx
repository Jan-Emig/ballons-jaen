import { Box, Image } from '@chakra-ui/react';
import WhiteBoxWithDashBorder from '../../../WhiteBoxWithDashBorder';
import { FC } from 'react';

interface IConvincedSectionProps {}

const ConvincedSection: FC<IConvincedSectionProps> = () => {
  return (
    <Box>
      <Box
        pos="relative"
        mx="auto"
        maxW="93.75rem"
        mt={{ base: 16, md: '-14', lg: '0' }}
        pt={{ base: '40', md: '24', xl: '40' }}
        pb="16"
        overflow="hidden">
        <Image
          pos="absolute"
          top={{ md: '0px' }}
          left={{ base: '-50px', md: '0', lg: '0', '2xl': '50px' }}
          maxH={{ base: '150px', md: '200px', lg: '250px' }}
          src="/images/decorationen/shapes/shape2.svg"
        />
        <Image
          pos="absolute"
          bottom="0"
          right={{ base: '-30px', md: '50px', lg: '50px', '2xl': '150px' }}
          maxH={{ base: '120px', md: '120px', lg: '150px' }}
          transform="rotate(180deg)"
          src="/images/decorationen/shapes/shape2.svg"
        />
        <Image
          pos="absolute"
          top="0"
          right={{ base: '-180px', md: '-100px', xl: '-100px', '2xl': '0' }}
          maxH="18.75rem"
          transform="rotate(180deg)"
          src="/images/decorationen/shapes/shape.svg"
        />

        <WhiteBoxWithDashBorder
          title=" Überzeugt?"
          text="   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus imperdiet sed id
            elementum. Quam vel aliquam sit vulputate."
          button={{ text: ' Zur Beratung' }}
        />
      </Box>
    </Box>
  );
};
export default ConvincedSection;
