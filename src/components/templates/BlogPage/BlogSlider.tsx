import {Box, Container, Text} from '@chakra-ui/react'
import {connectBlock, Field} from '@snek-at/jaen'
import {FC} from 'react'
import Slider from 'react-slick'
import {CONTAINER_MAX_WIDTH} from '../../../constant/sizes'
import {blogSliderSettings} from '../../../constant/slider'

const SliderItem = connectBlock(
  () => {
    return (
      <Box boxSize={'full'} display={'flex'} justifyContent="center">
        <Box
          m={{base: 2, lg: 4}}
          boxSize={{base: '10rem', sm: '12rem', lg: '15rem'}}
          mb="8 !important"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="dark">
          <Field.Image
            name="image"
            label="Image"
            //defaultValue="/images/blog_page/sliderImg1.png"
          />
        </Box>
      </Box>
    )
  },
  {
    name: 'SliderItem',
    label: 'SliderItem'
  }
)

interface IBlogSliderProps {}

const BlogSlider: FC<IBlogSliderProps> = () => {
  return (
    <Box
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPos="start"
      mt="24"
      py="8"
      bgImage={{
        base: '/images/blog_page/slider_mobile_bg.svg',
        md: '/images/blog_page/sliderBg.svg'
      }}>
      <Container maxW={CONTAINER_MAX_WIDTH}>
        <Field.Section
          //@ts-expect-error
          as={Slider}
          props={{...blogSliderSettings}}
          name="SliderItem"
          label="Blog Slider"
          blocks={[SliderItem]}
        />

        <Box pt="12"></Box>
        <Text
          size="b2012"
          textAlign="center"
          py={{base: 16, md: 8, xl: 16}}
          as="span">
          <Field.Text
            name="text"
            label="Text"
            defaultValue={`<p>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in
           libero risus semper Lorem ipsum dolor sit amet, consectetur adipiscing
           elit. Faucibus in libero risus semper Lorem ipsum dolor sit amet,
           consectetur adipiscing elit. Faucibus in libero risus semper Lorem
           ipsum dolor sit amet, cipiscing elit. Faucibus in liber
           </p>`}
          />
        </Text>
      </Container>
    </Box>
  )
}
export default BlogSlider
