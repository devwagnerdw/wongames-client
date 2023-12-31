import { render, screen } from 'utils/test-utils'
import { CartContextDefaultValues } from 'hooks/use-cart'

import CartButton from '.'
import userEvent from '@testing-library/user-event'

describe('<CartButton />', () => {
  it('should render button to add and call the method if clicked', async () => {
    const cartProviderProps = {
      ...CartContextDefaultValues,
      isInCart: () => false,
      addToCart: jest.fn()
    }

    render(<CartButton id="1" />, { cartProviderProps })

    const button = screen.getByLabelText(/add to cart/i)
    expect(button).toBeInTheDocument()

    await userEvent.click(button) // Use await aqui para aguardar a conclusão da ação de clique

    expect(cartProviderProps.addToCart).toHaveBeenCalledWith('1')
  })
})
