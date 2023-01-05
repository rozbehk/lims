const Test = require("../models/Test");
const Category = require("../models/Category")


module.exports = {
  create,
  getAll,
  getOne,
  deleteOne
}

async function create(req, res) {
  console.log(req.body)
  let message = ''
  try {
    if (await Test.findOne({ name: req.body.name })) {
      message = 'Test exists'
      throw new Error()
    }
    const test = await Test.create({
      name: req.body.name,
      category : req.body.categoryId
    });
    let category = await Category.findById(req.body.categoryId)
    category.tests.push(test._id)
    console.log(category)
    category.save()
    res.status(200).json('created');
  } catch (err) {
    console.log(err)
    res.status(400).json(message);
  }

}

async function deleteOne(req,res){
  try{
    const test = await Test.findByIdAndDelete(req.body.id)
    let category = await Category.findById(test.category)
    category.tests.remove(test._id)
    category.save()
    res.status(200).json(`Category ${category.name} Deleted!!`)
  }catch(err){
    console.log(err)
    res.status(400).json(err)
  }
  
}

async function getAll(req, res) {
  try {
    const categories = await Test.find({}).sort({ name: 1 }).populate({ path: 'category' })
    res.status(200).json(categories)
  } catch (err) {
    res.status(400).json(err)
  }

}

async function getOne(req, res) {

}