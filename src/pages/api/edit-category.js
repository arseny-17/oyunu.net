import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

  try{
    const editCat = await prisma.lang.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
          title: req.body.title,
          slug: req.body.slug,
          attr: req.body.attr
      }
    })
    
    res.status(200).json({ 
      cat: editCat
    })

  } catch(e){
    res.status(400).json({ 
      error: e
    })
    console.log('Error!', e)
  }
}