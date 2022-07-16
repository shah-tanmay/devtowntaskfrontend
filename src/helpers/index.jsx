import { Navigate, Route } from "react-router-dom";
import faker from "faker";

export const ProtectedRoute = ({ email, children, ...restProps }) => {
  return (
    <Route
      {...restProps}
      render={({ location }) => {
        if (email) {
          return children;
        }

        if (!email) {
          return <Navigate to="/" replace />;
        }

        return null;
      }}
    />
  );
};

const bills = [];
export const generateBills = (owner) => {
  for (let bill = 0; bill <= 10; bill++) {
    const title = faker.random.alphaNumeric(10);
    const amount = faker.random.number({
      min: 100,
      max: 3000,
    });
    const unitsConsumed = faker.random.number({ min: 1, max: 20 });
    const dueDate = faker.date.future();
    const pendingAmount = faker.random.number({
      min: 0,
      max: amount,
    });
    bills.push({
      title,
      amount,
      unitsConsumed,
      dueDate,
      pendingAmount,
      owner,
    });
  }
  return bills;
};
