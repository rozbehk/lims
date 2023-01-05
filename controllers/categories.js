const Category = require("../models/Category");


module.exports = {
  create,
  getAll,
  getOne,
  deleteOne
}

async function create(req, res) {
  let message = ''
  try {
    if (await Category.findOne({ name: req.body.name })) {
      message = 'Category exists'
      throw new Error()
    }
    const category = await Category.create({
      name: req.body.name
    });
    res.status(200).json('created');
  } catch (err) {
    console.log(err)
    res.status(400).json(message);
  }

}

async function deleteOne(req,res){
  let message = ''
  try{
    const category = await Category.findById(req.body.id)
    if(category.tests.length){
      message = 'Category is not empty, delete tests before deleting category'
      throw new Error()
    }
    category.delete()
    res.status(200).json(`Category ${category.name} Deleted!!`)
  }catch(err){
    console.log(err)
    res.status(400).json(message)
  }

}

async function getAll(req, res) {
  try {
    const categories = await Category.find({}).sort({ name: 1 })
    console.log(categories)
    res.status(200).json(categories)
  } catch (err) {
    res.status(400).json(err)
  }

}

async function getOne(req, res) {

}