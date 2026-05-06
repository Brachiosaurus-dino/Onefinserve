import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import SignUp from '../models/sign_up_model.js'
import Register from '../models/client_registration_model.js'
import dotenv from 'dotenv'


  dotenv.config()
const SignUp_Cont = async (req, res) => {

  
    try {
        const { panNumber, fullName, mobile_num, setPasswordss, email } = req.body



        let pan_num = await SignUp.findOne({ panNumber })
        if (pan_num) {
            console.log("User Already Exists")
            return res.json(`The User already exist ${panNumber}`)
        }

        const salRound = 10
        const hashedPassword = await bcrypt.hash(setPasswordss, salRound)

        let newUser = new SignUp({
            panNumber,
            email,
            fullName,
            mobile_num,
            setPasswordss: hashedPassword,
        })

        await newUser.save()

        return res.status(200).json({ success: true, message: "The User Registered Succesfully", user: newUser })

    }
    catch (err) {
        return res.status(500).json({ success: false, message: `There is Internal Server Error ${err}` })
    }
}

export const Login_Cont = async (req, res) => {
    const { panNumber, password } = req.body;

    try {

        const user = await SignUp.findOne({ panNumber });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.setPasswordss);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Invalid password" });
        }

        const isRegister = await Register.findOne({ firstApplicantPanNo: panNumber });

        const token = jwt.sign({ id: user._id, panNumber: user.panNumber },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        )

        // **ONE single response**
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                panNumber: user.panNumber,
                isRegistered: isRegister ? true : false
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "Something went wrong" });
    }
};
export default SignUp_Cont