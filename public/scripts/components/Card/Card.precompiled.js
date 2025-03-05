export default Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"card\">\n    <a class=\"card__link\" href=\"/\">\n\n        <button class=\"card__favor\">\n            <img class=\"card__favor-img\" src=\"../../../resources/img/card/favour.svg\" alt=\"\">\n        </button>\n\n        <div class=\"card__photo\">\n            <img class=\"card__photo-img\" src=\"../../../resources/img/card/photo.jpg\" alt=\"\">\n        </div>\n        <div class=\"card__content\">\n            <h3 class=\"card__price\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"price") || (depth0 != null ? lookupProperty(depth0,"price") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"price","hash":{},"data":data,"loc":{"start":{"line":12,"column":36},"end":{"line":12,"column":45}}}) : helper)))
    + " ₽/мес.</h3>\n            <div class=\"card__info\">\n                <ul>\n                    <li>"
    + alias4(((helper = (helper = lookupProperty(helpers,"rooms") || (depth0 != null ? lookupProperty(depth0,"rooms") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rooms","hash":{},"data":data,"loc":{"start":{"line":15,"column":24},"end":{"line":15,"column":33}}}) : helper)))
    + "-комн. кв.</li>\n                    <li>"
    + alias4(((helper = (helper = lookupProperty(helpers,"square") || (depth0 != null ? lookupProperty(depth0,"square") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"square","hash":{},"data":data,"loc":{"start":{"line":16,"column":24},"end":{"line":16,"column":34}}}) : helper)))
    + " м²</li>\n                    <li>"
    + alias4(((helper = (helper = lookupProperty(helpers,"floor") || (depth0 != null ? lookupProperty(depth0,"floor") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"floor","hash":{},"data":data,"loc":{"start":{"line":17,"column":24},"end":{"line":17,"column":33}}}) : helper)))
    + " этаж</li>\n                </ul>\n            </div>\n            <div class=\"card__metro\">\n                <img class=\"metro-img\" src=\"../../../resources/img/card/metro.svg\" alt=\"\">\n                <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"metro") || (depth0 != null ? lookupProperty(depth0,"metro") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"metro","hash":{},"data":data,"loc":{"start":{"line":22,"column":22},"end":{"line":22,"column":31}}}) : helper)))
    + "</span>\n            </div>\n            <div class=\"card__address\">\n                <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"address") || (depth0 != null ? lookupProperty(depth0,"address") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"address","hash":{},"data":data,"loc":{"start":{"line":25,"column":22},"end":{"line":25,"column":33}}}) : helper)))
    + "</span>\n            </div>\n        </div>\n    </a>\n</div>\n\n";
},"useData":true});