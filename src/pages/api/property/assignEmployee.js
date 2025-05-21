import mongoose from "mongoose";
import Admin from "@/pages/models/Admin";
import Property from "@/pages/models/Property";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { requestId, employeeId } = req.body;

    if (!requestId || !employeeId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await mongoose.connect(process.env.MONGO_URL);
    
    // Verify employee exists
    const employee = await Admin.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "الموظف غير موجود" });
    }

    // Verify property request exists
    const propertyRequest = await Property.findById(requestId);
    if (!propertyRequest) {
      return res.status(404).json({ message: "الطلب غير موجود" });
    }

    // Check if employee is already assigned
    if (propertyRequest.assignedEmployees?.includes(employeeId)) {
      return res.status(400).json({ message: "الطلب معين لموظف بالفعل" });
    }

    // Update the property request with the assigned employee
    const updatedProperty = await Property.findByIdAndUpdate(
      requestId,
      { 
        $push: { 
          assignedEmployees: employeeId
        },
        $set: {
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "فشل تحديث الطلب" });
    }

    return res.status(200).json({ 
      message: "تم تعيين الموظف بنجاح",
      data: updatedProperty 
    });

  } catch (error) {
    console.error("Error assigning employee:", error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "معرف غير صالح" });
    }
    return res.status(500).json({ message: "خطأ في الخادم" });
  }
} 