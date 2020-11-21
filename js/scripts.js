
var products = {
    'white': {
        
        'plain': {
            'unit_price': 5.12,
            'photo': 'v-white.jpg' 
        },
        'printed': {
            'unit_price': 8.95,
            'photo': 'v-white-personalized.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 6.04,
            'photo': 'v-color.jpg' 
        },
        'printed': {
            'unit_price': 9.47,
            'photo': 'v-color-personalized.png' 
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}


// Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
    // 1: above 1.000 units - 20% discount
    // 2: above 500 units - 12% discount
    // 3: above 100 units - 5% discount


// Solution:

$(function(){

  //$("#quantity").val()
  //$("#style").val()
  //$("#color .option-button.selected").attr('id')//parent = id ul si apoi child = clasele; .attr('id) = iau id ul unui element
  //$("#quality .option-button.selected").attr('id')
    
    function update_params(){
        search_params.quantity = parseInt($("#quantity").val());
        search_params.color = $("#color .option-button.selected").attr('id');
        search_params.quality = $("#quality .option-button.selected").attr('id');
        search_params.style = $("#style").val();
        console.log(search_params);
        update_order_details();
    }

    //result-product
    //result-style
    //result-quality
    //result-color
    //result-quantity

    function update_order_details(){

        $(".refresh-loader").show();

        var qualityId = "#" + search_params.quality;
        var colorId = "#" + search_params.color;
        var styleSelector = $("#style option[value=" + search_params.style + "]");

        $("#result-style").html(styleSelector.text());
        $("#result-quality").html($(qualityId).text());
        $("#result-color").html($(colorId).text());
        $("#result-quantity").html(search_params.quantity);
    
        var orderTotal =  calculate_total();
        $("#total-price").text(orderTotal);

        //update the photo
        var photoUrl = "img/" + products[search_params.color][search_params.style].photo;
        $("#photo-product").attr("src", photoUrl);

        window.setTimeout(function(){
            $(".refresh-loader").hide();
        }, 500);
        
    }

    function calculate_total(){

        var unitPrice = products[search_params.color][search_params.style].unit_price;
        // console.log(unitPrice);//9.47 - colored/printed
        if(search_params.quality == "q190"){
            unitPrice *= 1.12;
        }

        var total = unitPrice * search_params.quantity;
        
    // 1: above 1.000 units - 20% discount
    // 2: above 500 units - 12% discount
    // 3: above 100 units - 5% discount

        if(search_params.quantity >= 1000){
            total *= 0.8;
        } else if(search_params.quantity >= 500){
            total *= 0.88;
        } else if(search_params.quantity >= 100){
            total *= 0.95;
        }

        return total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
    });//al 2lea arg = obj
        
    }

    update_params();

    $("#quantity").change(function(){
        search_params.quantity = parseInt($("#quantity").val());
        update_order_details();
    });

    $("#style").change(function(){
        search_params.style = $("#style").val();
        update_order_details();
    });

    $(".option-button").click(function(){
        // console.log("clicked");
        var clickedParam = $(this).parent().attr("id");//cu this selectez elementul clickuit
        var childSelector = "#" + clickedParam + " .option-button";
        $(childSelector).removeClass("selected");//ia clasa de la cel cickuit si o muta la cel pe care vrea sa l aleaga
        $(this).addClass("selected");
        var selectedChild = "#" + clickedParam + " .option-button.selected";
        search_params[clickedParam] = $(selectedChild).attr('id');
        update_order_details();
    });

});

//#photo-product












