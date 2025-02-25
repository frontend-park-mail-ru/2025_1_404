export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"../../../style/pages/register.css\">\r\n<div class=\"main\">\r\n    <span>А это страница регистрации</span>\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"PrimaryButton"),depth0,{"name":"PrimaryButton","hash":{"id":"switchButton","name":"На главную!"},"data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</div>";
},"usePartial":true,"useData":true});