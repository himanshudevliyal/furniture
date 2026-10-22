"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";

export default function ProductProvider({ children }) {
  // Lazily create the store once per browser session.
  const [store] = useState(makeStore);

  return <Provider store={store}>{children}</Provider>;
}
