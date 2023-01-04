const Category = require("../models/Category");


module.exports = {
  create,
  getAll,
  getOne,
  deleteOne
}

async function create(req, res) {
  console.log('create')
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
  const category = await Category.findByIdAndDelete(req.body.id)
  res.status(200).json(`Category ${category.name} Deleted!!`)
}

async function getAll(req, res) {
  try {
    const categories = await Category.find({}).sort({ name: 1 })
    res.status(200).json(categories)
  } catch (err) {
    res.status(400).json(err)
  }

}

async function getOne(req, res) {

}