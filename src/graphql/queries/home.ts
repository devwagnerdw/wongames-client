import { BannerFragment } from './../fragments/banner'
import { gql } from '@apollo/client'

// GET_HOME | QUERY_HOME
export const QUERY_HOME = gql`
  query QueryHome {
    banners {
      ...BannerFragment
    }
  }
  ${BannerFragment}
`
