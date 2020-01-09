
# NGS Framework

NGS Framework is a development platform for building web applications using JavaScript.

## Structure

The framework is based on MVC (Model-Veiw-Controller). 

## Routing

To create a new route, you have to add a new object to the routes array in the app.js file.
You should define the URL, template path, controller path, and the title of the view.
```
let routes = [
    {
        url: "/",
        template: "../templates/home.html",
        controller: "../controllers/home.js",
        title: "Home"
    },
    {
        url: "/news",
        template: "../templates/news.html",
        controller: "../controllers/news.js",
        title: "News"
    }
]
```
### Default route
You can specify the default path (if the user entered a non existing path) by adding an object with an empty path
```
{
	url: "",
	template: "../templates/404.html",
	controller: "../controllers/404.js",
	title: "Page not found"
}
```

### Passing Parameters

You can pass parameters in the URL, by adding them to the route URL.

Usage example:

```
{
    url: "/news/:type/:id",
    template: "../templates/news.html",
    controller: "../controllers/news.js",
    title: "News"
}
```

URL: ```https://example.com/#/news/2/14/```

The parameters are passed in the ```$routeParams``` object. You can access it from the controller:

```
console.log($routeParams.id);
```

Output: ```14```

## Binding Variables
You can bind variables in the view pages by using this form : ```{{$varName}}```
All defined variables in the controller should be defined in a global object called $scope.
Usage example:
```
Controller ->
	$scope.name = "John Smith";
	$scope.salary = 2500;
	$scope.transportation = 300;

View ->
	<p>Hello {{$name}}. Your salary is {{$salary * 0.98 + $transportation}}.

Output ->
	Hello John Smith. Your salary is 2750.
```

## Custom Attributes

### $if
You can hide/unhide an element using a condition.
Form: ```<tag $if="expression"></tag>```
Usage example: ```<div $if="$news.type == 2"></div>```

### $disabled
You can disable/undisable an element (button) using a condition.
Form: ```<tag $disabled="expression"></tag>```
Usage example: ```<button $disabled="$isSubmitDisabled"></button>```

### $for


### $class

### $style

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
