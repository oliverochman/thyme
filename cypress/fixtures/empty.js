const timesheets = [
	{
		id: 0,
		begin: "2019-04-08T08:31:19.111Z",
		end: "2019-04-08T08:31:19.111Z",
		duration: 0,
		rate: 0,
		description: "string",
		fixed_rate: 0,
		hourly_rate: 0,
		exported: true,
		activity: 10,
		project: 1,
		user: 6
	},
	{
		id: 2989,
		begin: "2019-04-08T03:38:00+00:00",
		end: "2019-04-08T03:39:00+00:00",
		duration: 60,
		rate: 0.82,
		activity: 11,
		project: 1,
		user: 6
	},
	{
		id: 2990,
		begin: "2019-04-08T03:38:00+00:00",
		end: "2019-04-08T03:39:00+00:00",
		duration: 60,
		rate: 0.82,
		activity: 13,
		project: 1,
		user: 6
	},
	{
		id: 2988,
		begin: "2019-04-05T03:37:00+00:00",
		end: "2019-04-07T22:00:00+00:00",
		duration: 238980,
		rate: 3252.78,
		activity: 20,
		project: 2,
		user: 6
	},
	{
		id: 2044,
		begin: "2019-03-28T17:09:00+00:00",
		end: "2019-03-29T01:51:00+00:00",
		duration: 31320,
		rate: 426.3,
		description:
			"Dicta voluptate nulla voluptatem ex. A omnis rerum sed sed id quas. Dignissimos quidem porro quia odit qui dolor provident qui. Et ut dolores voluptate explicabo amet dolor.",
		activity: 21,
		project: 2,
		user: 6
	},
	{
		id: 2277,
		begin: "2019-03-27T15:06:00+00:00",
		end: "2019-03-27T16:37:00+00:00",
		duration: 5460,
		rate: 74.32,
		activity: 22,
		project: 2,
		user: 6
	},
	{
		id: 2160,
		begin: "2019-03-27T04:10:00+00:00",
		end: "2019-03-27T06:34:00+00:00",
		duration: 8640,
		rate: 117.6,
		activity: 30,
		project: 3,
		user: 6
	},
	{
		id: 2291,
		begin: "2019-03-27T01:23:00+00:00",
		end: "2019-03-27T11:52:00+00:00",
		duration: 37740,
		rate: 513.68,
		activity: 31,
		project: 3,
		user: 6
	}
];
const projects = [
	{
		id: 1,
		name: "Phadder",
		comment: "string",
		visible: true,
		budget: 0,
		order_number: "string",
		fixed_rate: 0,
		hourly_rate: 0,
		customer: 1
	},

	{
		id: 2,
		name: "CraftEd",
		comment: "string",
		visible: true,
		budget: 0,
		order_number: "string",
		fixed_rate: 0,
		hourly_rate: 0,
		customer: 1
	},

	{
		id: 3,
		name: "Thyme",
		comment: "string",
		visible: true,
		budget: 0,
		order_number: "string",
		fixed_rate: 0,
		hourly_rate: 0,
		customer: 1
	}
];

var timeSheetsForUser = timesheets.filter(timesheet => {
	return timesheet.user === 6
})

projectsForUser = timeSheetsForUser.filter(project_date => {
	return project_date.end <= new Date().setDate(new Date().getDate()-2)
})



var projects = [
  { name: "Project 1", begin: "2018-04-18 07:00" },
  { name: "Project 2", begin: "2018-06-30" },
  { name: "Another project", begin: "2018-04-03" },
  { name: "Internal", begin: "2018-05-03" },
  { name: "Late", begin: "2018-12-03" }]

var projectNames = ["projects", "project 2"]


result = projects.reduce((array, project) => {
 var projectIndex = new Date(project.begin).getMonth(); // get month number zero based
  if (!array[projectIndex]) {                          // check month if exist in result set
    array[projectIndex] = [projectNames[projectIndex], []];            // if not create a new result set
  }
  array[projectIndex][1].push(project);                 // push the actual project
  return array;                             // return temporary result
}, []).filter(Boolean);               // filter only months with values

console.log(result);