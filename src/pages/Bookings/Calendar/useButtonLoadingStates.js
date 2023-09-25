import React from "react";

export default (defaultStates) => {
	const [buttonStates, setButtonStates] = React.useState(defaultStates);

	return [
		buttonStates,
		(patch) => {
			setButtonStates((buttonStates) => {
				const patchedButtonStates = { ...buttonStates };

				Object.entries(patch).forEach(([name, value]) => {
					patchedButtonStates[name] = value;
				});

				return patchedButtonStates;
			});
		},
	];
};
