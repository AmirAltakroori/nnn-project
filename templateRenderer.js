let $scope = {};

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

//*********************************************************************//
//************************* Special Renders ***************************//
//*********************************************************************//

// render function for if special attribute 
function renderIf(expression,element)
{
    let exp = expression.replace(/\$/g, "$scope.");  
    //check the expression in if attribute.  
    let result = eval(exp);
    //check if the expression true then the hide class will be removed if exist to display the element
    if(result) {
        if (element.classList.contains('hide')) {
            element.classList.remove('hide');
        }
    }
    //if false we will add hide class to hide the element.
    else {
        if (!element.classList.contains('hide')) {
        element.classList.add('hide')
        }
    }
}

function renderFor(exp, element) 
{
    // let def = exp.split(':');
    // let iterSymbol = 'i';
    // if(def.length > 1)
    //     iterSymbol = def[1].trim();
    
    // let osubArr =  def[0].split('of')[0].trim();
    // let subArr = "\[$]" + def[0].split('of')[0].trim();
    // let arrName = def[0].split('of')[1].trim();

    // let array = eval('$scope.'+arrName);

    // let iterregx = new RegExp(`\\$` + iterSymbol + '(?![a-z])','g');

    // let newElement = "";
    // for (let i = 0; i < array.length; i++)
    // {
    //     newElement += element.innerHTML.replace(new RegExp(subArr, 'g'),"$" + arrName + `[${i}]`).replace(iterregx,i);
    //     element.querySelectorAll("[\\$for]").forEach(ele =>
    //     {
    //         ele.getAttribute("\$for").replace(new RegExp(osubArr, 'g'),arrName + `[${i}]`);
    //     });
    // }
    
    // element.innerHTML = newElement;
    // element = render(element);
}

function renderDisabled(exp,element)
{
    exp = exp.replace(/\$/g, "$scope.");  
    let result = eval(exp);
    element.disabled = result;
}


function renderStyle(exp,element)
{
    let hashCode = function(str) {
        var hash = 0;
        if (str.length == 0) {
            return hash;
        }
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash;
        }
        return hash;
    }

    let expGroup = exp.split(',');
 
    expGroup.forEach(ele =>
    {
        let indx = ele.lastIndexOf(":");
        let e = [];
        e.push(ele.substring(0,indx).replace(/'/g,"").trim(),ele.substring(indx+1).trim());
        
        let h = "mvc" + hashCode(e[0]);
       
        createClass(h,e[0]);

        renderClass(`${h} : ${e[1]}`,element);
    });
}


function renderClass(exp,element)
{
    
    exp = exp.replace(/\$/g, "$scope.");  
    let expGroup = exp.split(',');
   
    expGroup.forEach(ele =>
        {
            let splitStr = ele.split(":")
            let className = splitStr[0].replace(/'/g,"").trim();
            if (eval(splitStr[1]))
                element.classList.add(className);
            else
                element.classList.remove(className);
        }
    );
}

//*********************************************************************//
//*********************************************************************//
//*********************************************************************//

// list of all special tags with their render functionality
const specails = [
    new AttrData("\\$for",renderFor),
    new AttrData("\\$if",renderIf),
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
function replaceElement(attrString)
{
    let value = attrString.replace('$',"$scope.");
    value = eval(value);
    return value;
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


let cm = new Map();
function createClass(name,attr)
{
    if(cm.has(name))
        return;

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `.${name} { ${attr} }`;
    document.getElementsByTagName('head')[0].appendChild(style);

    cm.set(name,true);
}

function findReplace(doc)
{
    let str = doc.innerHTML;
    str = doc.innerHTML.replace(/(\{\{.*?\}\})/g,replaceElement);
    doc.innerHTML = str;
}

export function render(view,model)
{
    let specials = specialTags(view);
    
    
    $scope = model;
    console.log(model);
    specials.forEach(element => element.render(element.exp,element.element));
    
    findReplace(view);
    return view;
}

