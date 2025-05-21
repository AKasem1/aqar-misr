import Admin from "@/pages/models/Admin";
import Property from "@/pages/models/Property";
import mongoose from "mongoose";

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            await mongoose.connect(process.env.MONGO_URL);
            
            // Get all employees
            const employees = await Admin.find({ type: 'employee' });

            // Get all properties
            const properties = await Property.find({});

            // Map employees with their assigned properties
            const employeesWithProperties = employees.map(employee => {
                const assignedProperties = properties.filter(property => 
                    property.assignedEmployees.includes(employee._id.toString())
                );

                return {
                    ...employee.toObject(),
                    assignedProperties
                };
            });

            res.status(200).json({
                success: true,
                data: employeesWithProperties
            });
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(400).json({ message: error.message });
    }
};

export default handler;
