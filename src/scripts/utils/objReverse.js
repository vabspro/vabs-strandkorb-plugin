export const objReverse = (obj) => {
	let new_obj = {};
	let rev_obj = Object.keys(obj).reverse();
	rev_obj.forEach(function (i) {
		new_obj[i] = obj[i];
	});
	return new_obj;
};
