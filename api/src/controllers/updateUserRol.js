const  { getUserById } = require('./userController');


const updateUserRole = async (id, rol) => {
	 const userRole = await getUserById(id).roles



}