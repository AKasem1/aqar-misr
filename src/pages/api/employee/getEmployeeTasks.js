import Property from "@/pages/models/Property";
import mongoose from "mongoose";

const handler = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const { employeeId } = req.query;

            if (!employeeId) {
                throw Error('Employee ID is required');
            }

            await mongoose.connect(process.env.MONGO_URL);

            const properties = await Property.find({
                assignedEmployees: employeeId
            })

            console.log("Assigned Properties: ", properties)
            

            res.status(200).json(properties);
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error fetching employee tasks:', error);
        res.status(400).json({ message: error.message });
    }
};

export default handler; 