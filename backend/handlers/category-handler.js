const Category = require("../db/category");

function addCategory(model){
  let category = new Category({
    name: model.name
  });
  category.save();
  return category.toObject();
}

async function updateCategory(id,model){
  await Category.findOneAndUpdate({_id:id}, model);
  return;
}

async function deleteCategory(id){
  await Category.findByIdAndDelete(id);
  return;
}

async function getCategory() {
  let categories = await Category.find();
  return categories.map(c=> c.toObject())
}

async function getCategoryById(id) {
  let categories = await Category.findById(id);
  return categories.toObject()
}

module.exports = {getCategoryById, getCategory, addCategory, updateCategory, deleteCategory}