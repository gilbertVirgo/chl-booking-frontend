export default (searchValue, { firstname, lastname, email }) =>
	[firstname, lastname, email].find((v) => v.includes(searchValue)) !==
	undefined;
