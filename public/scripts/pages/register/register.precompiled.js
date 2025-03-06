export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"/style/pages/register.css\">\n<header class=\"header\">\n    <div class=\"container\">\n        <div class=\"header__inner\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Logo"),depth0,{"name":"Logo","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</header>\n<div class=\"register\">\n    <div class=\"container\">\n        <div class=\"register__inner\">\n            <h2 class=\"register__title\">\n                Регистрация\n            </h2>\n            <form id=\"register-form\" class=\"register__form\">\n                <div class=\"register__nickname\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Имя","name":"firstName","type":"text","id":"registerFirstName"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Фамилия","name":"lastName","type":"text","id":"registerSecondName"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                </div>\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Email","name":"email","type":"email","id":"registerEmail"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Пароль","name":"password","type":"password","id":"registerPassword"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Подтвердите пароль","name":"confirmPassword","type":"password","id":"registerConfirmPassword"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\n                <div class=\"register__already\">\n                    <a href=\"/\">У вас уже есть профиль?</a>\n                </div>\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"PrimaryButton"),depth0,{"name":"PrimaryButton","hash":{"id":"registerSubmitButton","class":"register__submit","name":"Зарегистрироваться"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </form>\n        </div>\n    </div>\n</div>\n<div class=\"right\">\n    <img class=\"right-img\" src=\"../../../resources/img/register/right.jpg\" alt=\"\">\n</div>";
},"usePartial":true,"useData":true});