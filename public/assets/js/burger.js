// Executes the Javascript once the document has fully loaded
$(document).ready(function()
{
    var relativeURL = window.location.origin; // Captures the relative URL for the page so that API requests can be made

    function getBurgers()
    {
        $.get(relativeURL + "/burger", function(data)
        {
            console.log(data);

            for(i = 0; i < data.length; i++)
            {
                console.log(data[i].id);
                console.log(data[i].name);
                
                if(data[i].devoured == false)
                {
                    var burgerRow = $("<div>");
                    var burgerRowId = "burger-row-" + data[i].id;
                    var burgerDiv = $("<div>");
                    var devourDiv = $("<div>");
                    var devourButton = $("<button>");
                    
                    burgerRow.attr("class",burgerRowId + " row pl-3 pb-3");
                    burgerDiv.attr(
                    {
                        "class": "md-col-5 text-right mt-4 mr-4",
                        "id": data[i].id
                    });
                    devourDiv.attr(
                    {
                        "class": "md-col-1 text-right mt-4",
                        "id": data[i].id
                    });

                    devourButton.attr(
                    {
                        "class": "devour-btn",
                        "id": data[i].id,
                        "burger": data[i].name
                    });

                    devourButton.text("Devour");
                    burgerDiv.append(data[i].name);
                    devourDiv.append(devourButton);
                    burgerRow.append(burgerDiv);
                    burgerRow.append(devourDiv);            
                    $(".burger-list").append(burgerRow);
                }
            }

            devourBurger();

            addBurger();
        });
    }

    function devourBurger()
    {
        $(".devour-btn").on("click", function(event)
        {
            
            var devourId = $(this).attr("id");
            devourId = (parseInt(devourId));
            var burgerRowId = "burger-row-" + $(this).attr("id");
            
            console.log(burgerRowId);

            var burgerRow = $("<div>");
            var burgerDiv = $("<div>");

            burgerRow.attr("class","row pl-3 pb-3");
            burgerDiv.attr(
            {
                "class": "md-col-6 text-right mt-4 mr-4",
                "id": devourId
            });

            burgerDiv.append($(this).attr("burger"));
            burgerRow.append(burgerDiv);
            $(".devoured-list").append(burgerRow);

            $("." + burgerRowId).remove();

            $.ajax(
            {
                method: "PUT",
                url: relativeURL + "/burger",
                data:
                {
                    "id": devourId
                }
            }).done(function(data)
            {
                console.log("Burger Devoured!");
                console.log(data);
            });
        });
    }

    function addBurger()
    {
        $(".add-burger-btn").on("click", function(event)
        {
            var burgerName = $("#add-burgers-here").val();

            $.ajax(
            {
                method: "POST",
                url: relativeURL + "/burger",
                data:
                {
                    "name": burgerName
                }
            }).done(function(data)
            {
                console.log("Burger added!");
                console.log(data);

                getBurgers();

            });
        });
    }

getBurgers();
    
});