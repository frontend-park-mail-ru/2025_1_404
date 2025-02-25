export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header class=\"header\">\r\n    <div class=\"container\">\r\n        <div class=\"header__inner\">\r\n            <div class=\"header__logo\">\r\n                <a class=\"header__logo-href\" href=\"/\">\r\n                    <img class=\"header__logo-img\" src=\"../../../resources/img/header/logo.svg\" alt=\"\" >\r\n                </a>\r\n                <h3 class=\"header__title\">квартирум</h3>\r\n            </div>\r\n            <div class=\"header__right\">\r\n                <div class=\"header__icons\">\r\n                    <a class=\"header__favour-href\" href=\"/\">\r\n                        <img class=\"header__favour-img\" src=\"../../../resources/img/header/favour.svg\" alt=\"\">\r\n                    </a>\r\n                    <a class=\"header__notice-href\" href=\"/\">\r\n                        <img class=\"header__notice-img\" src=\"../../../resources/img/header/notice.svg\" alt=\"\">\r\n                    </a>\r\n                </div>\r\n                <div class=\"header__auth\">\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"PrimaryButton"),depth0,{"name":"PrimaryButton","hash":{"id":"registerButton","name":"Регистрация"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"PrimaryButton"),depth0,{"name":"PrimaryButton","hash":{"id":"loginButton","name":"Войти"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</header>";
},"usePartial":true,"useData":true});