import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${process.env.NEXT_PUBLIC_HOST}/${ slug != '/' ? slug + '/' : ''}`}</loc>
       </url>
     `;
       })
       .join('')}</urlset>
 `;
}

export async function getServerSideProps({ res }) {

    const posts = await prisma.post.findMany() || null

    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml')

    res.write(sitemap)
    res.end()

    return {
        props: {
            posts: posts
        }
    }
}

function SiteMap() {}

export default SiteMap;
