export default infodata = {
	topics: [
	{
		name: "Oral Health Conditions",
		content: "When we talk about 'oral health', the concept can get a bit vague. It refers to the overall health of the teeth, gums, and entire oral-facial system. "
	}]	
}

export function getInfoData() {
	const NUM_TOPICS = 5;
	let topics = [];

	Object.keys(infodata).forEach((topic)=>topics.push(...infodata[topic]));
	return topics;