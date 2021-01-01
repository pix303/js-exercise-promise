function getResponseFromRemoteService1(): Promise<string> {
	console.log("set a request service 1");

	let p = new Promise<string>((resolve, reject) => {
		setTimeout(() => resolve("Hello "), 600);
	});

	return p;
}

function getResponseFromRemoteService2(): Promise<string> {
	console.log("set a request service 2");

	let p = new Promise<string>((resolve, reject) => {
		setTimeout(() => resolve("world"), 1500);
	});

	return p;
}

function getResponseFromRemoteService3(): Promise<string> {
	console.log("set a request service 3");

	let p = new Promise<string>((resolve, reject) => {
		setTimeout(() => resolve("!"), 500);
	});

	return p;
}

async function mainAsync() {
	try {
		console.log("start async");
		let res: string = await getResponseFromRemoteService1();
		res += await getResponseFromRemoteService2();
		res += await getResponseFromRemoteService3();
		console.log("response async = ", res);
		console.log("end async");
	} catch (error) {
		console.error(error);
	}
}

function mainPromises() {
	console.log("start promise chain");

	let res = "";
	getResponseFromRemoteService1()
		.then((response) => {
			console.log("--> 1", response, res, "<--");
			res = response;
			return getResponseFromRemoteService2();
		})
		.then((response) => {
			console.log("--> 2", response, res, "<--");
			res += response;
			return getResponseFromRemoteService3();
		})
		.then((response) => {
			console.log("--> 3", response, res, "<--");
			res += response;
		})
		.then((response) => {
			console.log("response with promises = ", res, response);
		});

	console.log("end promise chain");
}

function mainPromiseAll() {
	Promise.all([
		getResponseFromRemoteService1(),
		getResponseFromRemoteService2(),
		getResponseFromRemoteService3()
	]).then((messages) => {
		console.log(messages);

	});
}

function mainPromiseRace() {
	Promise.race([
		getResponseFromRemoteService1(),
		getResponseFromRemoteService2(),
		getResponseFromRemoteService3()
	]).then((message) => console.log("first recived", message));
}

//mainAsync();
//mainPromises();
mainPromiseAll();
//mainPromiseRace();
