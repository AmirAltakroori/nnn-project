# NGS Framework

NGS Framework is a development platform for building web applications using JavaScript.

## Structure

The framework is based on MVC. 

## Routing

To create a new route, add a new object to the routes array in the app.js file.

You should define the URL, template path, controller path, and the title.
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

## Custom Attributes

### *if

### *disabled

### *for

### *class

### *style

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)