"use client";

import * as React from "react";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/config/msal";

export function AuthProvider({ children }) {
	return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}