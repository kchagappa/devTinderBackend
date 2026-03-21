
const validator = require("validator");
const ValidateSignUpUser = async (req) => {
    try {
        const { firstName, lastName, email, password } = req.body
        if (!firstName || !lastName) {
            throw new Error("Invalid name!!!")
        } else if (!validator.isEmail(email)) {
            throw new Error("Enter the valid email!!!")
        } else if (!validator.isStrongPassword(password)) {
            throw new Error("Enter a strong password!!!")
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = ValidateSignUpUser;