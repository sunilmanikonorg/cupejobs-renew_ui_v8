"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { logger } from "@/lib/default-logger";
import { setActiveAccount } from "@/lib/msal";
import {paths} from "@/paths";
import {getNotifications} from "@/lib/api/notification";

const MsalCallbackHandler = () => {
	const { instance, accounts } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	const router = useRouter();

	useEffect(() => {
		const handleRedirect = async () => {
			try {
				// MSAL instance needs to be fully initialized before using MSAL's redirect APIs
				// useIsAuthenticated helps ensure the user's authentication state is checked only after MSAL is fully initialized.
				if(isAuthenticated) {
					const response = await instance.handleRedirectPromise();
					if (response) {
						logger.debug("Redirect Login Successful:", response);
						setActiveAccount(instance, accounts);
						const notifications = await getNotifications(response.accessToken);
						console.log('notifications', notifications);
						router.push(paths.dashboard.overview);
					}
				}
			} catch (error) {
				console.error("Error handling redirect:", error);
			}
		};

		handleRedirect();
	}, [accounts, instance, isAuthenticated, router]);

	return null;
};

export default MsalCallbackHandler;
