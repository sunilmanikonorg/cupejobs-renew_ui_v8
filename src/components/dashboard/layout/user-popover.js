"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { CreditCard as CreditCardIcon } from "@phosphor-icons/react/dist/ssr/CreditCard";
import { LockKey as LockKeyIcon } from "@phosphor-icons/react/dist/ssr/LockKey";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";

import { LOGIN_SCOPE } from "@/config/msal";
import { paths } from "@/paths";
import { logger } from "@/lib/default-logger";
import { getUser } from "@/lib/msal";
import { toast } from "@/components/core/toaster";

// import { appConfig } from "@/config/app";
// import { AuthStrategy } from "@/lib/auth-strategy";

// const user = {
// 	id: "USR-000",
// 	name: "Sofia Rivers",
// 	avatar: "/assets/avatar.png",
// 	email: "sofia@devias.io",
// };

// function SignOutButton() {
// 	let signOutUrl = paths.home;
//
// 	if (appConfig.authStrategy === AuthStrategy.AUTH0) {
// 		signOutUrl = paths.auth.auth0.signOut;
// 	}
//
// 	if (appConfig.authStrategy === AuthStrategy.CLERK) {
// 		signOutUrl = paths.auth.clerk.signOut;
// 	}
//
// 	if (appConfig.authStrategy === AuthStrategy.COGNITO) {
// 		signOutUrl = paths.auth.cognito.signOut;
// 	}
//
// 	if (appConfig.authStrategy === AuthStrategy.CUSTOM) {
// 		signOutUrl = paths.auth.custom.signOut;
// 	}
//
// 	if (appConfig.authStrategy === AuthStrategy.SUPABASE) {
// 		signOutUrl = paths.auth.supabase.signOut;
// 	}
//
// 	return (
// 		<MenuItem component="a" href={signOutUrl} sx={{ justifyContent: "center" }}>
// 			Sign out
// 		</MenuItem>
// 	);
// }

function SignInButton() {
	const { instance } = useMsal();

	const handleSignIn = React.useCallback(async () => {
		try {
			if (!instance) {
				logger.error("MSAL instance is not initialized!");
				return;
			}

			await instance.loginRedirect(LOGIN_SCOPE).catch((error) => {
				logger.error("Login error:", error);
			});
		} catch (error) {
			logger.error("Sign in error", error);
			toast.error("Something went wrong, unable to sign in");
		}
	}, [instance]);

	return (
		<Box sx={{ p: 1 }}>
			<MenuItem component="div" onClick={handleSignIn} sx={{ justifyContent: "center" }}>
				Sign In
			</MenuItem>
		</Box>
	);
}

function SignOutButton() {
	const { instance } = useMsal();

	const handleSignOut = React.useCallback(async () => {
		try {
			await instance.logoutRedirect();
		} catch (error) {
			logger.error("Sign out error", error);
			toast.error("Something went wrong, unable to sign out");
		}
	}, [instance]);

	return (
		<Box sx={{ p: 1 }}>
			<MenuItem component="a" onClick={handleSignOut} sx={{ justifyContent: "center" }}>
				Sign out
			</MenuItem>
		</Box>
	);
}

// inProgress states: startup -> handleRedirect -> none
export function UserPopover({ anchorEl, onClose, open }) {
	const { instance, accounts, inProgress } = useMsal();
	const isAuthenticated = useIsAuthenticated();
	const user = getUser(instance);
	logger.debug("UserPopover", instance, accounts, inProgress, user);

	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			onClose={onClose}
			open={Boolean(open)}
			slotProps={{ paper: { sx: { width: "280px" } } }}
			transformOrigin={{ horizontal: "right", vertical: "top" }}
		>
			{isAuthenticated ? null : <SignInButton />}
			<Divider />
			{user !== undefined && (
				<Box sx={{ p: 2 }}>
					<Typography>{user.firstname}</Typography>
					<Typography>{user.lastname}</Typography>
					<Typography color="text.secondary" variant="body2">
						{user.email}
					</Typography>
				</Box>
			)}
			<Divider />
			<List sx={{ p: 1 }}>
				<MenuItem component={RouterLink} href={paths.dashboard.settings.account} onClick={onClose}>
					<ListItemIcon>
						<UserIcon />
					</ListItemIcon>
					Account
				</MenuItem>
				<MenuItem component={RouterLink} href={paths.dashboard.settings.security} onClick={onClose}>
					<ListItemIcon>
						<LockKeyIcon />
					</ListItemIcon>
					Security
				</MenuItem>
				<MenuItem component={RouterLink} href={paths.dashboard.settings.billing} onClick={onClose}>
					<ListItemIcon>
						<CreditCardIcon />
					</ListItemIcon>
					Billing
				</MenuItem>
			</List>
			<Divider />
			{isAuthenticated ? <SignOutButton /> : null}
		</Popover>
	);
}
