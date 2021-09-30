const router = require('express').Router();
const axios = require('axios')
const {Character, Occupation} = require('../db')


const getApiInfo = async () => {
    const apiUrl = await axios.get('https://breakingbadapi.com/api/characters');
    const apiInfo = await apiUrl.data.map(el => {
        return {
            name: el.name,
            img: el.img,
            nickname: el.nickname,
            status: el.status,
            id: el.char_id,
            occupation: el.occupation.map(el => el),
            birthday: el.birthday,
        }
    })
    return apiInfo;
}

const getDbInfo = async () => { 
    return await Character.findAll({
        include: {
            model: Occupation,
            attributes: ['name'],
            through: {
                attributes: []        
            }
        }
    })
}

const getAllCharacters = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}
router.get('/', async (req,res) => {
    const charactersTotal = await getAllCharacters()
    try {
        res.status(200).send(charactersTotal)
    }
    catch{
        res.status(500).send('Error de pana ¯\_(ツ)_/¯')
    }
})

module.exports = router;