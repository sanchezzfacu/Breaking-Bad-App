const router = require('express').Router();
const axios = require('axios');
const { Occupation } = require('../db');

router.get('/',async (req,res)=> {
    const occupationsApi = await axios.get('https://www.breakingbadapi.com/api/characters')
    const occupations = occupationsApi.data.map(el => el.occupation)
    const occEach = occupations.flat()

    occEach.forEach(el => {
        Occupation.findOrCreate({
            where: { name: el }
        })
    })
    const allOccupations = await Occupation.findAll();
    res.send(allOccupations);
})

module.exports = router;