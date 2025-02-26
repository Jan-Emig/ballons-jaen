import {ChevronLeftIcon} from '@chakra-ui/icons'

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  useClipboard,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import {FaShare} from '@react-icons/all-files/fa/FaShare'
import {FaShoppingBasket} from '@react-icons/all-files/fa/FaShoppingBasket'
import {GiBalloons} from '@react-icons/all-files/gi/GiBalloons'
import {
  getFormattedProductPrices,
  getProductTags,
  ProductPageData,
  ShopifyProduct,
  withStoreContext
} from '@snek-at/gatsby-theme-shopify'
import {navigate} from 'gatsby'
import {GatsbyImage} from 'gatsby-plugin-image'
import React from 'react'
import {BsBalloonHeartFill} from 'react-icons/bs'
import {FaRuler, FaRulerCombined, FaRulerVertical} from 'react-icons/fa'
import {PhotoProvider, PhotoView} from 'react-photo-view'
import {getSrcFromImageData} from '../../../common/get-src-from-image-data'

import {getProductMetafields} from '../../../common/getProductMetafields'
import {getProductPrices, replaceHexColorsInHTML} from '../../../common/utils'
import {useBasket} from '../../../services/basket'
import {ProductSlider} from '../../molecules/ProductSlider'
import ProductsPageShell from '../ProductsTemplate/ProductsPageShell'

export interface ProductTemplateProps extends ProductPageData {
  path: string
  wholesale?: boolean
  allTags: string[]
  onWishlistAdd: (id: string) => void
  isOnWishList?: boolean
  onGoBack: () => void
}

export const ProductTemplate = ({
  path,
  wholesale,
  allTags,
  onWishlistAdd,
  onGoBack,
  shopifyProduct,
  relatedProducts,
  isOnWishList = false
}: ProductTemplateProps) => {
  const productTags = getProductTags(shopifyProduct)

  const allActiveTags = [
    ...productTags.categoryTags,
    ...productTags.otherTags,
    `Typ:${shopifyProduct.productType}`,
    `Hersteller:${shopifyProduct.vendor}`
  ]

  return (
    <ProductsPageShell
      allTags={allTags}
      activeTags={allActiveTags}
      onActiveTagsChange={tags => {
        void navigate('/products', {
          state: {
            activeTags: tags
          }
        })
      }}
      sortOptions={['Alphabetisch', 'Preis aufsteigend', 'Preis absteigend']}
      onSortChange={() => {}}>
      <VStack dir="column" w="100%" px={2}>
        <Box w="full" my="4">
          <Button
            justifyContent="flex-start"
            variant="link"
            leftIcon={<ChevronLeftIcon />}
            onClick={onGoBack}>
            Zurück
          </Button>
        </Box>
        <VStack spacing={12}>
          <Stack direction={{base: 'column-reverse', lg: 'row'}}>
            <ProductDetail
              wholesale={wholesale}
              product={shopifyProduct}
              onWishlistAdd={onWishlistAdd}
              isOnWishList={isOnWishList}
              onGoBack={onGoBack}
            />
            <ImageSlider
              featuredMedia={shopifyProduct.featuredMedia}
              media={shopifyProduct.media}
              description={shopifyProduct.descriptionHtml}
            />
          </Stack>
          <Box display={{base: 'block', md: 'none'}}>
            <ProductMoreDetail description={shopifyProduct.descriptionHtml} />
          </Box>
        </VStack>
        <Box
          w={{
            base: '20rem',
            md: '30rem',
            lg: '55rem',
            xl: '80rem'
          }}>
          <ProductSlider
            heading="Ähnliche Produkte"
            products={relatedProducts.nodes}
            prefixPath="/products"
            wholesale={wholesale}
          />
        </Box>
      </VStack>
    </ProductsPageShell>
  )
}

function Price({
  prices
}: {
  prices: ReturnType<typeof getFormattedProductPrices>
}) {
  const {priceFormatted, compareAtPriceFormatted} = prices

  if (compareAtPriceFormatted) {
    // strike through price and put discount price on the right side
    return (
      <Flex
        direction="row"
        wrap="wrap"
        justifyContent={{
          base: 'center',
          md: 'flex-start'
        }}>
        <Text
          fontSize="md"
          fontWeight="semibold"
          color="gray.600"
          textDecoration="line-through">
          {compareAtPriceFormatted}
        </Text>

        <Heading
          fontSize="lg"
          mt={{
            base: 0,
            md: 4
          }}
          fontWeight="semibold"
          color="red.500">
          {priceFormatted}
        </Heading>
      </Flex>
    )
  }

  return (
    <Heading size="lg" fontWeight="semibold">
      {priceFormatted}
    </Heading>
  )
}

