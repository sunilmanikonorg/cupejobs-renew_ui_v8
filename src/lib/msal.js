
export function setActiveAccount(instance, accounts) {
	// Account selection logic is app dependent. Adjust as needed for different use cases.
	// Setting up active account here, lets us use instance.getActiveAccount() to retrieve the active account when needed.
	if (accounts.length > 0) {
		instance.setActiveAccount(accounts[0]);
	}
}

export function getUser(instance) {
	const account = instance.getActiveAccount();
	if (account) {
		return {
			firstname: account.idTokenClaims.given_name,
			lastname: account.idTokenClaims.family_name,
			username: account.idTokenClaims.username,
			email: account.idTokenClaims.emails[0],
		}
	}
}