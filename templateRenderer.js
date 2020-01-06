let $scope = {};
let $bindedVars = new Map();

$scope.news = [
    {
        id: 1,
        name: 'Joe',
        major: 'Computer Science'
    },
    {
        id: 2,
        name: 'Yousef',
        major: 'Graphic Designer'
    },
    {
        id: 1,
        name: 'Meo',
        major: 'Computer Science'
    },
    {
        id: 2,
        name: 'Natsh',
        major: 'Graphic Designer'
    },
    {
        id: 1,
        name: 'Meo',
        major: 'Computer Science'
    }
]

// classes
// holds data required to a special atributes
class AttrData {
    constructor(query, render) {
        this.type = query.replace("\\", "").replace("\$", "");
        this.query = query;
        this.render = render;
    }
}

// special attribute class
class SpecialAttr {
    constructor(type, element, render) {
        this.attr = type;
        this.element = element;
        this.exp = element.getAttribute("$" + type);
        this.render = render;
    }
}

// render functions foreach special attribute 
function renderIf(exp, element) {

}

async function renderFor(exp, element) {
    let subArr = exp.split('of')[0].trim();
    let arrName = exp.split('of')[1].trim();
    let array = eval('$scope.'+arrName);
    let clonnedElement = element.cloneNode(true).innerHTML;
    for (let i = 0; i < array.length; i++) {
        if(i) element.innerHTML += clonnedElement;
        let bVars = await collectBindedVariables(element, ['$' + subArr + '.', '$' + arrName + '[' + i + ']' + '.']);
        await $apply(bVars);
    }
}

function renderDisabled(exp, element) {

}

function renderStyle(exp, element) {

}

function renderClass(exp, element) {
    let splitStr = exp.split(":")
    let className = splitStr[0];
    if (eval(splitStr[1]))
        element.classList.add(className);
}

function renderInclude(path, element) {

}

// list of all special tags with their render functionality
const specails = [
    new AttrData("\\$if", renderIf),
    new AttrData("\\$for", renderFor),
    new AttrData("\\$disabled", renderDisabled),
    new AttrData("\\$style", renderStyle),
    new AttrData("\\$class", renderClass),
    new AttrData("\\$include", renderInclude)
]

// pulls special tags from a given html
function collectCustomAttributes(doc) {
    let customAttributes = [];
    // find all special tags and format them
    for (let i = 0; i < specails.length; i++) {
        let elements = doc.querySelectorAll(`[${specails[i].query}]`);
        elements = [...elements].map(element => element = new SpecialAttr(specails[i].type, element, specails[i].render));
        customAttributes = customAttributes.concat(elements);
    }

    return customAttributes;
}

// executes {{exp}} using data of a model
function replaceElement(variable, text) {
    let value = variable.replace('$', "$scope.");
    value = eval(value);
    if (!value) return text.replace("{{" + variable + "}}", "");
    let res = text.replace("{{" + variable + "}}", value);
    return res;
}

// Collects all the binded variables {{var}} in an array with their elements
function collectBindedVariables(doc, replace = []) {
    let bindedVars = new Map();
    bindedVars = getBindedVariables(bindedVars, doc, replace);
    doc.querySelectorAll('*').forEach(element => {
        bindedVars = getBindedVariables(bindedVars, element, replace);
    })
    return bindedVars;
}

function getBindedVariables(bindedVars, element, replace = []) {
    let regExp = /\{\{([^}^}]+)\}\}/g;
    let text = [].reduce.call(element.childNodes, function(a, b) {
        return a + (b.nodeType === 3 ? b.textContent : '');
    }, '').trim();
    if(text){
        let matches = text.match(regExp);
        if(matches) {
            matches.forEach(str => {
                let variable = str.substring(2, str.length - 2).trim();
                let newVariable = variable;
                if(replace.length != 0) {
                    newVariable = variable.replace(replace[0], replace[1]);
                }
                if (!bindedVars.get(newVariable)) bindedVars.set(newVariable, [{ element: element, text: element.innerText.replace(variable, newVariable) }]);
                else bindedVars.set(newVariable, [...bindedVars.get(newVariable), { element: element, text: element.innerText.replace(variable, newVariable) }]);
            });
        }
    }
    return bindedVars;
}

let title = "New 1";
$scope.name = "Yousef";
$scope.age = 15;

// Replace the binded variable with its real value in html
function $apply(arr) {
    arr.forEach(async (elements, variable) => {
        await elements.forEach(elem => {
            elem.element.innerText = elem.text;
        });
        await elements.forEach(elem => {
            elem.element.innerText = replaceElement(variable, elem.element.innerText);
        });
    });
}
