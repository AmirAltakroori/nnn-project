
# Potato Framework

Potato Framework is a development platform for building web applications using JavaScript.



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

You can hide/unhide an element depending on a condition.

Form: ```<tag $if="condition"></tag>```

Usage example: ```<div $if="$news.type == 2"></div>```

### $disabled

You can disable/undisable an element (button) depending on a condition.

Form: ```<tag $disabled="condition"></tag>```

Usage example: ```<button $disabled="$isSubmitDisabled"></button>```

### $for

You can loop an element depending on an array defined in the $scope object.

Form:
```
<tag $for="a of arr">
	<sub-tag></sub-tag>
</tag>
```

Thes <sub-tag> will be repeated for each element of the arr.

Usage example:

```
<span $for="n of news">
	<ul>
		<li>{{$n.title}}</li>
		<li>{{$n.date}}</li>
	</ul>
</span>
```

### $class

You can add a class to an element depending on a condition.

Form: ```<tag $class="'className' : condition"></tag>```

Usage example: ```<p $class="'error' : $salary < 1500"></p>

### $style

You can add a style to an element depending on a condition.

Form: ```<tag $class="'css-style' : condition"></tag>```

Usage example: ```<p $class="'background-color: red; color: #fff;' : $salary < 1500"></p>

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
