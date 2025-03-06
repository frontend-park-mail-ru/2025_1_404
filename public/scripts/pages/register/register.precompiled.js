export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"/style/pages/register.css\">\n<div class=\"register\">\n    <div class=\"register__img\">\n        <img src=\"../../../resources/img/register/left.jpg\" alt=\"Картинка квартиры\">\n    </div>\n    <div class=\"register__form\">\n        <div class = \"register__form__header\">\n            <div class=\"register__form__logo\">\n                <img class=\"logo-img\" src=\"../../../resources/img/logo/logo.svg\" alt=\"Логотип\">\n            </div>\n            <h2>\n                Регистрация\n            </h2>\n        </div>\n        <div>\n            <form  class = \"register__form__fields\">\n                <div class=\"register__nickname\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Имя","name":"firstName","type":"text","id":"registerFirstName"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Фамилия","name":"lastName","type":"text","id":"registerSecondName"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                </div>\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Email","name":"email","type":"email","id":"registerEmail"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Пароль","name":"password","type":"password","id":"registerPassword"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Подтвердите пароль","name":"confirmPassword","type":"password","id":"registerConfirmPassword"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"PrimaryButton"),depth0,{"name":"PrimaryButton","hash":{"id":"registerSubmitButton","class":"register__submit","name":"Зарегистрироваться"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"BackgroundlessButton"),depth0,{"name":"BackgroundlessButton","hash":{"id":"redirectJoinButton","name":"Уже есть аккаунт?"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </form>\n\n        </div>\n    </div>\n    <div class=\"register__img\">\n        <img src=\"../../../resources/img/register/right.jpg\" alt=\"Картинка дома\">\n    </div>\n</div>";
},"usePartial":true,"useData":true});