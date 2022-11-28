const axios = require("axios");
const qs = require("qs");


var HASHTAGS = [];

const fetchTweets = async (req, res, next) => {
	try {
		const hashtags = HASHTAGS.length !== 0? HASHTAGS : ["#queryworksfine12"];
		var filter = "";

		hashtags.forEach((tag) => {
			if (filter.length === 0) {
				filter = tag;
			} else {
				filter = filter.concat(" OR ", tag);
			}
		});
		const query = qs.stringify({ query: `(${filter})` });
		const reqconfig = {
			method: "get",
			baseURL: "https://api.twitter.com",
			url: `/2/tweets/search/recent?${query}&media.fields=url&tweet.fields=&expansions=attachments.media_keys&max_results=10`,
			headers: {
				Authorization:
					"Bearer AAAAAAAAAAAAAAAAAAAAAHTzjgEAAAAA0FXZFga%2BpCCp9V3SeKu9omVkqsM%3Dcgnn5lOPUPFTsZ02z5nSBDiWVfObnZccq4t9Ir1GmjGUH7hyt6",
			},
		};
		const resp = await axios(reqconfig);
		const data = resp.data;
		const length = data.meta.result_count;
		var response = [];
		for (var i = 0; i < length; i++) {
			var obj = {};
			obj.from = "twitter";
			obj.id = data.data[i].id;
			obj.text = data.data[i].text;
			if (data.data[i].attachments) {
				var m_key = data.data[i].attachments.media_keys[0];
				for (var j = 0; j < data.includes.media.length; j++) {
					if (
						data.includes.media[j].media_key == m_key &&
						data.includes.media[j].type == "photo"
					) {
						obj.img = data.includes.media[j].url;
					}
				}
			}
			response.push(obj);
		}
		// console.log(data);
		return res.status(200).send({ data: response });
	} catch (err) {
		console.log(err);
		res.status(500).send(err.msg);
	}
};

const setHastags = async(req, res, next) => {
	try{
		const {list} = req.body; 
		HASHTAGS = list;
		return res.status(200).send({ status: "success" });
	}catch (err) {
		console.log(err);
		res.status(500).send(err.msg);
	}
}

const fetchTweetsRaw = async (req, res, next) => {
	try {
		const reqconfig = {
			method: "get",
			baseURL: "https://api.twitter.com",
			url: "/2/tweets/search/recent?query=%28%23queryworksfine12%29&media.fields=url&tweet.fields=&expansions=attachments.media_keys",
			headers: {
				Authorization:
					"Bearer AAAAAAAAAAAAAAAAAAAAAHTzjgEAAAAA0FXZFga%2BpCCp9V3SeKu9omVkqsM%3Dcgnn5lOPUPFTsZ02z5nSBDiWVfObnZccq4t9Ir1GmjGUH7hyt6",
			},
		};
		const resp = await axios(reqconfig);
		const data = resp.data;
		const length = data.meta.result_count;
		// console.log(data);
		return res.status(200).send(data);
	} catch (err) {
		console.log(err);
		res.status(500).send(err.msg);
	}
};

module.exports = {
	fetchTweets,
	fetchTweetsRaw,
	setHastags
};
