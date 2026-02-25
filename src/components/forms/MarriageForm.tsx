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
}

const MarriageForm = ({
  form,
  onChange,
  onSubmit,
  loading,
  buttonText,
  showPassword,
  setShowPassword,
}: Props) => {
  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-5">

      <InputField
        label="Marriage Name"
        name="marriageName"
        placeholder="Ex: Kalyan ❤️ Pavani"
        value={form.marriageName}
        onChange={onChange}
      />

      <InputField
        label="Marriage Date"
        name="marriageDate"
        type="date"
        value={form.marriageDate}
        onChange={onChange}
      />

      <InputField
        label="Location"
        name="location"
        placeholder="Ex: Hyderabad, Telangana"
        value={form.location}
        onChange={onChange}
      />

      <InputField
        label="Mobile Number"
        name="adminMobileNumber"
        placeholder="Enter 10-digit mobile number"
        value={form.adminMobileNumber}
        onChange={onChange}
        maxLength={10}
        inputMode="numeric"
      />

      {/* 🔐 Password Field */}
      <div className="relative md:col-span-2">
        <label className="block text-sm font-medium mb-1">
          Password
        </label>

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Create strong password"
          value={form.password}
          onChange={onChange}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 pr-10"
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
        placeholder="Ex: yourname@upi"
        value={form.upiId}
        onChange={onChange}
      />

      <InputField
        label="UPI Payee Name"
        name="upiPayeeName"
        placeholder="Ex: Rahul Kumar"
        value={form.upiPayeeName}
        onChange={onChange}
      />

      <div className="md:col-span-2 mt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl transition-all"
        >
          {loading ? <ButtonLoader /> : buttonText}
        </button>
      </div>
    </form>
  );
};

export default MarriageForm;