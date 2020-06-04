let eventInfo = {
	name: "My testing party",
	date: "2020-02-28",
	startTime: "6 : 00 PM",
	budget:5000,
	location: "My House",
	address: "1010 Walnut Ave",
	private: 1,
	adultGuests: 30,
	childGuests: 40
}

let testRegister = {
    "email": 'testaccount@celebratr.co',
    "firstName": "Test",
    "lastName": "User",
    "password": "password",
}

Object.freeze(testRegister)
Object.freeze(eventInfo)


module.exports = {testRegister, eventInfo}