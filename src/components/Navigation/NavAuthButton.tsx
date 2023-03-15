import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import {Link} from 'gatsby'
import {AiOutlineUser} from 'react-icons/ai'
import {useIsClient} from '../../common/useIsClient'
import {useAuthentication} from '../../services/authentication'
import {useBasket} from '../../services/basket'

export interface NavAuthButtonProps {}

export const NavAuthButton: React.FC<NavAuthButtonProps> = () => {
  const {user, openLoginModal, logout} = useAuthentication()

  const basket = useBasket()

  const {isClient} = useIsClient()

  if (!isClient) {
    return null
  }

  const responsiveButton = (
    <>
      <Button
        display={{base: 'none', lg: 'flex'}}
        size="sm"
        variant="outline"
        leftIcon={<AiOutlineUser />}
        onClick={openLoginModal}>
        {user ? user.name : 'Login'}
      </Button>
      <IconButton
        display={{base: 'flex', lg: 'none'}}
        variant="ghost"
        icon={<AiOutlineUser />}
        aria-label="Login"
        onClick={openLoginModal}
      />
    </>
  )

  if (!user) {
    return responsiveButton
  }

  return (
    <Menu>
      <MenuButton as="span">{responsiveButton}</MenuButton>

      <MenuList>
        <MenuItem as={Link} to="/products">
          Großhandel
        </MenuItem>
        <MenuItem onClick={basket.onOpen}>Mein Warenkorb</MenuItem>
        <MenuDivider />
        <MenuItem
          onClick={() => {
            void logout()
          }}>
          Abmelden
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
