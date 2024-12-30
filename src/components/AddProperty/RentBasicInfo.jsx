import React, { useEffect, useState } from 'react';
import TextInput from '@/components/form/TextInput';
import CheckBox from '@/components/form/CheckBox';
import Select from '@/components/form/Select';
import NumberInput from '@/components/form/NumberInput';
import Swal from 'sweetalert2'
import imgUpload from "@/pages/util/imgUpload";
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import {
  Building,
  Banknote,
  Image,
  Bath,
  Bed,
  Square,
  Sofa,
  House,
  CookingPot,
  ArrowsUpFromLine,
  Trees,
  AirVent,
  Heater,
  Receipt,
  Camera,
  MapPinHouse,
  MapPinned 
} from 'lucide-react';
import ExpandingTextarea from '@/components/form/ExpandingTextarea';

const RentBasicInfo = (type) => {
  const router = useRouter();
  let contractType = type.type;
  const [uploadStatus, setUploadStatus] = useState('idle')
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    contractType = type.type;
  }, [type]);

  const [formState, setFormState] = useState({
    propertyName: '',
    propertyType: '',
    propertyDescription: '',
    image: '',
    currentPrice: '',
    propertyArea: '',
    bathrooms: 0,
    rooms: 0,
    location: '',
    city: '',
    hasKitchen: false,
    hasGarden: false,
    hasElevator: false,
    hasCameras: false,
    hasMeters: false,
    hasHeating: false,
    hasAC: false,
    isFurnished: false,
    contractType,
    userId: ''
  });

  const [errors, setErrors] = useState({
    propertyName: false,
    propertyType: false,
    currentPrice: false,
    propertyArea: false,
  });

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleCheckboxChange = (field) => {
    setFormState((prev) => {
      return {
        ...prev,
        [field]: !prev[field],
      };
    });
  };

  const validateForm = () => {
    const newErrors = {
      propertyName: formState.propertyName.trim() === '',
      propertyType: formState.propertyType.trim() === '',
      currentPrice: formState.currentPrice.trim() === '',
      propertyArea: formState.propertyArea.trim() === '',
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setUploadStatus('uploading');
      try {
        const imageUrl = await imgUpload(image);
        setFormState({ ...formState, image: imageUrl });
        setUploadStatus('uploaded');
      } catch (error) {
        console.error('Image upload failed:', error);
        setUploadStatus('حدث خطأ أثناء رفع الصورة');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formState.contractType = contractType;
    formState.userId = user._id;
    console.log("Property info: ", formState)
    try {
      const response = await fetch("/api/property/addRent", {
        method: "POST",
        body: JSON.stringify(formState),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        Swal.fire(data.message, '', 'error')
        throw new Error(data.message || "Something went wrong!");
      }
      Swal.fire('تم إضافة العقار بنجاح', '', 'success');
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="border rounded-lg p-6 lg:p-24 space-y-5"
      dir="rtl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl text-center font-bold mb-4">{contractType == 'إيجار' ? 'معلومات الإيجار' : 'معلومات التمليك'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="اسم العقار"
          placeholder="اسم العقار"
          isRequired={true}
          value={formState.propertyName}
          onChange={(e) => handleInputChange('propertyName', e.target.value)}
          errorMsg={errors.propertyName ? 'Please provide the property name' : ''}
          labelIcon={<Building className="size-4" />}
        />
        <Select
          label="نوع العقار"
          options={[
            { value: 'شقة', label: 'شقة' },
            { value: 'فيلا', label: 'فيلا' },
            { value: 'مكتب', label: 'مكتب' },
          ]}
          isRequired={true}
          value={formState.propertyType}
          onChange={(value) => handleInputChange('propertyType', value)} 
          errorMsg={errors.propertyType ? 'Please select the property type' : ''}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberInput
          label={contractType == 'إيجار' ? "سعر الايجار الشهري الحالى" : "سعر العقار"}
          placeholder={contractType == 'إيجار' ? "سعر الايجار الشهري الحالى" : "سعر العقار"}
          isRequired={true}
          value={formState.currentPrice}
          onChange={(e) => handleInputChange('currentPrice', e.target.value)}
          errorMsg={
            errors.currentPrice ? 'Please provide the property rent price' : ''
          }
          labelIcon={<Banknote className="size-4" />}
        />
        <TextInput
          label="عنوان العقار"
          placeholder="عنوان العقار"
          isRequired={true}
          value={formState.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          errorMsg={errors.location ? 'Please provide the property location' : ''}
          labelIcon={<MapPinHouse className="size-4" />}
        />
        <TextInput
          label="المدينة"
          placeholder=" المدينة"
          isRequired={true}
          value={formState.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          errorMsg={errors.city ? 'Please provide the property city' : ''}
          labelIcon={<MapPinned className="size-4"/>}
        />
      </div>
      <div className="space-y-2 w-full md:w-2/4">
        <label htmlFor="file_input" className="block mb-2 text-md font-semibold text-gray-900 dark:text-white">
          صورة العقار
        </label>
        <div className="flex border p-2 rounded-xl items-center">
          <input
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            id="file_input"
            type="file"
            onChange={handleImageUpload}
          />
          <Image className="mr-2 p-px text-gray-400" />
        </div>
        <div className="mt-2 flex items-center">
            {uploadStatus === 'uploading' && (
              <span className="text-yellow-500 text-sm">Uploading...</span>
            )}
            {uploadStatus === 'uploaded' && (
              <span className="text-green-500 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span>Uploaded</span>
              </span>
            )}
            {uploadStatus === 'error' && (
              <span className="text-red-500 text-sm">حدث خطأ</span>
            )}
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NumberInput
          label="المساحة بالمتر"
          placeholder="المساحة بالمتر"
          isRequired={true}
          value={formState.propertyArea}
          onChange={(e) => handleInputChange('propertyArea', e.target.value)}
          errorMsg={errors.propertyArea ? 'Please provide the property area' : ''}
          labelIcon={<Square className="size-4" />}
        />
        <NumberInput
          label="عدد الحمامات"
          placeholder="عدد الحمامات"
          value={formState.bathrooms}
          onChange={(e) => handleInputChange('bathrooms', e.target.value)}
          errorMsg={''}
          labelIcon={<Bath className="size-4" />}
        />
        <NumberInput
          label="عدد الغرف"
          placeholder="عدد الغرف"
          value={formState.rooms}
          onChange={(e) => handleInputChange('rooms', e.target.value)}
          errorMsg={''}
          labelIcon={<Bed className="size-4" />}
        />
      </div>

      <h2 className="text-xl text-center font-bold">الوصف</h2>
      <ExpandingTextarea
        label=" الوصف العام للعقار"
        placeholder="الوصف العام"
        isRequired={true}
        value={formState.propertyDescription}
        onChange={(e) => handleInputChange('propertyDescription', e.target.value)}
        labelIcon={<Building className="size-4" />}/>

      <h2 className="text-xl text-center font-bold mb-4">مميزات العقار</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
        <CheckBox
          label="العقار مفروش ؟"
          checked={formState.isFurnished}
          onChange={() => handleCheckboxChange('isFurnished')}
          labelIcon={<Sofa className="size-4" />}
        />
        <CheckBox
          label="يوجد مطبخ ؟"
          checked={formState.hasKitchen}
          onChange={() => handleCheckboxChange('hasKitchen')}
          labelIcon={<CookingPot className="size-4" />}
        />
        <CheckBox
          label="يوجد حديقة خلفية ؟"
          checked={formState.hasGarden}
          onChange={() => handleCheckboxChange('hasGarden')}
          labelIcon={<Trees className="size-4" />}
        />
        <CheckBox
          label="يوجد مصعد ؟"
          checked={formState.hasElevator}
          onChange={() => handleCheckboxChange('hasElevator')}
          labelIcon={<ArrowsUpFromLine className="size-4" />}
        />
        <CheckBox
          label="يوجد تكيف ؟"
          checked={formState.hasAC}
          onChange={() => handleCheckboxChange('hasAC')}
          labelIcon={<AirVent className="size-4" />}
        />
        <CheckBox
          label="يوجد سخان ؟"
          checked={formState.hasHeating}
          onChange={() => handleCheckboxChange('hasHeating')}
          labelIcon={<Heater className="size-4" />}
        />
        <CheckBox
          label="يوجد عدادات ؟"
          checked={formState.hasMeters}
          onChange={() => handleCheckboxChange('hasMeters')}
          labelIcon={<Receipt className="size-4" />}
        />
        <CheckBox
          label="يوجد كاميرات ؟"
          checked={formState.hasCameras}
          onChange={() => handleCheckboxChange('hasCameras')}
          labelIcon={<Camera className="size-4" />}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg py-2 mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default RentBasicInfo;