const ProductDetail = withStoreContext<{
  product: ProductPageData['shopifyProduct']
  isOnWishList?: boolean

  wholesale?: boolean

  onWishlistAdd: (id: string) => void

  onGoBack: () => void
}>(props => {
  const productMetatfields = getProductMetafields(props.product)

  const stepperStep = props.wholesale
    ? parseInt(productMetatfields.wholesale?._SU || '1')
    : parseInt(productMetatfields.details?._SU || '1')
  const minQuantity = stepperStep

  const [quantity, setQuantity] = React.useState(minQuantity)

  const prices = getProductPrices(props.product, {
    isWholesale: props.wholesale || false
  })

  let taxable = props.product.variants[0]?.taxable

  if (props.wholesale) {
    taxable = false
  }

  const tags = getProductTags(props.product)

  const productTags = []

  if (tags.categoryString) {
    productTags.push(tags.categoryString)
  }

  if (tags.otherString) {
    productTags.push(tags.otherString)
  }

  if (props.product.vendor !== '-') {
    productTags.push(`Hersteller: ${props.product.vendor}`)
  }

  if (props.product.productType && props.product.productType !== '-') {
    productTags.push(`Art: ${props.product.productType}`)
  }

  const basket = useBasket()

  const addProductToBasket = () => {
    basket.addProduct({
      variantId: props.product.variants[0].shopifyId,
      quantity,
      stepperQuantity: stepperStep
    })

    setQuantity(minQuantity)
  }

  const availableForSale = props.product.variants[0].availableForSale

  return (
    <>
      <Box
        overflow="hidden"
        px={{base: 0, md: 4}}
        py={{base: 4, md: 8}}
        m={{base: 0, md: 1}}
        position={{base: 'relative', lg: 'sticky'}}
        top="15"
        alignSelf="flex-start">
        <VStack align="left" spacing="4">
          <Heading as="h1" size="lg">
            {props.product.title}
          </Heading>
          <Price prices={prices} />

          <Text fontSize="xs" color="gray.600">
            {taxable ? 'inkl.' : 'exkl.'} MwSt.
          </Text>

          {/* <Divider />

          {productTags.map((tag, index) => (
            <Box
              as="span"
              fontSize={'xs'}
              fontWeight={'hairline'}
              color="gray.600"
              mr={2}
              key={index}>
              {tag}
            </Box>
          ))} */}

          {productMetatfields.details?.filling && (
            <>
              <Divider />

              <HStack spacing="4">
                <Icon as={BsBalloonHeartFill} boxSize={8} />
                <Text
                  fontSize={{
                    base: 'xs',
                    md: 'sm'
                  }}
                  color="gray.600">
                  {productMetatfields.details.filling}
                </Text>
              </HStack>
            </>
          )}

          {productMetatfields.details?.sizeHelper && (
            <>
              <Divider />

              <HStack spacing="4">
                <Icon as={FaRuler} boxSize={8} />
                <Text
                  fontSize={{
                    base: 'xs',
                    md: 'sm'
                  }}
                  color="gray.600">
                  {productMetatfields.details.sizeHelper}
                </Text>
              </HStack>
            </>
          )}

          <Divider />

          <Text fontSize="xs" fontWeight="thin">
            Artikelnummer: {props.product.variants[0].sku || '-'}
          </Text>
          <Divider />

          {!availableForSale && (
            <Text color="red.500">Derzeit nicht verfügbar</Text>
          )}

          <HStack>
            <NumberInput
              size="md"
              maxW={24}
              step={stepperStep}
              defaultValue={minQuantity}
              min={minQuantity}
              value={quantity}
              onChange={valueString => {
                setQuantity(parseInt(valueString))
              }}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <Button
              disabled={!availableForSale}
              fontWeight="semibold"
              textTransform="uppercase"
              leftIcon={<Icon as={FaShoppingBasket} />}
              borderRadius="full"
              size={{
                base: 'sm',
                md: 'md'
              }}
              onClick={addProductToBasket}>
              <Text
                fontSize={{
                  base: 'sm',
                  md: 'md'
                }}>
                In den Warenkorb
              </Text>
            </Button>
          </HStack>
          <Divider />
          <Flex alignItems="center" justifyContent="center" fontSize="xl">
            <Box mx="auto">
              <ShareText />
            </Box>
          </Flex>
          <Divider />
        </VStack>
      </Box>
    </>
  )
})

