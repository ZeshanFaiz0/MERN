import bcrypt from "bcrypt";

export async function computeHash (email, password)  {
    var salt = await bcrypt.genSalt();
    return await bcrypt.hash(email.toUpperCase() + password, salt)
}
