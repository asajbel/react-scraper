import API from "./API"

let User = {
	name: "scraper"
}

API.getUser(User.name)	
	.then(res => {
		if (res.data.length > 0) {
			User.id = res.data._id;
			console.log("Default user already exists");
			return false;
		} else {
			return API.createUser(User);
		}
	})
	.then(res => {
		if (res) {
			console.log("Default user created");
			User.id = res.data._id;
		}
	})
	.catch(err => {
		console.log(err)
	});

export default User;