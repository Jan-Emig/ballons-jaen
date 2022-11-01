import { PageProps } from "gatsby"

import ContentPage2 from "../components/templates/WirGestaltenParty/WirGestaltenParty"
import { Layout } from "../Layout"

const Page = (props: PageProps) => {
  return <Layout pathname={props.path}>
    <ContentPage2 />
  </Layout>
}

export default Page
