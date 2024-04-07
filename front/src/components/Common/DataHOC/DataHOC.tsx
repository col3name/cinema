import React from 'react';

import Paragraph from '@/components/Common/Paragraph';

const Loader = ({text = ''}) => <div>Loading {text}...</div>;
const Error = ({error}) => <div>Error: {error}</div>;

const DataHOC = (props) => {
  const {
    data,
    isLoading,
    children,
    loaderText = '',
    error = '',
    loaderComponent = Loader,
    errorComponent = Error
  } = props;

  if (isLoading) {
    const LoaderComp = loaderComponent;
    return <LoaderComp text={loaderText}/>;
  }

  if (error) {
    const ErrorComponent = errorComponent;
    return <ErrorComponent error={error}/>
  }

  if (!data) {
    return <Paragraph>Not found</Paragraph>;
  }

  return (
    <>
      {children}
    </>
  );
}

export default DataHOC;