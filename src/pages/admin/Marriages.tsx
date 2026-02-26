import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { getAllMarriagesApi } from "../../api/marriagesApi";

interface Marriage {
  _id: string;
  marriageName: string;
  marriageDate: string;
  location: string;
  adminMobileNumber: string;
  upiId: string;
  upiPayeeName: string;
  subscriptionExpiresAt: string;
  status: string;
  permissions: string;
}

const Marriages = () => {
  const [marriages, setMarriages] = useState<Marriage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarriages = async () => {
      try {
        const data = await getAllMarriagesApi();
        setMarriages(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarriages();
  }, []);

  const getStatusBadge = (marriage: Marriage) => {
    const isExpired =
      new Date(marriage.subscriptionExpiresAt) < new Date();

    if (isExpired) {
      return <span className="badge bg-danger">Expired</span>;
    }

    if (marriage.status === "active") {
      return <span className="badge bg-success">Active</span>;
    }

    return <span className="badge bg-secondary">Inactive</span>;
  };

  const getPermissionBadge = (permission: string) => {
    switch (permission) {
      case "approved":
        return <span className="badge bg-success">Approved</span>;
      case "pending":
        return <span className="badge bg-warning text-dark">Pending</span>;
      case "rejected":
        return <span className="badge bg-danger">Rejected</span>;
      default:
        return <span className="badge bg-secondary">{permission}</span>;
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold">Marriage Management</h3>

      <div className="row">
        {marriages.map((marriage) => (
          <div key={marriage._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold">
                  {marriage.marriageName}
                </h5>

                <p className="text-muted mb-2">
                  📍 {marriage.location}
                </p>

                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(marriage.marriageDate).toLocaleDateString()}
                </p>

                <p className="mb-1">
                  <strong>Mobile:</strong> {marriage.adminMobileNumber}
                </p>

                <p className="mb-1">
                  <strong>UPI:</strong> {marriage.upiId}
                </p>

                <p className="mb-1">
                  <strong>Subscription Ends:</strong>{" "}
                  {new Date(
                    marriage.subscriptionExpiresAt
                  ).toLocaleDateString()}
                </p>

                <div className="d-flex justify-content-between mt-3">
                  {getStatusBadge(marriage)}
                  {getPermissionBadge(marriage.permissions)}
                </div>

                <hr />

                <button className="btn btn-primary w-100">
                  Update Access
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marriages;