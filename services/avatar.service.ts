const User= require("../models/user");

const uploadAvatarServ = async(image:string, id:string)=>{
    try {
       const findUser = await User.findOne({
        where:{id}
       })
       if(!findUser){
        return{
            msg:"Usuario no encontrado...",
            success:false
        }
       }
       const updateUser = await User.update({image},{
        where:{id}
       })
       if (updateUser <= 0) {
        return {
          msg: "Actualización no realizada...",
          success: false,
        };
      }
      const user = await User.findOne({ where: { id } });
       return{
        msg:"Usuario actualizado...",
        user,
        success:true
    }
      } catch (e) {
        throw new Error(e as string);
      }
}

export {
    uploadAvatarServ,
}