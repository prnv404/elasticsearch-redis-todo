import express, { Request, Response } from "express";
import { BadRequestError, NotFoundError, currentUser, requireAuth, validateRequest } from "@prnv404/todo";
import client from '../config/elasticsearch'


const router = express.Router()

router.get("/search", currentUser,requireAuth, validateRequest, async (req: Request, res: Response) => {

    const keyword = req.query.keyword as string
    
    const result = await client.search({
        index: "task",
        query: {
            
            bool: {

                must: [
                    {
                        match: {
                            userId: req.currentUser?.id
                        }
                    }
                ],
                
                should: [
                    {
                        fuzzy: {      
                            title: keyword,
                        }
                    },
                    {  
                        fuzzy: {  
                            description: keyword,
                        }
                    }
                ]
                
            }
            
            
        }

    })
    
    res.status(200).json(result.hits.hits)
})


    
export { router as ElasticRequest }
