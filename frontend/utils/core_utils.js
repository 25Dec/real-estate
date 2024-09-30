export const capitalize = (str) => {
	if (str === '') {
		return '';
	}

	return str
		.split(' ')
		.map((word) => {
			if (word.includes('_')) {
				return word
					.split('_')
					.map((part) => {
						return part.charAt(0).toUpperCase() + part.slice(1);
					})
					.join(' ');
			}
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ');
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

export const addDaysToDate = (beginPayment, flag_time) => {
	// Chuyển đổi beginPayment từ chuỗi thành đối tượng Date
	let date = new Date(beginPayment);

	// Cộng thêm flag_time ngày vào đối tượng Date
	date.setDate(date.getDate() + flag_time);

	// Định dạng lại ngày thành chuỗi định dạng mong muốn
	let options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	};

	return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const isPaymentDueTodayOrTomorrow = (paymentDueTime) => {
	let paymentDate = new Date(paymentDueTime);

	// Lấy ngày hôm nay
	let today = new Date();
	let todayStr = today.toDateString();

	// Lấy ngày mai
	let tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);
	let tomorrowStr = tomorrow.toDateString();

	// So sánh paymentDate với ngày hôm nay và ngày mai
	let paymentDateStr = paymentDate.toDateString();
	return paymentDateStr === todayStr || paymentDateStr === tomorrowStr;
};
