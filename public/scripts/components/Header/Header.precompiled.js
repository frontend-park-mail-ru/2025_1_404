export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header class=\"header\" id=\"header\">\n    <div class=\"container\">\n        <div class=\"header__inner\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Logo"),depth0,{"name":"Logo","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            <div class=\"header__right\">\n                <div class=\"header__icons\">\n                    <a class=\"header__favour-href\" href=\"/\">\n                        <img class=\"header__favour-img\" src=\"../../../resources/img/header/favour.svg\" alt=\"\">\n                    </a>\n                    <a class=\"header__notice-href\" href=\"/\">\n                        <img class=\"header__notice-img\" src=\"../../../resources/img/header/notice.svg\" alt=\"\">\n                    </a>\n                </div>\n                <div class=\"header__auth\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"LightButton"),depth0,{"name":"LightButton","hash":{"id":"registerButton","name":"Регистрация"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"LightButton"),depth0,{"name":"LightButton","hash":{"id":"loginButton","name":"Войти"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                </div>\n            </div>\n        </div>\n    </div>\n</header>";
},"usePartial":true,"useData":true});