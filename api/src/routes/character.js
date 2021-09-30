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

//busca los personajes por nombre
router.get('/', async (req, res) => {
    const name = req.query.name;
    let charactersTotal = await getAllCharacters();
    try {
        if(name) {
            let characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
            characterName.length ?
            res.status(200).send(characterName) : 
            res.status(404).send('No lo encontramos');
        }
    } 
    catch {   
        res.status(200).send(charactersTotal)
    }
})

router.post('/', async (req, res) => {
    let {
        name,
        nickname,
        birthday,
        image,
        status, 
        createdInDb,
        occupation
    } = req.body

    let characterCreated = await Character.create({
        name,
        nickname, 
        birthday,
        image,
        status, 
        createdInDb,
    })

    let occupationDb = await Occupation.findAll({
        where: {name : occupation}
    })
    characterCreated.addOccupation(occupationDb)
    res.send('Personaje creado satisfactoriamente')
})  

router.get('/:id', async (req,res) => {
    const id = req.params.id;
    const charactersTotal = await getAllCharacters()
    if(id) {
        let characterId = await charactersTotal.filter(el => el.id == id)
        characterId.length ?
        res.status(200).json(characterId) : 
        res.status(404).send('No encotrado')
    }
})


module.exports = router;