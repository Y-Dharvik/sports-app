import { API_ENDPOINT } from "../../config/constants";


export const fetchPreferences = async (dispatch: any) => {
	try {
		dispatch({ type: "FETCH_PREFERENCES_REQUEST" });
		const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			throw new Error("Failed to fetch preferences");
		}

		const data = await response.json();

		dispatch({ type: "FETCH_PREFERENCES_SUCCESS", payload: data });
	}
	catch (error) {
		dispatch({ type: "FETCH_PREFERENCES_FAILURE", payload: "Unable to fetch preferences" });
	}
}

export const setPreferences = async (dispatch: any, preferences: any) => {
	try {
		dispatch({ type: "SET_PREFERENCES_REQUEST" });
		const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(preferences),
		});

		if (!response.ok) {
			throw new Error("Failed to set preferences");
		}

		const data = await response.json();

		dispatch({ type: "SET_PREFERENCES_SUCCESS", payload: data });
	}
	catch (error) {
		dispatch({ type: "SET_PREFERENCES_FAILURE", payload: "Unable to set preferences" });
	}
}


        