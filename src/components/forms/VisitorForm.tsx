import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

interface VisitorFormProps {
  initialData?: any; // for update
  onSubmit: (data: any) => Promise<void>;
  authUser: {
    upiId: string;
    upiPayeeName: string;
  };
  isEdit?: boolean;
}

const VisitorForm = ({
  initialData,
  onSubmit,
  authUser,
  isEdit = false,
}: VisitorFormProps) => {
  const initialFormState = {
    visitorName: "",
    amount: "",
    address: "",
    giftGiven: false,
    notes: "best wishes",
    paymentMode: "" as "CASH" | "UPI" | "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const [loading, setLoading] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Generate UPI QR
  useEffect(() => {
    if (!showUpiModal) return;

    const upiUrl = `upi://pay?pa=${authUser.upiId}&pn=${authUser.upiPayeeName}&am=${formData.amount}&cu=INR`;

    QRCode.toDataURL(upiUrl).then(setQrCodeUrl);
  }, [showUpiModal, formData.amount, authUser]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    // Open modal immediately when UPI selected
    if (name === "paymentMode" && value === "UPI") {
      if (!formData.amount || Number(formData.amount) <= 0) {
        toast.info("Please enter amount before selecting UPI");
        return;
      }
      setShowUpiModal(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.paymentMode === "UPI") {
      setShowUpiModal(true);
      return;
    }

    try {
      setLoading(true);

      await onSubmit(formData);

      toast.success("Visitor added successfully");

      setFormData(initialFormState);
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Visitor adding failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const confirmUpiPayment = async () => {
    try {
      setLoading(true);

      await onSubmit({ ...formData, paymentMode: "UPI" });

      toast.success("Visitor Added Successfully");

      setShowUpiModal(false);
      setFormData(initialFormState);
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        error?.message ||
        "Visitor added failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        {/* Visitor Name */}
        <div className="relative">
          <input
            name="visitorName"
            required
            value={formData.visitorName}
            onChange={handleChange}
            className="peer w-full border border-gray-400 rounded-xl px-4 pt-6 pb-2 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
            placeholder="Visitor Name"
          />
          <label
            className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
      peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm 
      peer-focus:text-rose-500"
          >
            Visitor Name
          </label>
        </div>

        {/* Amount */}
        <div className="relative">
          <input
            name="amount"
            type="number"
            min={1}
            required
            value={formData.amount}
            onChange={handleChange}
            className="peer w-full border border-gray-400 rounded-xl px-4 pt-6 pb-2 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
            placeholder="Amount"
          />
          <label
            className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
      peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm 
      peer-focus:text-rose-500"
          >
            Amount (₹)
          </label>
        </div>

        {/* Address */}
        <div className="relative">
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="peer w-full border border-gray-400 rounded-xl px-4 pt-6 pb-2 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition"
            placeholder="Address"
          />
          <label
            className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
      peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm 
      peer-focus:text-rose-500"
          >
            Address
          </label>
        </div>

        {/* Notes */}
        <div className="relative">
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            className="peer w-full border border-gray-400 rounded-xl px-4 pt-6 pb-2 text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition resize-none"
            placeholder="Notes"
          />
          <label
            className="absolute left-4 top-2 text-sm text-gray-500 transition-all 
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
      peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm 
      peer-focus:text-rose-500"
          >
            Notes
          </label>
        </div>

        {/* Gift Given */}
        <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-400">
          <span className="text-gray-700 font-medium">Gift Given</span>
          <input
            type="checkbox"
            name="giftGiven"
            checked={formData.giftGiven}
            onChange={handleChange}
            className="h-5 w-5 accent-rose-500"
          />
        </div>

        {/* Payment Mode */}
        <div className="relative">
          <select
            name="paymentMode"
            required
            value={formData.paymentMode}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition bg-white"
          >
            <option value="">Select Payment Mode</option>
            <option value="CASH">Cash</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200 disabled:opacity-60"
        >
          {loading
            ? "Processing..."
            : isEdit
              ? "Update Visitor"
              : "Add Visitor"}
        </button>
      </form>

      {/* UPI MODAL */}
      {showUpiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center bg-[url('/bg-image.png')] bg-cover bg-center bg-no-repeat">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-xl w-80 text-center"
          >
            <h2 className="text-lg font-semibold mb-4">Scan & Pay</h2>

            {qrCodeUrl && (
              <img src={qrCodeUrl} alt="UPI QR" className="mx-auto mb-4" />
            )}

            <p className="mb-2 font-medium">₹ {formData.amount}</p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setShowUpiModal(false);
                  setFormData((prev) => ({ ...prev, paymentMode: "" }));
                }}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={confirmUpiPayment}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                {loading ? "Saving..." : "Payment Done"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default VisitorForm;
