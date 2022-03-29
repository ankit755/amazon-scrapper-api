import express from "express";
import request from 'request-promise';

const app = express();

const PORT = process.env.PORT || 5000; // for getting dynamic port whereever we run this api

app.use(express.json());

 
const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.get('/', (req, res)=>{
    res.send("Hello there, from Amazon Scraper API")
}); 

// GET PRODUCT DETAILS BY ID

app.get('/products/:productId', async(req, res)=>{

    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response  = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.in/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);//B09LMCRWF2
        console.log("in catch");
    }
    
});

// GET PRODUCT REVIEWS

app.get('/products/:productId/reviews', async(req, res)=>{

    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response  = await request(`${enerateScraperUrl(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);//B09LMCRWF2
        console.log("in catch");
    }
    
});

// GET PRODUCT OFFERS

app.get('/products/:productId/offers', async(req, res)=>{

    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response  = await request(`${enerateScraperUrl(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);//B09LMCRWF2
        console.log("in catch");
    }
    
});

// GET PRODUCT DETAIL BY SEARCH QUERY

app.get('/search/:SearchQuery', async(req, res)=>{

    const { SearchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response  = await request(`${enerateScraperUrl(api_key)}&url=https://www.amazon.in/gp/s?k=${SearchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);//B09LMCRWF2
        console.log("in catch");
    }
    
});
app.listen(PORT, ()=> console.log(`server running at port: ${PORT}`));

