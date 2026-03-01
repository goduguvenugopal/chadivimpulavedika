import ButtonLoader from "../common/ButtonLoader";
import InputField from "../ui/InputField";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface MarriageFormData {
  marriageName: string;
  marriageDate: string;
  location: string;
  adminMobileNumber: string;
  password: string;
  upiId: string;
  upiPayeeName: string;
}
interface Props {
  form: MarriageFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  buttonText: string;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdate?: boolean; // ✅ NEW
}

const MarriageForm = ({
  form,
  onChange,
  onSubmit,
  loading,
  buttonText,
  showPassword,
  setShowPassword,
  isUpdate = false,
}: Props) => {
  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-5">
      <InputField
        label="Marriage Name"
        name="marriageName"
        value={form.marriageName}
        onChange={onChange}
        placeholder="Shiva Weds Pavani"
      />

      <InputField
        label="Marriage Date"
        name="marriageDate"
        type="date"
        value={form.marriageDate}
        onChange={onChange}
        placeholder="02-04-2026"
      />

      <InputField
        label="Location"
        name="location"
        value={form.location}
        onChange={onChange}
        placeholder="Kurnool, Andhra pradesh"
      />

      <InputField
        label="Mobile Number"
        name="adminMobileNumber"
        value={form.adminMobileNumber}
        onChange={onChange}
        maxLength={10}
        inputMode="numeric"
        placeholder="Ex : 9477778866"
        disabled={isUpdate} // ✅ DISABLED IN UPDATE
      />

      {/* 🔐 Password Field */}
      <div className="relative md:col-span-2">
        <label className="block text-sm font-medium mb-1">Password</label>

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="example: Pass@123"
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 pr-10 disabled:bg-gray-100"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] text-gray-500"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      <InputField
        label="UPI ID"
        name="upiId"
        value={form.upiId}
        onChange={onChange}
        placeholder="Example: venugopal@ybl"
      />

      <InputField
        label="UPI Payee Name"
        name="upiPayeeName"
        value={form.upiPayeeName}
        onChange={onChange}
        placeholder="Example: Venugopal"
      />

      <div className="md:col-span-2 mt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl"
        >
          {loading ? <ButtonLoader /> : buttonText}
        </button>
      </div>
    </form>
  );
};

export default MarriageForm;
