module.exports.home = function (req, res) {
	// return res.end('<h1> Express is up for PipeMaster');

	// console.log(req.cookies);
	// res.cookie('akshay', 44200);
	return res.render("home", {
		title: "Home",
	});
};

//creating controller
// module.exports.actionNameee = function(req, res){}
