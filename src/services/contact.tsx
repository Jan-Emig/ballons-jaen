import {useToast} from '@chakra-ui/react'
import {getTokenPair, sq} from '@snek-functions/origin'
import React, {useMemo} from 'react'
import {asEnumKey, doNotConvertToString} from 'snek-query'

import {
  ContactFormValues,
  ContactModal
} from '../components/organisms/ContactModal'
import {useAuthentication} from './authentication'

export interface ContactModalContextProps {
  onOpen: (args?: {meta?: Record<string, any>}) => void
  onClose: () => void
}

export const ContactModalContext =
  React.createContext<ContactModalContextProps>({
    onOpen: () => {},
    onClose: () => {}
  })

export const useContactModal = () => {
  if (!ContactModalContext) {
    throw new Error(
      'useContactModal must be used within a ContactModalProvider'
    )
  }

  return React.useContext(ContactModalContext)
}

export interface ContactModalDrawerProps {
  children: React.ReactNode
}

export const ContactModalProvider: React.FC<ContactModalDrawerProps> = ({
  children
}) => {
  const [meta, setMeta] = React.useState<Record<string, any> | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  const toast = useToast()

  const authentication = useAuthentication()

  const onOpen: ContactModalContextProps['onOpen'] = args => {
    const updatedMeta = {
      ...meta,
      url: window.location.href
    }

    setMeta(updatedMeta)
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
  }

  const onSubmit = async (data: ContactFormValues): Promise<void> => {
    // sleep 3 seconds to simulate a network request

    console.log(data, meta)

    const [_, errors] = await sq.mutate(m =>
      m.mailpressMailSchedule({
        envelope: {
          replyTo: {
            value: data.email,
            type: doNotConvertToString('EMAIL_ADDRESS') as any
          }
        },
        template: {
          id: 'BALLOONS_CONTACT_EMAIL',
          values: {
            name: data.name,
            email: data.email,
            message: data.message,
            invokedOnUrl: meta?.url
          }
        }
      })
    )

    if (errors) {
      // Deutsch
      toast({
        title: 'Fehler',
        description: 'Es ist ein Fehler aufgetreten.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } else {
      toast({
        title: 'Erfolg',
        description: 'Ihre Nachricht wurde erfolgreich versendet.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })

      onClose()
    }
  }

  const fixedValues = useMemo(() => {
    if (!authentication.user) {
      return undefined
    }

    return {
      name: authentication.user.name,
      email: authentication.user.email
    }
  }, [authentication.user])

  return (
    <ContactModalContext.Provider value={{onOpen, onClose}}>
      {children}
      <ContactModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        fixedValues={fixedValues}
      />
    </ContactModalContext.Provider>
  )
}
