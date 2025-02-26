export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"overlay\">\r\n    <div class=\"login\">\r\n        <div id=\"loginCloseButton\" class=\"login__close\">\r\n            &times;\r\n        </div>\r\n        <div class=\"login__inner\">\r\n            <div class=\"login__logo\">\r\n                <img class=\"login__logo-img\" src=\"../../../resources/img/logo/logo.svg\" alt=\"\">\r\n            </div>\r\n            <h3 class=\"login__title\">Войти или зарегистрироваться</h3>\r\n            <form class=\"login__form\" method=\"post\" enctype=\"multipart/form-data\" novalidate>\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Email","name":"email","type":"email","id":"emailInput"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Пароль","name":"password","type":"password","id":"passwordInput"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"PrimaryButton"),depth0,{"name":"PrimaryButton","hash":{"id":"loginSubmitButton","class":"login__submit","name":"Войти"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"LightButton"),depth0,{"name":"LightButton","hash":{"id":"registerHrefButton","class":"register__href","name":"Зарегистрироваться"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </form>\r\n        </div>\r\n    </div>\r\n</div>";
},"usePartial":true,"useData":true});