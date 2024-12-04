const express = require('express')
const app = express()
app.use(express.json())

const Recipe = require('./models/Recipe.model')
const {initializeDatabase} = require('./db/db.connect')
const { trusted } = require('mongoose')

initializeDatabase()

// Add Recipes to database.
  const addRecipe = async(data) => {
    try{
        const recipeData = new Recipe(data)
        const savedData = await recipeData.save()
        return savedData
    }
    catch(error){
    throw error
    }    
  }

  app.post('/recipes',async(req, res) => {
    try{
const recipes = await addRecipe(req.body)
if(recipes){
    res.status(200).json({message: "Recipe added succefully."})
}else{
    res.status(404).json({error: "Recipes data not found."})
}
    }catch(error){
        res.status(500).json({error: "Faield to add recipes."})
    }
  })

//   Get All Recipes

const getAllRecipes = async() => {
    try{
        const allRecipes = await Recipe.find()
        return allRecipes
    }
    catch(error){
        throw error
    }
}

app.get("/recipes",async(req,res) => {
    try{
const allRecipes = await getAllRecipes()
if(allRecipes){
    res.status(200).json({message: 'Data fetched succefully.',allRecipes})

}else{
    res.status(404).json({error: 'Data not found.'})
}
    }
    catch(error){
        res.status(500).json({error: "Faield to get recipes."})
    }
})


const getRecipeByTitle = async(recipeTitle) => {
    try{
    const recipeDetails = await Recipe.findOne({title: recipeTitle})
    return recipeDetails
    }
    catch(error){
        throw error
    }
}

app.get('/recipes/:title',async(req, res) => {
    try{
const recipeBytitle = await getRecipeByTitle(req.params.title)
if(recipeBytitle){
    res.status(200).json(recipeBytitle)
}else{
    res.status(404).json({error: "Recipe not found."})
}
    }
    catch(error){
        res.status(500).json({error: "Faield to get recipes."})
    }
})

const getRecipesByAuthor = async(authorName) => {
    try{
const recipeByAuthor = await Recipe.find({author: authorName})
return recipeByAuthor
    }
    catch(error){
        throw error
    }
}

app.get('/recipes/author/:authorName', async(req, res) => {
    try{
const allRecipesByAuthor = await getRecipesByAuthor(req.params.authorName)
if(allRecipesByAuthor){
    res.status(200).json(allRecipesByAuthor)
}else{
    res.status(404).json({error: 'Recipes not found.'})
}
}
    catch(error){
        res.status(500).json({error: 'Faield to get recipes.'})
    }
})


const getEasyRecipes = async({difficultyStatus}) => {
    try{
const easyRecipes = await Recipe.find({difficulty: difficultyStatus})
    return easyRecipes
}
    catch(error){
        throw error
    }
}

app.get('/recipes/difficulty/:difficultyType',async (req, res) => {
    try{
const allEasyRecipe = await getEasyRecipes({difficultyStatus: req.params.difficultyType})
if(allEasyRecipe.length > 0){
res.status(200).json({message: 'successfull',allEasyRecipe})
}else{
    res.status(404).json({error: 'Recipes not found.'})
}
    }
    catch(error){
        res.status(500).json({error: 'Faield to get recipes.'})
    }
})


const updateRecipeDifficulty = async(recipeId, dataToUpdate) => {
    try{
const updateDifficulty = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {new: true})
return updateDifficulty   
}
    catch(error){
        throw error
    }
}

app.post('/recipes/update/:recipeId',async(req, res) => {
    try{
const updatedDifficulty = await updateRecipeDifficulty(req.params.recipeId, req.body)
if(updatedDifficulty){
    res.status(200).json({message: "Succesfully Updated.",updatedDifficulty})
}else{
    res.status(404).json({error: 'Recipe not found.'})
}
}
    catch(error){
        res.status(500).json({error: 'Faield to update.'})
    }
})

const updatByTitle = async(recipeTitle, updatedData) =>{
try{
const updateRecipe = await Recipe.findOneAndUpdate({title: recipeTitle}, updatedData, {new: true})
return updateRecipe
}
catch(error){
    throw error
}
}

app.post('/recipes/updateRecipe/:recipeTitle',async(req, res) => {
    try{
const updatedRecipe = await updatByTitle(req.params.recipeTitle, req.body)
if(updatedRecipe){
    res.status(200).json(updatedRecipe)
}else{
    res.status(404).json({error: 'Recipe not found'})
}
    }
    catch(error){
        res.status(500)
    }
})



const deleteRecipe = async(id,dataToDelete) => {
    try{
const recipeToDelete = await Recipe.findByIdAndDelete(id, dataToDelete, {new: true})
return recipeToDelete
    }
    catch(error){
        throw error
    }
}

app.delete('/recipes/deletedRecipe/:recipeId', async(req, res) => {
    try{
const deletedRecipe = await deleteRecipe(req.params.recipeId)
res.status(200).json({message: 'Deleted successfull', deletedRecipe})
    }
    catch(error){
        res.status(500).json({error: 'Faield to delete.'})
    }
})
  const PORT = 3000
  app.listen(PORT, () => {
    console.log("Server is running on",PORT)
  })
  
