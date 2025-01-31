const express = require("express");
const { addBrand, updateBrand, deleteBrand, getBrandById, getBrands } = require("../handlers/brand-handler");
const router = express.Router();

router.post("", async (req, res) => {
  let model = req.body;
  let result = await addBrand(model)
  res.send(result);
})

router.put("/:id", async (req,res)=> {
  let model = req.body;
  let id = req.params["id"];
  await updateBrand(id, model);
  res.send({ message: "updated"});
})

router.delete("/:id", async(req, res)=>{
  let id = req.params["id"];
  await deleteBrand(id);
  res.send({ message: "deleted"});
})

router.get("", async (req,res) => {
  let result = await getBrands();
  res.send(result);
})

router.get("/:id", async (req,res) => {
  let id = req.params["id"];
  let result = await getBrandById(id);
  res.send(result);
})

module.exports = router;