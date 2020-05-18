const ovly = {

	viacep: {

		domain: "https://viacep.com.br/ws/",

		backToIndex: function () {
			
			//location is a system object available whe working with
			//html5. It has information of the URL of the current page
			//and other stuff

			//Go Back to index.html
			location.href = "index.html";

		},

		callback: function (result) {

			//Example of IF statement. 3 equals to compare. crazy stuff
			if (result.erro === true) {
				
				//Example of Jquery usage to get the object of a screen element.
				//$ is the same as write jQuery
				//In this example I can hide or show the element
				$("#formDiv").hide();
				$("#errorMessage").show();
				
			} else {
				
				$("#formDiv").show();
				$("#errorMessage").hide();
				
				//In this example I can change the value of the element
				$("#cep_out").val(result.cep);
				$("#street_out").val(result.logradouro);
				$("#area_out").val(result.bairro);
				$("#state_out").val(result.uf);

			}

		},

		callAPI: function () {
			
			//We get an object of URL class to get the parameters
			//from the URL
			var oUrl = new URL(location.href);
			var sCep = oUrl.searchParams.get("cep");
			
			//Example of how to replace characters in a string
			sCep = sCep.replace("-", "");

			//Example of how to concatenate strings
			var endpoint = this.domain + sCep + "/json/";
			
			//Most important thing of this exercise. Here is an example
			//on how to call and API with the get method.
			//Sintaxe is:
			//$.get("APIurl.com",callback function)
			//In this case, if i informed the callback function directly, the
			//this object of the method would refer to the callback function.
			//In order to have the this object of ovly.viacep I need to inform
			//the callback function like below.
			//This way I can update global attributes of ovly.viacep if required.
			$.get(endpoint, $.proxy(this.callback, this));

		}

	}

}

//Event when page finishes to load
window.onload = function () {
	
	ovly.viacep.callAPI();

}