export default kidsdata = {
	topics: [
	{
		name: "Tooth\nProblems",
		content: "You might not realise it, but our teeth and mouth are actually one of the most important parts of our body! Without them we wouldn't be able to talk, eat or drink. Just like any other part of the body, there are steps we can take to make sure they're strong and healthy.",
		content2: "If we don't take care of our teeth and mouth, there's a chance that many different diseases can make us very uncomfortable, making it hard to chew or bite into things. A few common problems (that you might already know!) are Cavities, Plaque and Gum Disease.",
		content3: "So all these bad things can happen to us if we don't take proper care of ourselves, but how do we actually do it? Well, we will talk about a few ways that you can make sure you stay happy and healthy!",
		link: "https://www.rch.org.au/kidsinfo/fact_sheets/Dental_care/"
	},
	{
		name: "Tooth\nDecay",
		content: "Tooth decay, also called cavities, is caused by germs that live on your teeth breaking down the food or drink that's present in your mouth. As they do this, they release acid that slowly damage the hard surface of your teeth, making it hurt when you chew or drink cold things.",
		content2: "Fortunately, the germs on your teeth make this acid slowly and the acid is weak, so it's really easy to deal with! By avoiding too much sugary food and brushing your teeth for 2 minutes, twice a day, you can make sure that the germs don't have any food to eat, and leave your teeth alone.",
		link: "https://www.rch.org.au/kidsinfo/fact_sheets/Dental_care/"
	},
	{
		name: "Plaque",
		content: "Have you ever run your tongue over your teeth and thought they felt a bit fuzzy or rough? This is actually something called Plaque, which is a sticky substance made of germs that coats your teeth. (It's actually found in everyone's mouth, all the time! It builds up over time as you eat and drink.)",
		content2: "While you're always going to have a bit of Plaque, it's very important to not let it stick around all the time. By brushing your teeth often, you get rid of the Plaque that has built up on your teeth and make sure it can't cause any tooth decay.",
		link: "https://www.healthywa.wa.gov.au/Articles/N_R/Preventing-early-childhood-dental-decay"
	},
	{
		name: "Brushing your Teeth",
		content: "Everyone knows that it's very important to brush your teeth every single day, but knowing HOW to brush your teeth is just as important! (It might surprise you how many people are actually brushing their teeth wrong, both kids and adults!)",
		content2: "You probably already know that you should brush your teeth for two minutes, twice a day, but making sure you use at least a pea-sized blob of toothpaste and brush softly is equally as important. Brushing too hard can actually cause more harm than good! Make gentle circles with your brush and don't miss any spots.",
		link: "https://www.colgate.com/en-us/oral-health/brushing-and-flossing/teaching-your-children-how-to-brush-and-floss#"
	},
	{
		name: "Contact Us",
		content: "This app was made by\n \nDanish Hilmann Azman\nJonathan Davey\nJoel Wildman\nMatthew Mandzufas\nChing Chun Lui\nMichael Shi\n\n for Dr Yulianna Shiikha, and released under the Creative Commons (Open Source) Licence.",
		content2: "You can find us online at ________"
	}
	]	
}

export function getKidsData() {
	const NUM_TOPICS = 5;
	let topics = [];

	Object.keys(kidsdata).forEach((topic)=>topics.push(...kidsdata[topic]));
	return topics;
}
