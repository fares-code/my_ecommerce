
import categorymodel from "../models/categorymodel.js";
import slugify from 'slugify';



//Create Category
export const createCategoryControllers = async (req, res) => {
    const { name } = req.body;

    try {
        if (!name) {
            return res.status(401).send({
                success: false,
                message: "Name is required"
            });
        }

        // Check if category already exists
        const existingCategory = await categorymodel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exists"
            });
        }

        // Create new category
        const newCategory = await new categorymodel({
            name,
            slug: slugify(name)
        }).save();

        res.status(201).send({
            success: true,
            message: "New Category Added",
            newCategory
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "An error occurred while creating the category",
            error
        });
    }
};
//Update Category
export const updateCategoryControllers=async (req,res)=>{
    const { name } = req.body;
    const { id } = req.params;
    
    try {
        if (!name) {
            return res.status(401).send({
                success: false,
                message: "Name is invalid"
            });
        }
    
        // Update category
        const updateCategory = await categorymodel.findByIdAndUpdate(
            id,
            {
                name,
                slug: slugify(name)
            },
            { new: true }
        );
    
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            updateCategory
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "There was an error in the update category route",
            error
        });
    }
        
    }


//get categories
export  const getAllCategories =async (req,res)=>{
    try {
      const AllCategories = await categorymodel.find({});
res.status(200).send({
    success:true,
    message:"Categories is get successfly",
    AllCategories
})
 } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "There was an error while gettin categories",
            error 
        })
        
    }
}
export const getSinglCategory= async (req,res)=>{
try {
    const getCategory = await categorymodel.findOne({slug:req.params.slug})
    res.status(200).send({
        success:true,
        message:"Category is get successfly",
        getCategory
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message: "There was an error while gettin category",
        error 
    });
}
}

















    
export const deleteCategoryControllers = async (req,res)=>{
    try {
       await categorymodel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:"Category is deleted",
           
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "There was an error while gettin category",
            error 
        });
    }
}
