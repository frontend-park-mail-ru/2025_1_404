export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"overlay\">\n    <div class=\"login\">\n        <div id=\"loginCloseButton\" class=\"login__close\">\n            <svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M0 0L24 24M24 0L0 24\"  stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n            </svg>\n        </div>\n        <div class=\"login__inner\">\n            <div class=\"login__logo\">\n                <img class=\"login__logo-img\" src=\"../../../resources/img/logo/logo.svg\" alt=\"\">\n            </div>\n            <h3 class=\"login__title\">Войти или зарегистрироваться</h3>\n            <form class=\"login__form\" method=\"post\" enctype=\"multipart/form-data\" novalidate>\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Email","name":"email","type":"email","id":"emailInput"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Пароль","name":"password","type":"password","id":"passwordInput"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"PrimaryButton"),depth0,{"name":"PrimaryButton","hash":{"id":"loginSubmitButton","class":"login__submit","name":"Войти"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"LightButton"),depth0,{"name":"LightButton","hash":{"id":"registerHrefButton","class":"register__href","name":"Зарегистрироваться"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </form>\n        </div>\n    </div>\n</div>";
},"usePartial":true,"useData":true});