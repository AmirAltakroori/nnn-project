var $scope = {};
var $routeParams = {};
var $bindedVars = new Map();

// classes
// holds data required to a special atributes
class AttrData
{
    constructor(query,render)
    {
        this.type = query.replace("\\","").replace("\$","");
        this.query = query;
        this.render = render;
    }
}

// special attribute class
class SpecialAttr
{
    constructor(type,element,render)
    {
        this.attr = type;
        this.element = element;
        this.exp = element.getAttribute("$" + type);
        this.render = render;
    }
}

// render functions foreach special attribute 
function renderIf(exp,element)
{
    
}

function renderFor(exp,element)
{
    
}

function renderDisabled(exp,element)
{
    
}

function renderStyle(exp,element)
{
    
}

function renderClass(exp,element)
{
    let splitStr = exp.split(":")
    let className = splitStr[0];
    if(eval(splitStr[1]))
        element.classList.add(className);
}

// list of all special tags with their render functionality
const specails = [
    new AttrData("\\$if",renderIf),
    new AttrData("\\$for",renderFor),
    new AttrData("\\$disabled",renderDisabled),
    new AttrData("\\$style",renderStyle),
    new AttrData("\\$class",renderClass)
]

// pulls special tags from a given html
function specialTags(doc)
{
    let specialTags = [];
    // find all special tags and format them
    for(let i=0;i<specails.length;i++)
    {
        let elements = doc.querySelectorAll(`[${specails[i].query}]`);
        elements = [...elements].map(element => element = new SpecialAttr(specails[i].type,element,specails[i].render));
        specialTags = specialTags.concat(elements);
    }

    return specialTags;
}

// executes {{exp}} using data of a model
function replaceElement(attrString, model)
{
    let value = attrString.replace('$',"$scope.");
    value = eval(value);
    if(!value) return model.replace("{{" + attrString + "}}", "");
    let res = model.replace("{{" + attrString + "}}", value);
    console.log(res);
    return res;
}

// Collects all the binded variables {{var}} in an array with their elements
function collectBindedVariables(doc) {
    let regExp = /\{\{([^}^}]+)\}\}/g;
    doc.childNodes.forEach(element => {
        if(text = element.innerText) {
            let matches = text.match(regExp);
            matches.forEach(str => {
                let variable = str.substring(2, str.length - 2).trim();
                if(!$bindedVars.get(variable)) $bindedVars.set(variable, [{element: element, text: element.innerText}]);
                else $bindedVars.set(variable, [...$bindedVars.get(variable), {element: element, text: element.innerText}]);
            });
        }
    });
}

// Replace the binded variable with its real value in html
function $apply(vars = []) {
    $bindedVars.forEach(async (elements, variable) => {
        await elements.forEach(elem => {
            elem.element.innerText = elem.text;
        });
        await elements.forEach(elem => {
            elem.element.innerText = replaceElement(variable, elem.element.innerText);
        });
    });
}

collectBindedVariables(document.getElementById("root"));

$scope.header = "NNN";
$scope.header2 = "NNN2";
$scope.header3 = "NNN3";
$scope.header4 = "NNN4";
$scope.text = "yaw yaw";

$apply();