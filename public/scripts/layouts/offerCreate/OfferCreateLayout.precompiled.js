export default Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"offerCreate\">\n    <div class=\"container\">\n        <div class=\"offerCreate__inner\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"OfferCreateTitle"),depth0,{"name":"OfferCreateTitle","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            <div class=\"offerCreate__main\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"@partial-block"),depth0,{"name":"@partial-block","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"OfferCreateBtns"),depth0,{"name":"OfferCreateBtns","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </div>\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"OfferCreateNav"),depth0,{"name":"OfferCreateNav","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"MainLayout"),depth0,{"name":"MainLayout","fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});