import { H1 } from "../../components";
import { useStore } from "../../store";

const ProtectedPage = () => {
  const { exampleFormState, firstName, lastName } = useStore();

  return (
    <div className="container mb-10">
      <H1>Protected Route</H1>
      <div>This is a protected route.</div>

      <pre>{JSON.stringify(exampleFormState, null, 2)}</pre>

      <dl className="divide-y divide-gray-100">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            First Name
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {firstName}
          </dd>
        </div>

        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            Last Name
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {lastName}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ProtectedPage;
