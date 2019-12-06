// classes
// holds data of special atributes
class attrData
{
    constructor(query,render)
    {
        this.type = query.replace("\\","").replace("\$","");
        this.query = query;
        this.render = render;
    }
}

class specialAttr
{
    constructor(type,element,render)
    {
        this.attr = type;
        this.element = element;
        this.exp = element.getAttribute("$" + type);
        this.render = render;
    }
}

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
    
}

const specails = [
    new attrData("\\$if",renderIf),
    new attrData("\\$for",renderFor),
    new attrData("\\$disabled",renderDisabled),
    new attrData("\\$style",renderStyle),
    new attrData("\\$class",renderClass)
]

// converts html document to array of special tags (if and for tags)
function specialTags(doc)
{
    let specialTags = [];
    for(let i=0;i<specails.length;i++)
    {
        let elements = doc.querySelectorAll(`[${specails[i].query}]`);
        elements = [...elements].map(element => element = new specialAttr(specails[i].type,element,specails[i].render));
        specialTags = specialTags.concat(elements);
    }

    return specialTags;
}

// converts all object properties to global proberites
function globalizeModel(model)
{
    for (var property in model) 
        window[property] =  model[property];
    
}

// removes all window properties that are in model
function clearModelFromWindow(model)
{
    for (var property in model) 
        delete  window[property];
}
// executes {{exp}} and retuns its value
function replaceElement(attrString)
{
    attrString.replace('{','');
    attrString.replace('}','');
   return eval(attrString);
}
