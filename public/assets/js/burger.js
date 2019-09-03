// Executes the Javascript once the document has fully loaded
$(document).ready(function()
{
    // Captures the relative URL for the page so that API requests can be made
    var relativeURL = window.location.origin;

    // This function will retrieve all the burgers in the database that have not yet been devoured
    // It invokes the Burgers API GET request to retreive the burgers
    function getBurgers()
    {
        // Burgers API GET request
        $.get(relativeURL + "/burger", function(data)
        {
            // Console logs the data returned from the Burgers API GET request
            console.log(data);

            // For loop which is used to build the Burgers Queue in the DOM
            // It also skips any burgers that have already been devoured (devoured == true)
            for(i = 0; i < data.length; i++)
            {
                // Console logs all burgers with an ID, Name, and Devoured Status
                console.log(data[i].id);
                console.log(data[i].name);
                console.log(data[i].devoured);
                
                // Conditional which only adds a burger to the Burger Queue if the it has not been devoured (devoured == false)
                if(data[i].devoured == false)
                {
                    // Builds DOM elements to add burger to the Burger Queue
                    var burgerRow = $("<div>");
                    var burgerDiv = $("<div>");
                    var devourDiv = $("<div>");
                    var devourButton = $("<button>");
                    
                    // Creates a burger-row-id for each burger row to make moving/removing the burger easier
                    var burgerRowId = "burger-row-" + data[i].id;

                    // Sets attributes for all DOM elements to be added for the burger in the Burger Queue
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

                    // Sets the Devour button text and then appends the DOM elements together
                    // Then appends the burger to the Burger Queue
                    devourButton.text("Devour");
                    burgerDiv.append(data[i].name);
                    devourDiv.append(devourButton);
                    burgerRow.append(burgerDiv);
                    burgerRow.append(devourDiv);            
                    $(".burger-list").append(burgerRow);
                }
            }

            // Invokes the devourBurger() function to turn on the listener for clicks of the Devour button
            devourBurger();

            // Invokes the addBurger() function to turn on the listener for clicks of the Add Burger button
            addBurger();
        });
    }

    // This function will turn on a listener for the burger Devour buttons in the Burger Queue
    // When these buttons are clicked, the burger is moved to the Devoured Burgers list and the burger's devoured status is set to true in the database
    function devourBurger()
    {
        // jQuery listener on Devour buttons within the Burger Queue
        $(".devour-btn").on("click", function(event)
        {
            // Retrieves the id of the Devour button clicked; this is also the id for the burger in the database   
            var devourId = $(this).attr("id");
            
            // Sets the devourId to an integer
            devourId = (parseInt(devourId));

            // Creates a burger-row-id for each burger row to make moving/removing the burger easier
            var burgerRowId = "burger-row-" + $(this).attr("id");
            console.log(burgerRowId);

            // Builds DOM elements to add burger to the Devour Burgers list
            var burgerRow = $("<div>");
            var burgerDiv = $("<div>");

            // Sets attributes for all DOM elements to be added for the burger in the Devoured Burgers list
            burgerRow.attr("class","row pl-3 pb-3");
            burgerDiv.attr(
            {
                "class": "md-col-6 text-right mt-4 mr-4",
                "id": devourId
            });

            // Appends the DOM elements together, then moves the burger to the Devoured Burger list
            burgerDiv.append($(this).attr("burger"));
            burgerRow.append(burgerDiv);
            $(".devoured-list").append(burgerRow);

            // Removes the devoured burger from the Burger Queue
            $("." + burgerRowId).remove();

            // Burgers API PUT request which updates the devoured status to true for a given burger
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
                // Outputs success message to console and response data
                console.log("Burger Devoured!");
                console.log(data);
            });
        });
    }

    // This function will turn on a listener for the Add Burger button
    // It will also invoke the Burgers API POST request to add the new burger to the database
    function addBurger()
    {
        // jQuery listener on Add Burger button
        $(".add-burger-btn").on("click", function(event)
        {
            // Selects the value entered in the add burgers text box
            var burgerName = $("#add-burgers-here").val();

            // Burgers API POST request which adds the new burger to the database
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
                // Outputs success message to console and response data
                console.log("Burger added!");
                console.log(data);

                // Invokes getBurgers() function to refresh the Burgers Queue
                getBurgers();

            });
        });
    }

// Starts the application logic by loading the initial list of burgers in the Burger Queue
getBurgers();
});