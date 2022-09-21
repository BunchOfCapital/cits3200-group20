export default infodata = {
	topics: [
	{
		name: "Oral Health Conditions",
		content: "When we talk about 'oral health', the concept can get a bit vague. It refers to the overall health of the teeth, gums, and entire oral-facial system.",
		content2: "A few common conditions that fall under the umbrella of 'oral health' are Cavities, Gum Disease and Oral Cancer. (Did you know that over 80% of people will have at least one cavity by age 34?)",
		content3: "So now we know what oral health is and what conditions can affect it, why do we care? \n It's a common assumption that oral conditions are separate from other chronic conditions, but they can be dependent on each other. Poor Oral Health can lead to serious diseases like diabetes and heart disease."
	},
	{
		name: "Cavities",
		content: "Cavities are an extremely common oral health condition with minor, but not insignificant effects. They are caused by a breakdown of the tooth enamel (the hard surface layer of the teeth) due to acids produced by bacteria. These bacteria are mainly located in plaque or food that collects on the teeth.",
		content2: "There's a good chance that you've had Cavities at some point in your lifetime, no matter your age. Did you know that more than half of children age 8 have had at least one cavity in their baby teeth? But it's certainly not just kids, as more than 90% of adults have had at least one cavity in their lifetime."
	}
	]	
}

export function getInfoData() {
	const NUM_TOPICS = 5;
	let topics = [];

	Object.keys(infodata).forEach((topic)=>topics.push(...infodata[topic]));
	return topics;
}