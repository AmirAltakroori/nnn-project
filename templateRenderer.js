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
function replaceElement(attrString,model)
{
    // executes the exp
    function replacer(attrString)
    {
        attrString = attrString.replace('{','');
        attrString = attrString.replace('}','');
        attrString = attrString.replace('$',"this.");
        return eval(attrString);
    }

    // binds the previous function to the model
    let re = replacer.bind(model);
    return re(attrString);
}
