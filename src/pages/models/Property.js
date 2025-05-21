import mongoose from "mongoose";
import User from "@/pages/models/User";

const PropertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
  },
  propertyDescription: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['شقة', 'فيلا', 'مكتب', 'محل'],
    trim: true
  },
  assignedEmployees: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Employee',
    default: []
  },
  seller: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    }
  },
  city: {
    type: String,
    required: true,
    enum: [
      "الأقصر",
      "أسوان",
      "الأسيوط",
      "البحيرة",
      "بورسعيد",
      "الجيزة",
      "الدقهلية",
      "القاهرة",
      "القليوبية",
      "المنيا",
      "المنوفية",
      "الوادى الجديد",
      "اسكندرية",
      "اسماعيلية",
      "السويس",
      "شمال سيناء",
      "جنوب سيناء",
      "سوهاج",
      "قنا",
      "كفر الشيخ",
      "مطروح",
      "الغردقة",
      "البحر الأحمر",
    ],
  },
  contractType: {
    type: String,
    enum: ['إيجار', 'تمليك'],
    required: true,
  },
  installmentAmount: {
    type: Number,
  },
  upFrontPayment: {
    type: Number,
  },
  yearsOfInstallments: {
    type: Number,
  },
  propertyGroup: {
    type: String,
    required: true,
  },
  propertyBuilding: {
    type: String,
    required: true,
  },
  propertyNumber: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true
  },
  propertyArea: {
    type: Number,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  features: {
    hasKitchen: {
      type: Boolean,
      default: false
    },
    hasGarden: {
      type: Boolean,
      default: false
    },
    hasElevator: {
      type: Boolean,
      default: false
    },
    hasCameras: {
      type: Boolean,
      default: false
    },
    hasMeters: {
      type: Boolean,
      default: false
    },
    hasHeating: {
      type: Boolean,
      default: false
    },
    hasAC: {
      type: Boolean,
      default: false
    },
    isFurnished: {
      type: Boolean,
      default: false
    }
  },
  accepted: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  }
}, { timestamps: true });

const Property = mongoose.models.Property || mongoose.model('Property', PropertySchema);
export default Property;
