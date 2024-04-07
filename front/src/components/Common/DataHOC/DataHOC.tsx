import React from "react";

import Paragraph from "@/components/Common/Paragraph";

const Loader = ({ text = "" }: { text: string }) => (
  <div>Loading {text}...</div>
);
const Error = ({ error }: { error: string }) => <div>Error: {error}</div>;

interface DataHOCProps {
  data: object;
  isLoading?: boolean;
  children: React.ReactNode;
  loaderText?: string;
  error?: string;
  loaderComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

const DataHOC: React.FC<DataHOCProps> = ({
  data,
  isLoading,
  children,
  loaderText = "",
  error = "",
  loaderComponent = Loader,
  errorComponent = Error,
}) => {
  if (isLoading) {
    const LoaderComponent = loaderComponent;
    return <LoaderComponent text={loaderText} />;
  }

  if (error) {
    const ErrorComponent = errorComponent;
    return <ErrorComponent error={error} />;
  }

  if (!data) {
    return <Paragraph>Not found</Paragraph>;
  }

  return <>{children}</>;
};

export default DataHOC;
