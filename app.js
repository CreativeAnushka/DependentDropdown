var myObj = 
{
	//Start
	init:function()
	{
		var that = this;
		//This will call site function 
		this.load_site();
		//This will call employee function 
		document.getElementById('site').addEventListener('change',function()
		{
			that.load_employee(this.value);
		});
	},
	//Function to load site in select menu
	load_site:function()
	{
		//AJAX Call to retrieve data from URL
		var xhr = new XMLHttpRequest();
		//Method, URL of API, true for asynchronous
		xhr.open('GET','https://raw.githubusercontent.com/CreativeAnushka/DependentDropdown/main/site.json',true);		
		//xhr.open('GET','http://localhost:3000/site',true);
		xhr.onload = function()
		{
			// We perform some action with the retrieved data
			// xhr.responseText --> Actual JSON file data
			// Like this [{"","",""}]
			// console.log(xhr.responseText);
			//It parse a JSON string as JS object
			//{},{},{},{}
			var site = JSON.parse(xhr.responseText);
			console.log(site);
			site.forEach(function(value)
			{
				//Creates Option tag
				var opt = document.createElement('option');
				//Setting Option Text i.e siteName
				//<option>ABC</option>
				opt.innerText = value.siteName;
				//Option value -> Here we're passing siteId as option value
				//<option value="1">ABC</option>
				opt.setAttribute('value',value.siteId);
				//Appending option tag in html file -> <select><option></option></select>
				document.getElementById('site').appendChild(opt);
			});
		}
		//Send request
		xhr.send();
	},
	load_employee:function(id)
	{

		document.getElementById('empType').innerHTML = '';
		var xhr = new XMLHttpRequest();
		xhr.open('GET','https://raw.githubusercontent.com/CreativeAnushka/DependentDropdown/main/employee.json?siteId='+id,true);		
		//xhr.open('GET','http://localhost:3000/employee?siteId='+id,true);
		xhr.onload = function()
		{
			var emp= JSON.parse(xhr.responseText);
			emp.forEach(function(value)
			{
				var opt = document.createElement('option');
				opt.innerText = value.empType;
				opt.setAttribute('value',value.siteId);
				document.getElementById('empType').appendChild(opt);
			});
		}
		//Send request
		xhr.send();
	}
};

//Calling main function
myObj.init();
