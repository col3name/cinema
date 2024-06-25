import React from "react";

import Paragraph from "@/shared/ui/Paragraph";

export const Loader = ({ text = "" }: { text: string }) => (
  <div>Loading {text}...</div>
);

export const ErrorComp = ({ error }: { error: string }) => <div>Error: {error}</div>;

interface DataHOCProps {
  data: object;
  isLoading?: boolean;
  children: React.ReactNode;
  loaderText?: string;
  error?: string;
  loaderComponent?: React.FC;
  errorComponent?: React.FC;
}

const DataHOC: React.FC<DataHOCProps> = ({
  data,
  isLoading,
  children,
  loaderText = "",
  error = "",
  loaderComponent = Loader,
  errorComponent = ErrorComp,
}) => {
  if (isLoading) {
    const LoaderComponent = loaderComponent;
    // @ts-ignore
    return <LoaderComponent text={loaderText} />;
  }

  if (error) {
    const ErrorComponent = errorComponent;
    // @ts-ignore
    return <ErrorComponent error={error} />;
  }

  if (!data) {
    return <Paragraph>Not found</Paragraph>;
  }

  return <>{children}</>;
};

export default DataHOC;
