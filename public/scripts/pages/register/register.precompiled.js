export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"../../../style/pages/register.css\">\r\n<header class=\"header\">\r\n    <div class=\"container\">\r\n        <div class=\"header__inner\">\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Logo"),depth0,{"name":"Logo","data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n</header>\r\n<div class=\"register\">\r\n    <div class=\"container\">\r\n        <div class=\"register__inner\">\r\n            <h2 class=\"register__title\">\r\n                Регистрация\r\n            </h2>\r\n            <form class=\"register__form\" method=\"post\" enctype=\"multipart/form-data\" novalidate>\r\n                <div class=\"register__nickname\">\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Имя","name":"name","type":"text","id":"nameInput"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Фамилия","name":"surname","type":"text","id":"surnameInput"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                </div>\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Email","name":"email","type":"email","id":"emailInput"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Пароль","name":"password","type":"password","id":"passwordInput"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Input"),depth0,{"name":"Input","hash":{"placeholder":"Подтвердите пароль","name":"confirmPassword","type":"password","id":"confirmPasswordInput"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n                <div class=\"register__already\">\r\n                    <a href=\"/\">У вас уже есть профиль?</a>\r\n                </div>\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"PrimaryButton"),depth0,{"name":"PrimaryButton","hash":{"id":"registerSubmitButton","class":"register__submit","name":"Зарегистрироваться"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </form>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"right\">\r\n    <img class=\"right-img\" src=\"../../../resources/img/register/right.jpg\" alt=\"\">\r\n</div>";
},"usePartial":true,"useData":true});