function ShareText() {
  const value = typeof window !== 'undefined' ? window.location.href : ''

  const {hasCopied, onCopy} = useClipboard(value)

  return (
    <Center
      color={hasCopied ? 'red.500' : undefined}
      _hover={{
        color: hasCopied ? 'red.400' : 'red.300'
      }}
      verticalAlign="center"
      cursor="pointer">
      <Icon as={FaShare} mr="2" />
      <Text fontWeight="semibold" onClick={onCopy}>
        Teilen
        {hasCopied && (
          <Text ml="2" fontWeight="thin">
            (Kopiert!)
          </Text>
        )}
      </Text>
    </Center>
  )
}

type SliderMedia = ShopifyProduct['featuredMedia']

const ImageThumbnailWrapItem = (props: {
  media: SliderMedia
  active: boolean
  onClick: () => void
}) => {
  if (!props.media) {
    return null
  }

  const {gatsbyImageData, altText} = props.media.image

  return (
    <WrapItem
      boxSize={{base: '16', md: '20'}}
      onClick={props.onClick}
      cursor="pointer"
      boxShadow={props.active ? 'inset 0px 4px 0px 0px #eb1933' : 'none'}
      p={2}
      mr={2}
      mb={2}
      _hover={{
        bg: useColorModeValue('gray.100', 'gray.800')
      }}
      transition="ease-out">
      <GatsbyImage
        onDragStart={e => {
          e.preventDefault()
        }}
        draggable="false"
        image={gatsbyImageData}
        alt={altText || 'Product image '}
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'contain',
          objectPosition: 'center'
        }}
        objectFit="contain"
        imgStyle={{
          objectFit: 'contain'
        }}
      />
    </WrapItem>
  )
}

const ImageSlider = (props: {
  featuredMedia: SliderMedia
  media: ShopifyProduct['media']
  description?: string
}) => {
  const media = props.media
  const [curMediaIndex, setCurMediaIndex] = React.useState<number>(0)

  const curMedia = media[curMediaIndex]

  return (
    <PhotoProvider>
      <Box
        my="4"
        minW={{
          base: '20rem',
          md: '30rem',
          lg: '35rem',
          xl: '40rem'
        }}
        /* w="100%" */
      >
        <PhotoView
          src={getSrcFromImageData(props.featuredMedia?.image.gatsbyImageData)}>
          <Center
            cursor="zoom-in"
            boxSize={{
              base: '20rem',
              md: '30rem',
              lg: '35rem'
            }}
            objectFit="contain">
            {curMedia?.image && (
              <GatsbyImage
                image={curMedia.image.gatsbyImageData}
                alt={curMedia.image.altText || 'Product Image'}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
                objectFit="contain"
              />
            )}
          </Center>
        </PhotoView>

        {media.length > 1 && (
          <Wrap
            overflow="hidden"
            bg={useColorModeValue('gray.50', 'gray.700')}
            spacing={0}
            justify="center">
            {media.map((media, index) => (
              <ImageThumbnailWrapItem
                key={index}
                media={media}
                active={curMediaIndex === index}
                onClick={() => {
                  setCurMediaIndex(index)
                }}
              />
            ))}
          </Wrap>
        )}

        <Box display={{base: 'none', md: 'block'}}>
          <ProductMoreDetail description={props.description || ''} />
        </Box>
      </Box>
    </PhotoProvider>
  )
}

const ProductMoreDetail = (props: {description: string}) => {
  const color = useColorModeValue('#000000', '#ffffff')

  const html = replaceHexColorsInHTML(props.description, '#000000', color)

  return (
    <Box py="8">
      <Box dangerouslySetInnerHTML={{__html: html}} />
    </Box>
  )
}
