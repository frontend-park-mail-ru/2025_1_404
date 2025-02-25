export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"../../../style/pages/index.css\">\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Header"),depth0,{"name":"Header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"main\">\r\n    <div class=\"filter\">\r\n        <div class=\"container\">\r\n            <div class=\"filter__inner\">\r\n                <h2 class=\"filter__title\">Крутой лозунг для заполнения пространства</h2>\r\n                <div class=\"filter__settings\">\r\n                    <div class=\"select-button\">\r\n                        <select>\r\n                            <option value=\"\">Купить</option>\r\n                            <option value=\"\">Аренда</option>\r\n                        </select>\r\n                    </div>\r\n                    <div class=\"radio-button\">\r\n                        <input id=\"rad1\" type=\"radio\" name=\"radioBtn\" checked>\r\n                        <label for=\"rad1\"><span>Новостройки</span></label>\r\n                        <input id=\"rad2\" type=\"radio\" name=\"radioBtn\">\r\n                        <label for=\"rad2\"><span>Вторичка</span></label>\r\n                        <div class=\"radio-bg\"></div>\r\n                    </div>\r\n                    <div class=\"select-button\">\r\n                        <select>\r\n                            <option value=\"\">Цена</option>\r\n                            <option value=\"\">А как?...</option>\r\n                        </select>\r\n                    </div>\r\n                    <div class=\"select-button\">\r\n                        <select>\r\n                            <option value=\"\">Фильтры</option>\r\n                            <option value=\"\">А как?...</option>\r\n                        </select>\r\n                    </div>\r\n\r\n                </div>\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"PrimaryButton"),depth0,{"name":"PrimaryButton","hash":{"id":"filterSubmitButton","class":"filter__submit","name":"Показать объявления"},"data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"cards\">\r\n        <div class=\"container\">\r\n            <div class=\"cards__inner\">\r\n                <h2 class=\"cards__title\">\r\n                    Могут подойти\r\n                </h2>\r\n                <div class=\"cards__list\">\r\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Card"),depth0,{"name":"Card","hash":{"address":"Славянский бул., 13К1","metro":"Славянский бульвар","floor":"5/5","square":"30","rooms":"1","price":"52000"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Card"),depth0,{"name":"Card","hash":{"address":"Славянский бул., 13К1","metro":"Славянский бульвар","floor":"5/5","square":"30","rooms":"1","price":"52000"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Card"),depth0,{"name":"Card","hash":{"address":"Славянский бул., 13К1","metro":"Славянский бульвар","floor":"5/5","square":"30","rooms":"1","price":"52000"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Card"),depth0,{"name":"Card","hash":{"address":"Славянский бул., 13К1","metro":"Славянский бульвар","floor":"5/5","square":"30","rooms":"1","price":"52000"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(lookupProperty(partials,"Card"),depth0,{"name":"Card","hash":{"address":"Славянский бул., 13К1","metro":"Славянский бульвар","floor":"5/5","square":"30","rooms":"1","price":"52000"},"data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"usePartial":true,"useData":true});