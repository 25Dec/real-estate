export const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
export const convertDateTime = (rawDateTime) => {
	let result = new Date(rawDateTime);
	return result.toLocaleString();
};

export const getYearMonthDay = (rawDateTime) => {
	let date = new Date(rawDateTime);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	return `${year}-${month}-${day}`;
};

export const hideLongText = (text) => {
	const words = text.split(' ');

	if (words.length > 15) {
		// Cắt bớt mảng từ, chỉ giữ lại 15 từ đầu tiên
		words.length = 15;
		words.push('...');
		const hiddenText = words.join(' ');
		return hiddenText;
	}
	return text;
};
