import bcrypt from 'bcrypt';

export const hashPassword= async(password)=>{ 
try {
    const saltRound= 10
const hashedpassword = await bcrypt.hash(password,saltRound)
return hashedpassword;
} catch (error) {
    console.log(error);
    
}

}
export const comparePassword = async (password,hashedpassword)=>{
    return bcrypt.compare(hashedpassword,password);
}