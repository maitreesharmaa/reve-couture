const router = require ('express').Router();
const {createCategory, updateCategory, deleteCategory, getCategory, getCategories} = require ('../controller/category.controller');
const {protect, authorize, ROLES} = require ('../middleware/auth')

router.get('/', getCategories); // Get all categories
router.get('/:id', getCategory); // Get a single category by its ID
router.post('/', protect, authorize(ROLES.ADMIN), createCategory);
router.put('/:id', protect, authorize(ROLES.ADMIN), updateCategory);
router.delete('/:id', protect, authorize(ROLES.ADMIN), deleteCategory);


module.exports = router;
