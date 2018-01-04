import API from "./API"

let User = {
	name: "scraper"
}

API.createUser(User)
	.then(res => {
		User._id = res.data._id
		console.log("User Created or Found", User);
	})
	.catch(err => console.log(err));

// API.getUser(User.name)	
// 	.then(res => {
// 		if (res.data.length > 0) {
// 			User._id = res.data[0]._id;
// 			console.log("Default user already exists", User);
// 			return false;
// 		} else {
// 			return API.createUser(User);
// 		}
// 	})
// 	.then(res => {
// 		if (res) {
// 			User._id = res.data._id;
// 			console.log("Default user created", User);
// 		}
// 	})
// 	.catch(err => {
// 		console.log(err)
// 	});

export default User;