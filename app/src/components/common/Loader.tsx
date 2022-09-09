import React from "react";
import { Center, Spinner } from "native-base";

/**
 * Renders a loading spinner.
 * @constructor Creates a LoadingSpinner.
 */
export default function Loader() {
  return (
    <Center flex={1}>
      <Spinner testID="loader" size="lg" />
    </Center>
  );
}
