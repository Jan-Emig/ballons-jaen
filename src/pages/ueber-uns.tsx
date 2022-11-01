import { PageProps } from "gatsby"

import AboutUsPage from "../components/templates/AboutUs/AboutUs"
import { Layout } from "../Layout"

const Page = (props: PageProps) => {
  return <Layout pathname={props.path}>
    <AboutUsPage />
  </Layout>
}

export default Page
