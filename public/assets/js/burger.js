// Executes the Javascript once the document has fully loaded
$(document).ready(function()
{
    var relativeURL = window.location.origin; // Captures the relative URL for the page so that API requests can be made
    var burgersArray = [];

    $.get(relativeURL + "/burger", function(data)
    {
        console.log(data);
        burgersArray = data;

        for(i = 0; i < data.length; i++)
        {
            console.log(data[i].id);
            console.log(data[i].name);
            
            var burgerRow = $("<div>");
            var burgerRowId = "burger-row-" + data[i].id;
            var burgerDiv = $("<div>");
            var devourDiv = $("<div>");
            var devourButton = $("<button>");
            
            burgerRow.attr("class",burgerRowId + " row");
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

            devourDiv.attr(
            {
                "class": "devour-btn",
                "id": data[i].id
            });

            devourButton.text("Devour");
            burgerDiv.append(data[i].name);
            devourDiv.append(devourButton);
            burgerRow.append(burgerDiv);
            burgerRow.append(devourDiv);            
            $(".burger-list").append(burgerRow);
        }

        $(".devour-btn").on("click", function(event)
            {
            console.log(burgersArray);
            
            var devourId = $(this).attr("id");
            devourId = (parseInt(devourId)) - 1;
            var burgerRowId = "burger-row-" + burgersArray[devourId].id;
            
            console.log(burgerRowId);

            var burgerRow = $("<div>");
            var burgerDiv = $("<div>");

            burgerRow.attr("class","row");
            burgerDiv.attr(
            {
                "class": "md-col-6 text-right mt-4 mr-4",
                "id": devourId
            });

            burgerDiv.append(burgersArray[devourId].name);
            burgerRow.append(burgerDiv);
            $(".devoured-list").append(burgerRow);

            $("." + burgerRowId).remove();

        });
    
    });
});