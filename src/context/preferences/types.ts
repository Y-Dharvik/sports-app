
export interface UserPreferences {
	preferredSport: string[];
	preferredTeams: string[];
}

export interface PreferencesState {
	preferences: UserPreferences;
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
}

export const initialPreferencesState: PreferencesState = {
	preferences: {
	  preferredSport: [],
	  preferredTeams: [],
	},
	isLoading: false,
	isError: false,
	errorMessage: "",
  };