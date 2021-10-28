import { productName, productSlug } from 'data/metadata'
import DocsPage from '@hashicorp/react-docs-page'
import {
  generateStaticPaths,
  generateStaticProps,
} from '@hashicorp/react-docs-page/server'

const NAV_DATA_FILE = 'data/intro-nav-data.json'
const CONTENT_DIR = 'content/intro'
const basePath = 'intro'

export default function DocsLayout(props) {
  return (
    <DocsPage
      product={{ name: productName, slug: productSlug }}
      baseRoute={basePath}
      staticProps={props}
      showVersionSelect={true}
    />
  )
}

export async function getStaticPaths() {
  return {
    fallback: 'blocking',
    paths: await generateStaticPaths({
      navDataFile: NAV_DATA_FILE,
      localContentDir: CONTENT_DIR,
      product: { name: productName, slug: productSlug },
      basePath: basePath,
    }),
  }
}

export async function getStaticProps({ params }) {
  try {
    return {
      props: await generateStaticProps({
        params,
        navDataFile: NAV_DATA_FILE,
        localContentDir: CONTENT_DIR,
        product: { name: productName, slug: productSlug },
        basePath: basePath,
      }),
    }
  } catch (err) {
    console.warn(err)
    return { notFound: true }
  }
}
