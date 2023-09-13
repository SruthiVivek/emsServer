const { response } = require("express")
const employees = require("../models/emsModel")


// all logics

// register logic

employeeRegister = async (req, res) => {

    const file = req.file.filename

    const { fname, lname, email, mobile, gender, status, location } = req.body

    if (!fname || !lname || !email || !file || !mobile || !gender || !status || !location) {
        res.status(404).json("all inputs are required")
    }

    try {
        const preEmployee = await employees.findOne({ email })

        if (preEmployee) {
            res.status(403).json("employee already present")
        }
        else {
            // create object for new employee
            const newEmployee = new employees({ fname, lname, email, mobile, gender, status, profile: file, location })
            await newEmployee.save()

            res.status(200).json(newEmployee)

        }
    }
    catch {
        res.status(400).json("logic error")
    }
}
// logic to get all employees
getAllEmployees = async (req, res) => {
    // access search data from req query
    const { search } = req.query

    //  regular expression query
    const query = {
        fname: { $regex: search, $options: 'i' }
    }

    try {
        const allEmployees = await employees.find(query)
        res.status(200).json(allEmployees)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
// logic to get one employee
getEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const employee = await employees.findOne({ _id: id })
        res.status(200).json(employee)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

// logic to remove employee
removeEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const removedEmp = await employees.findByIdAndDelete({ _id: id })
        res.status(200).json(removedEmp)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

// logic for update employee
editEmployee = async (req, res) => {
    const { id } = req.params
    const { fname, lname, email, mobile, gender, status, location ,user_profile} = req.body

    const file = req.file?req.file.filename:user_profile    

    if (!fname || !lname || !email || !mobile || !gender || !status || !location) {
        res.status(404).json("all inputs are required")
    }

    try {
        const user = await employees.findOne({ _id: id })
        if (user) {
            // update all values with new data
            user.fname = fname
            user.lname = lname
            user.email = email
            user.mobile = mobile
            user.gender = gender
            user.status = status
            user.location = location
            user.profile = file

            // save
            user.save()
            res.status(200).json(user)
        }
    }
    catch {
        res.status(400).json(err)
    }
}




module.exports = { employeeRegister, getAllEmployees, getEmployee, removeEmployee,editEmployee }