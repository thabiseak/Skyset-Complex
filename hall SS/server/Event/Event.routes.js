const express = require('express')
const router = express.Router()
const {
    getSingle,
    getAll,
    createNew,
    deleteSinle,
    updateDocument,
} = require('./Event.controller')



//Get all 
router.get('/',getAll) 

// router.get('/course/:courseID',filterWithCourseId)

//Get a single document
router.get('/:id',getSingle)

//Get a by unit id

//POST a new document
router.post('/', createNew)

//Delete a  document
router.delete('/:id', deleteSinle)

//Update a document
router.patch('/:id',updateDocument)


module.exports = router;