import '../.jest/next-image.mock'
import { ThemeProvider } from 'styled-components'
import { CartContext, CartContextDefaultValues } from 'hooks/use-cart'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

export const parameters = {
  nextRouter: {
    Provider: RouterContext.Provider
  },
  backgrounds: {
    default: 'won-light',
    values: [
      {
        name: 'won-light',
        value: theme.colors.white
      },
      {
        name: 'won-dark',
        value: theme.colors.mainBg
      }
    ]
  }
}

export const decorators = [
  (Story, context) => (
    <ThemeProvider theme={theme}>
      <RouterContext.Provider>
        <CartContext.Provider
          value={{
            ...CartContextDefaultValues,
            ...(context?.args?.cartContextValue || {}),
            ...context.args
          }}
        >
          <GlobalStyles removeBg />
          <Story />
        </CartContext.Provider>
      </RouterContext.Provider>
    </ThemeProvider>
  )
]
