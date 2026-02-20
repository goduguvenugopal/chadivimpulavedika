import type { SubmitEventHandler } from "react";
import ButtonLoader from "../common/ButtonLoader";
import InputField from "../ui/InputField";




interface MarriageFormData {
  marriageName: string;
  marriageDate: string;
  location: string;
  adminMobileNumber: string;
  upiId: string;
  upiPayeeName: string;
}

 interface Props {
  form: MarriageFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  loading: boolean;
  buttonText: string;
}


const MarriageForm = ({
  form,
  onChange,
  onSubmit,
  loading,
  buttonText,
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