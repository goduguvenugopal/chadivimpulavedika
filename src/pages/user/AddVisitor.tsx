import VisitorForm from "../../components/forms/VisitorForm";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { addVisitorApi } from "../../api/visitorApi";
import { FiHome } from "react-icons/fi";

const AddVisitor = () => {
  const { user } = useAuth();

  const handleSubmit = async (data: any) => {
    await addVisitorApi(data);
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 p-5">
      <div className="w-full max-w-lg lg:w-screen">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 flex items-center gap-2 w-full lg:justify-start justify-center">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-rose-500 transition"
          >
            <FiHome />
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Add Visitor</span>
        </div>

        {/* Telugu Heading */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            మీ చదివింపులు నమోదు చేయండి
          </h1>
          <p className="text-gray-500">
            మీ ఆశీస్సులు మరియు బహుమతులను నమోదు చేయండి
          </p>
        </div>

        <VisitorForm
          onSubmit={handleSubmit}
          authUser={{
            upiId: user.upiId,
            upiPayeeName: user.upiPayeeName,
          }}
        />
      </div>
    </div>
  );
};

export default AddVisitor;
