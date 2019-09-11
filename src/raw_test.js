module.exports = function raw_test() {
    return `<div class="row">
    <div id="product-facet" class="col-md-3 filterby  product-facet js-product-facet" style="display: none;">
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
<div class="panel-heading" role="tab" id="headingzero">
 <button type="button" class="btn-filterby">Filtros</button>
 <h4 class="panel-title">Filtros</h4>
</div>


<div class="panel panel-default js-facet">
    <div class="panel-heading" role="tab" id="heading-categories">
        <h4 class="panel-title js-facet-name">
        <a role="button" data-toggle="collapse" data-target="#Precio" href="javascript:void(0)" aria-expanded="true" aria-controls="Precio" class="">
            Precio</a>
        </h4>
    </div>
    <div id="Precio" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="Precio" style="">
    <div class="panel-body facet-values js-facet-values js-facet-form">
        <div class="facet-list js-facet-list ">
        <form action="#" method="get">
                            <input type="hidden" name="q" value="7501008498309:relevance:price:$50-$199.99">
                            <input type="hidden" name="text" value="7501008498309">
                                <div class="checkbox checkbox-primary">
                                <input id="filter-0" type="checkbox" class="facet-checkbox js-facet-checkbox sr-only">
                                <label for="filter-0">
                                        $50-$199.99<span class="badge pull-right">
                                        1</span>
                                </label>
                        </div>
                        </form>
                        </div>

        </div>
</div>
</div>
        </div>
</div>
<div class="col-md-9">
<div class="results">
    <h1>Buscaste por "7501008498309"</h1>
</div>

<div class="row  section-header hidden-xs hidden-sm">

    <div class="col-md-6 sort-refine-bar">
                <span class="sortby">Ordenar por:</span>
                <div class="dropdown">
                    <form id="sortForm1" name="sortForm1" method="get" action="#">
                        <select id="sortOptions1" name="sort" class="btn btn-default dropdown-toggle">
                            <option value="relevance" selected="selected">
                                    Relevancia</option>
                            <option value="name-asc">
                                    Nombre (ascendente)</option>
                            <option value="name-desc">
                                    Nombre (descendente)</option>
                            <option value="price-asc">
                                    Precio (menor primero)</option>
                            <option value="price-desc">
                                    Precio (mayor primero)</option>
                            </select>
                        <input type="hidden" name="q" value="7501008498309:relevance">
                        </form>
                </div>

                <div class="col-xs-6 col-md-4 hidden-md hidden-lg">
                        <button class="btn btn-default pull-right js-show-facets">
                                Refinar</button>
                        <!--<a href="" class="btn btn-link pull-right"><span
                                                                            class="glyphicon glyphicon-th-list"></span></a>
                                                            <a href="" class="btn btn-link pull-right"><span
                                                                            class="glyphicon glyphicon-th"></span></a>-->
                    </div>
                </div>
        <div class="col-md-6"></div>
    <div class="col-md-6">
        <span class="counter">
1 - 1 de 1</span>
<nav class="fadeOutLeft">
</nav>

<div class="hidden-md hidden-lg hidden-sm">
<ul class="pager">
    </ul>
</div>
</div>

</div>
<ul class="row items product-listing product-list">
        <div class="col-xs-12 col-sm-6 col-md-4">
<div class="item">
    <div class="row fsp-grid">
        <div class="col-xs-5 col-sm-5 col-md-12 img-wrap">
                <a class="" href="/medicamentos/dolor/analgesicos/aspirina-advanced/p/000000000041180087" title="Aspirina Advanced">
                    <img alt="Aspirina Advanced" title="Aspirina Advanced" class="item-image img-responsive lazy" src="https://assets2.farmaciasanpablo.com.mx/uploads-prod/productimages/Fsp275Wx275H_41180087_1di9mtevo" style="display: block;">
        </a>
            </div>

            <div class="col-xs-7 col-sm-7 col-md-12">
                <div class="badges">
                    </div>
                <a href="/medicamentos/dolor/analgesicos/aspirina-advanced/p/000000000041180087">
                        <p class="item-title">
                            Aspirina Advanced</p>
                    </a>
                <p class="item-subtitle">
                        20 Tabletas Caja Ácido acetilsalicílico 500 MG</p>

                <p class="item-prize">
                        $52.50<span class="currency"> MXN</span>
                        </p>

                <div class="actions-container-for-SearchResultsList row ">
                    <div data-index="1" class="action-components_1">
            </div>
<div data-index="2" class="action-components_2">
            <form id="addToCartForm000000000041180087" class="add_to_cart_form" action="/cart/add" method="post"><input type="hidden" name="productCodePost" value="000000000041180087">
    <input type="hidden" name="productNamePost" value="Aspirina Advanced">
    <input type="hidden" name="productPostPrice" value="52.5">

    <button type="submit" class="btn btn-primary ">Agregar</button>
<div>
<input type="hidden" name="CSRFToken" value="090269a9-7b43-4401-900a-ecd1ed0ef453">
</div></form></div>
</div>

            </div>
        </div>
</div>
</div>

</ul>

<div id="addToCartTitle" style="display:none">
    <div class="add-to-cart-header">
        <div class="headline">
            <span class="headline-text">Has añadido un artículo a tu carrito</span>
        </div>
    </div>
</div>

<div class="row">
            </div>
<div class="row  section-footer">

    <div class="col-md-6"></div>
    <div class="col-md-6">
        <span class="counter">
1 - 1 de 1</span>
<nav class="fadeOutLeft">
</nav>

<div class="hidden-md hidden-lg hidden-sm">
<ul class="pager">
    </ul>
</div>
</div>

</div>
</div>
</div>`;
};