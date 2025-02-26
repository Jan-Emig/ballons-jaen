import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Stack,
  Text
} from '@chakra-ui/react'
import {FaBox} from 'react-icons/fa'

import {CartItem} from './CartItem'
import {CartOrderSummary} from './CartOrderSummary'
import {CheckoutLineItem} from './stories/data'

export interface BasketDrawerProps {
  isOpen: boolean
  products: CheckoutLineItem[]
  wholesale: boolean
  subtotal: number
  onClickCheckout: () => void
  onProductQuantityChange: (id: string, quantity: number) => void
  onProductRemove: (id: string) => void
  onClose: () => void
}
export const BasketDrawer = ({
  isOpen,
  onClose,
  onClickCheckout,
  onProductQuantityChange,
  onProductRemove,
  products,
  wholesale,
  subtotal
}: BasketDrawerProps) => {
  const currency = 'EUR'

  return (
    <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size="lg" />
        <DrawerHeader>
          <Heading fontSize="lg" as="h2" fontWeight="normal">
            Warenkorb ({products.length} Artikel)
          </Heading>
        </DrawerHeader>

        <Divider />

        <DrawerBody>
          <Stack spacing={{base: '8', md: '10'}}>
            <Stack spacing="6">
              {products.map(product => {
                const id = product.variant.id.toString()

                const stepperQuantity = parseInt(
                  (product.customAttributes as any[]).find(
                    attr => attr.key === 'stepperQuantity'
                  )?.value || '1'
                )

                return (
                  <CartItem
                    key={id}
                    name={product.title}
                    description="description"
                    quantity={product.quantity}
                    stepperQuantity={stepperQuantity}
                    price={parseFloat(product.variant.price.amount)}
                    imageUrl={product.variant.image?.src}
                    currency={currency}
                    onChangeQuantity={quantity => {
                      onProductQuantityChange(product.id.toString(), quantity)
                    }}
                    onClickDelete={() => {
                      onProductRemove(product.id.toString())
                    }}
                  />
                )
              })}
            </Stack>
          </Stack>
        </DrawerBody>

        <Divider />

        <DrawerFooter>
          <CartOrderSummary
            subtotal={subtotal}
            currency={currency}
            onClickCheckout={onClickCheckout}
            infoText={
              wholesale ? (
                <Text fontSize="sm" mt="0 !important">
                  Alle Preise exkl. 19% MwSt.
                </Text>
              ) : (
                <HStack color="gray.600" mt="0 !important">
                  <FaBox />
                  <Text fontSize="sm">
                    Versand + Steuern werden im nächsten Schritt berechnet.
                  </Text>
                </HStack>
              )
            }
            checkoutButtonText={wholesale ? 'jetzt bestellen' : 'zur Kassa'}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default BasketDrawer
